/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    SIDEBAR ENGINE
    Version 3.0

    Compatible with:
    - dashboard.html
    - students.html
    - student-register.html
    - student-profile.html

    Uses the existing static sidebar HTML.
==========================================================
*/

window.App = window.App || {};

App.UI = App.UI || {};

App.UI.Sidebar = {

    sidebar: null,
    overlay: null,
    toggleButton: null,

    initialized: false,


    /*======================================================
        INITIALIZE
    ======================================================*/

    init() {

        this.sidebar =
            document.getElementById("appSidebar");

        this.overlay =
            document.getElementById("sidebarOverlay");

        this.toggleButton =
            document.getElementById("sidebarToggle");


        if (!this.sidebar) {

            console.warn(
                "Sidebar Engine: #appSidebar not found."
            );

            return false;
        }


        /*
        -----------------------------------------------
        HAMBURGER
        -----------------------------------------------
        */

        if (this.toggleButton) {

            this.toggleButton.onclick = (event) => {

                event.preventDefault();
                event.stopPropagation();

                this.toggle();

            };

        }


        /*
        -----------------------------------------------
        OVERLAY
        -----------------------------------------------
        */

        if (this.overlay) {

            this.overlay.onclick = () => {

                this.close();

            };

        }


        /*
        -----------------------------------------------
        SIDEBAR LINKS
        -----------------------------------------------
        */

        this.bindNavigation();


        /*
        -----------------------------------------------
        RESTORE DESKTOP STATE
        -----------------------------------------------
        */

        this.restoreState();


        /*
        -----------------------------------------------
        HANDLE RESIZE
        -----------------------------------------------
        */

        window.addEventListener(
            "resize",
            () => {

                this.handleResize();

            }
        );


        this.initialized = true;


        console.log(
            "✓ Sidebar Engine initialized."
        );


        return true;

    },


    /*======================================================
        TOGGLE
    ======================================================*/

    toggle() {

        if (!this.sidebar) {

            this.sidebar =
                document.getElementById(
                    "appSidebar"
                );

        }


        if (!this.sidebar) {

            return;

        }


        /*
        -----------------------------------------------
        MOBILE / TABLET
        -----------------------------------------------
        */

        if (window.innerWidth <= 992) {

            const isOpen =
                this.sidebar.classList.contains(
                    "show"
                );


            if (isOpen) {

                this.close();

            } else {

                this.open();

            }


            return;

        }


        /*
        -----------------------------------------------
        DESKTOP
        -----------------------------------------------
        */

        const collapsed =
            !this.sidebar.classList.contains(
                "collapsed"
            );


        this.sidebar.classList.toggle(
            "collapsed",
            collapsed
        );


        const main =
            document.querySelector(
                ".app-main"
            );


        if (main) {

            main.classList.toggle(
                "expanded",
                collapsed
            );

        }


        localStorage.setItem(
            "sidebarCollapsed",
            String(collapsed)
        );

    },


    /*======================================================
        OPEN MOBILE SIDEBAR
    ======================================================*/

    open() {

        if (!this.sidebar) return;


        this.sidebar.classList.add(
            "show"
        );


        if (this.overlay) {

            this.overlay.classList.add(
                "show"
            );

        }


        document.body.classList.add(
            "sidebar-open"
        );

    },


    /*======================================================
        CLOSE MOBILE SIDEBAR
    ======================================================*/

    close() {

        if (this.sidebar) {

            this.sidebar.classList.remove(
                "show"
            );

        }


        if (this.overlay) {

            this.overlay.classList.remove(
                "show"
            );

        }


        document.body.classList.remove(
            "sidebar-open"
        );

    },


    /*======================================================
        RESTORE STATE
    ======================================================*/

    restoreState() {

        if (!this.sidebar) return;


        /*
        Mobile always starts closed.
        */

        if (window.innerWidth <= 992) {

            this.close();

            return;

        }


        /*
        Desktop remembers collapsed state.
        */

        const collapsed =
            localStorage.getItem(
                "sidebarCollapsed"
            ) === "true";


        this.sidebar.classList.toggle(
            "collapsed",
            collapsed
        );


        const main =
            document.querySelector(
                ".app-main"
            );


        if (main) {

            main.classList.toggle(
                "expanded",
                collapsed
            );

        }

    },


    /*======================================================
        HANDLE RESIZE
    ======================================================*/

    handleResize() {

        if (!this.sidebar) return;


        if (window.innerWidth <= 992) {

            /*
            Remove desktop collapsed state.
            */

            this.sidebar.classList.remove(
                "collapsed"
            );


            const main =
                document.querySelector(
                    ".app-main"
                );


            if (main) {

                main.classList.remove(
                    "expanded"
                );

            }


        } else {

            /*
            Returning to desktop.
            Close mobile sidebar.
            */

            this.close();


            this.restoreState();

        }

    },


    /*======================================================
        NAVIGATION
    ======================================================*/

    bindNavigation() {

        const links =
            this.sidebar.querySelectorAll(
                ".sidebar-link"
            );


        links.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        /*
                        Close mobile sidebar
                        after navigation.
                        */

                        if (
                            window.innerWidth <= 992
                        ) {

                            this.close();

                        }

                    }
                );

            }
        );


        this.highlightCurrentPage();

    },


    /*======================================================
        ACTIVE PAGE
    ======================================================*/

    highlightCurrentPage() {

        if (!this.sidebar) return;


        const links =
            this.sidebar.querySelectorAll(
                ".sidebar-link"
            );


        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        if (!currentPage) {

            currentPage =
                "dashboard.html";

        }


        links.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) return;


                if (
                    href === "#" ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


                const page =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0];


                if (
                    page === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    },


    /*======================================================
        REFRESH
    ======================================================*/

    refresh() {

        this.sidebar =
            document.getElementById(
                "appSidebar"
            );

        this.overlay =
            document.getElementById(
                "sidebarOverlay"
            );

        this.toggleButton =
            document.getElementById(
                "sidebarToggle"
            );


        this.initialized = false;

        this.init();

    }

};


/*==========================================================
    AUTO INITIALIZE

    This means every page gets the sidebar automatically.
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.UI.Sidebar.init();

    }
);