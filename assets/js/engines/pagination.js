




/*==================================================
    PAGINATION ENGINE
==================================================*/

App.UI.Pagination = {

    currentPage: 1,

    rowsPerPage: 10,

    init() {

        console.log("Pagination Engine Loaded");

    },

    paginate(table) {

        if (!table) return;

        const rows = Array.from(table.querySelectorAll("tbody tr"));

        const totalRows = rows.length;

        const totalPages = Math.ceil(totalRows / this.rowsPerPage);

        rows.forEach((row, index) => {

            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;

            row.style.display = (index >= start && index < end)
                ? ""
                : "none";

        });

        this.updateInfo(totalRows);

        this.render(table, totalPages);

    },

    updateInfo(totalRows) {

        const info = document.getElementById("tableInfo");

        if (!info) return;

        const start = ((this.currentPage - 1) * this.rowsPerPage) + 1;
        const end = Math.min(this.currentPage * this.rowsPerPage, totalRows);

        info.innerHTML = `Showing ${start} - ${end} of ${totalRows} records`;

    },

    render(table, totalPages) {

        const container = document.getElementById("pagination");

        if (!container) return;

        container.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {

            const button = document.createElement("button");

            button.className = "app-page-btn";

            if (i === this.currentPage)
                button.classList.add("active");

            button.innerText = i;

            button.onclick = () => {

                this.currentPage = i;

                this.paginate(table);

            };

            container.appendChild(button);

        }

    }

};


/**===== Previous Page ==== */

App.UI.Pagination.previous = function(table){

    if(this.currentPage>1){

        this.currentPage--;

        this.paginate(table);

    }

}


/**======= Next Page ====== */

App.UI.Pagination.next = function(table){

    const rows = table.querySelectorAll("tbody tr").length;

    const pages = Math.ceil(rows/this.rowsPerPage);

    if(this.currentPage<pages){

        this.currentPage++;

        this.paginate(table);

    }

}

/**=== Change Row Per Page ===== */

App.UI.Pagination.setRows = function(rows,table){

    this.rowsPerPage = rows;

    this.currentPage = 1;

    this.paginate(table);

}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})









