/*==================================================
    SIDEBAR ENGINE
==================================================*/

App.UI.Sidebar = {

    sidebar: null,

    overlay: null,

    toggleButton: null,

    init() {

        this.sidebar = document.querySelector(".app-sidebar");

        this.overlay = document.querySelector(".app-sidebar-overlay");

        this.toggleButton = document.getElementById("sidebarToggle");

        if (this.toggleButton) {

            this.toggleButton.addEventListener("click", () => {

                this.toggle();

            });

        }

        if (this.overlay) {

            this.overlay.addEventListener("click", () => {

                this.close();

            });

        }

        this.restoreState();

        this.highlightCurrentPage();

    },

    toggle() {

        if (window.innerWidth <= 992) {

            this.sidebar.classList.toggle("show");

            this.overlay.classList.toggle("show");

        }

        else {

            this.sidebar.classList.toggle("collapsed");

            localStorage.setItem(

                "sidebarCollapsed",

                this.sidebar.classList.contains("collapsed")

            );

        }

    },

    close() {

        this.sidebar.classList.remove("show");

        this.overlay.classList.remove("show");

    },

    restoreState() {

        const collapsed =

        localStorage.getItem("sidebarCollapsed");

        if (collapsed === "true") {

            this.sidebar.classList.add("collapsed");

        }

    },

    highlightCurrentPage() {

        const page =

        window.location.pathname

        .split("/")

        .pop();

        document

        .querySelectorAll(".app-menu-link")

        .forEach(link => {

            if (link.getAttribute("href") === page) {

                link.classList.add("active");

            }

        });

    }

};
document.addEventListener("DOMContentLoaded", ()=>{
  App.UI.init();
});