





/**=========== Print Engine =========== */

App.UI.Print = {
    init(){
        console.log("Print Engine Loaded");
    },


    printElement(elementId){
        const element =
        document.getElementById(elementId);
        if(!element) {
            console.error("Print Error: Element not found.");
            return;
        }
        const printWindow =
        window.open ("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
            <title> StudentManager Pro </title>
            <style>
            body{
            font-family:Arial,sen-serif;
            margin:30px;
            color:#222;
            }
            table{
            width:100%;
            border-collapse:collapse;
            }
            table th,
            table td{
            bordr:1px solid #ddd;
            padding:8px;
            }
            h1, h2, h3{
            margin:0;
            }
            </style>
            </head>
            <body>
            ${element.innerHTML}
            </body>
            </html>
            `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
    }
}

/**========== Print Entire Page ============ */

App.UI.Print.page =function(){
    window.print();

}


/**========== Print With School Heaader ============ */

App.UI.Print.schoolDocument =
function(elementId, school){
    const element =
    document.getElementById(elementId);
    if (!element) return;
    const win = window.open("", "_blank" );
    win.document.write(`
        <html>
        <head>
        <title> ${school.name} </title>
        </head>
        <body>
        <enter>
        <h2>${school.name} </h2>
        <p>${school.address}</p>
        <hr>
        </center>
        ${element.innerHTML}
        </body>
        </html>
        
        `);
        win.document.close();
        win.print();
        win.close();
}


/**==== Print Attendance =========*/

App.UI.Print.attendance = function(){
    this.printElement("attendanceSection")
    ;

}


/**==== Print Student List =========*/


App.UI.Print.students = function(){
    this.printElement("studentTableSection")
    ;
    
}


/**==== Print Teacher List =========*/

App.UI.Print.teachers = function(){
    this.printElement("teacherTableSection")
    ;
    
}



/**==== Print Class List =========*/

App.UI.Print.classes = function(){
    this.printElement("classTableSection")
    ;
    
}


/**==== Print Report List =========*/

App.UI.Print.reports = function(){
    this.printElement("reportCard")
    ;
    
}

/**====== Auto Initialize =====*/

document.addEventListener("DOMContentLoaded", ()=>{
  App.UI.init();
});