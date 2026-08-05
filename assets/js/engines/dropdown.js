



/*==================================================
    DROPDOWN ENGINE
==================================================*/

App.UI.Dropdown = {

    init() {

        this.bind();

    },

    bind() {

        document.querySelectorAll("[data-dropdown]").forEach(button => {

            button.addEventListener("click", (e) => {

                e.stopPropagation();

                const id = button.dataset.dropdown;

                this.toggle(id);

            });

        });

        document.addEventListener("click", () => {

            this.closeAll();

        });

    },

    toggle(id) {

        const dropdown = document.getElementById(id);

        if (!dropdown) return;

        if (dropdown.classList.contains("show")) {

            dropdown.classList.remove("show");

        } else {

            this.closeAll();

            dropdown.classList.add("show");

        }

    },

    close(id) {

        const dropdown = document.getElementById(id);

        if (!dropdown) return;

        dropdown.classList.remove("show");

    },

    closeAll() {

        document.querySelectorAll(".app-dropdown-menu")

        .forEach(menu => {

            menu.classList.remove("show");

        });

    }

};
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})




