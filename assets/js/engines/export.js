
/**========= Export Engine ============= */

App.UI.Export = {
    init(){
        console.log("Export Engine Loaded");


    },



    /** ======== Eport to CSV ========= */

    csv(tableId, filename = "Export"){
        const table = 
        document.getElementById(tableId);
        if (!table) return;

        let csv = [];

        table.querySelectorAll("tr").forEach(row =>{
            let cols = [];
            row.querySelectorAll("th, td").forEach(cell =>{
                cols.push('"' + cell.innerText.replace(/"/g, '""') +
            '"');

            });

            csv.push(cols.join(","));

        });


        const csvFile = new 
        Blob([csv.join("\n")], {
            type: "text/ csv"
        });
        const link = document.createElement("a");
        link .href =
        URL .createObjectURL(csvFile);
        link .download = fileName + ".csv" ;
        link.click();

    

    }
    
};


/**========= Export JSON ========= */

App.UI.Export.json = function (data, fileName = "Export"){
    const blob = new Blob(
        [JSON.stringify(data, null, 4)],
    {
        type: "application/json"

    }

    );
    const link =
    document.createElement("a");
    link.href =
    URL.createObjectURL(blob);
    link.download = fileName +
    ".json";
    link.click();
}





/**========= Export to Text File ============== */

App.UI.Export.text = 
function(text, fileName = "Export") {
    const blob = new Blob(
        [text],
        {
            type: "text/plain"

        }

    );
    const link = 
    document.createElement("a");
    link.href =
    URL.createObjectURL(blob);
    link.download = fileName +
    ".txt";
    link.click();
}

/**======= Download Any File ============ */

App.UI.Export.download = function(content, type ,fileName){
    const blob = new Blob(
        [content],
        {
            type:type

        }

    );
    const link = 
    document.createElement("a");
    link.href =
    URL.createObjectURL(blob);
    link.download = fileName ;
    
    link.click();
}


/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
