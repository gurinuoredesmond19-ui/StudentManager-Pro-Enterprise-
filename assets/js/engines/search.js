




/*==================================================
    SEARCH ENGINE
==================================================*/

App.UI.Search = {

    init() {

        console.log("Search Engine Loaded");

    },

    table(searchInput, table) {

        if (!searchInput || !table) return;

        searchInput.addEventListener("keyup", () => {

            const keyword = searchInput.value

                .toLowerCase()

                .trim();

            const rows = table.querySelectorAll("tbody tr");

            let visibleRows = 0;

            rows.forEach(row => {

                const text = row.innerText.toLowerCase();

                if (text.includes(keyword)) {

                    row.style.display = "";

                    visibleRows++;

                } else {

                    row.style.display = "none";

                }

            });

            this.emptyState(table, visibleRows);

        });

    },

    emptyState(table, visibleRows) {

        let empty = table.parentElement.querySelector(".app-empty-search");

        if (!empty) {

            empty = document.createElement("div");

            empty.className = "app-empty-search";

            empty.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>No matching records found.</p>
            `;

            table.parentElement.appendChild(empty);

        }

        empty.style.display = visibleRows === 0 ? "block" : "none";

    }

};


/**=== Search By Specific Column */


App.UI.Search.column = function(input, table, columnIndex){

    input.addEventListener("keyup",()=>{

        const keyword = input.value.toLowerCase();

        table.querySelectorAll("tbody tr")

        .forEach(row=>{

            const cell = row.cells[columnIndex];

            if(!cell) return;

            row.style.display =

            cell.innerText

            .toLowerCase()

            .includes(keyword)

            ? ""

            : "none";

        });

    });

}

/**=== Clear Search ==== */

App.UI.Search.clear = function(input, table){

    input.value = "";

    table.querySelectorAll("tbody tr")

    .forEach(row=>{

        row.style.display="";

    });

}



/** ======== Count Visible Rows =========*/

App.UI.Search.count = function(table){

    let count = 0;

    table.querySelectorAll("tbody tr")

    .forEach(row=>{

        if(row.style.display!=="none")

        count++;

    });

    return count;

}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
