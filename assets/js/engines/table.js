




/*==================================================
    TABLE ENGINE
==================================================*/

App.UI.Table = {

    init() {

        console.log("Table Engine Loaded");

    },

    zebra(table) {

        if (!table) return;

        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row, index) => {

            row.classList.remove("even", "odd");

            row.classList.add(index % 2 === 0 ? "even" : "odd");

        });

    },

    hover(table) {

        if (!table) return;

        table.querySelectorAll("tbody tr").forEach(row => {

            row.addEventListener("mouseenter", () => {

                row.classList.add("hover");

            });

            row.addEventListener("mouseleave", () => {

                row.classList.remove("hover");

            });

        });

    },

    numberRows(table) {

        if (!table) return;

        table.querySelectorAll("tbody tr").forEach((row, index) => {

            if (row.cells.length > 0) {

                row.cells[0].innerText = index + 1;

            }

        });

    }

};


/**===== Select Rows ===== */

App.UI.Table.selectAll = function(masterCheckbox, table){

    masterCheckbox.addEventListener("change", () => {

        table.querySelectorAll("tbody input[type='checkbox']")

        .forEach(box => {

            box.checked = masterCheckbox.checked;

        });

    });

}


/**=====Count Selected Rows ===== */


App.UI.Table.selectedCount = function(table){

    return table.querySelectorAll(

        "tbody input[type='checkbox']:checked"

    ).length;

}


/**===== Delete Selected  ===== */

App.UI.Table.deleteSelected = function(table){

    table.querySelectorAll(

        "tbody input[type='checkbox']:checked"

    ).forEach(box => {

        box.closest("tr").remove();

    });

}

/**=== Refresh Table === */
App.UI.Table.refresh = function(table){
    this.numberRows(table);
    this.zebra(table)
}



/**====  Remove Highlight ==== */

App.UI.removeHighlight = 
function(row){
    row.classList.remove("selectec")
}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})

