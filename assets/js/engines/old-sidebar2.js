/*==================================================
    STUDENTMANAGER PRO ENTERPRISE
    SIDEBAR ENGINE
==================================================*/

App.UI.Sidebar = {

    sidebar: null,

    overlay: null,

    toggleButton: null,


    /*==================================================
        INITIALIZE
    ==================================================*/

    init() {

        this.sidebar =
            document.querySelector(".app-sidebar");

        this.overlay =
            document.querySelector(".app-sidebar-overlay");

        this.toggleButton =
            document.getElementById("sidebarToggle");


        /*
        ==============================================
        SIDEBAR NOT LOADED YET
        ==============================================
        */

        if (!this.sidebar) {

            console.warn(
                "Sidebar not found. Waiting for sidebar component..."
            );

            return;

        }


        /*
        ==============================================
        TOGGLE BUTTON
        ==============================================
        */

        if (this.toggleButton) {

            this.toggleButton.addEventListener(
                "click",
                () => {

                    this.toggle();

                }
            );

        }


        /*
        ==============================================
        MOBILE OVERLAY
        ==============================================
        */

        if (this.overlay) {

            this.overlay.addEventListener(
                "click",
                () => {

                    this.close();

                }
            );

        }


        /*
        ==============================================
        RESTORE DESKTOP STATE
        ==============================================
        */

        this.restoreState();


        /*
        ==============================================
        ACTIVE PAGE
        ==============================================
        */

        this.highlightCurrentPage();

    },


    /*==================================================
        TOGGLE SIDEBAR
    ==================================================*/

    toggle() {

        if (!this.sidebar) {

            return;

        }


        /*
        ==============================================
        MOBILE
        ==============================================
        */

        if (window.innerWidth <= 992) {

            this.sidebar.classList.toggle(
                "show"
            );


            if (this.overlay) {

                this.overlay.classList.toggle(
                    "show"
                );

            }

            return;

        }


        /*
        ==============================================
        DESKTOP
        ==============================================
        */

        this.sidebar.classList.toggle(
            "collapsed"
        );


        localStorage.setItem(

            "sidebarCollapsed",

            this.sidebar.classList.contains(
                "collapsed"
            )

        );

    },


    /*==================================================
        CLOSE MOBILE SIDEBAR
    ==================================================*/

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

    },


    /*==================================================
        RESTORE SIDEBAR STATE
    ==================================================*/

    restoreState() {

        if (!this.sidebar) {

            return;

        }


        const collapsed =
            localStorage.getItem(
                "sidebarCollapsed"
            );


        if (
            collapsed === "true"
            &&
            window.innerWidth > 992
        ) {

            this.sidebar.classList.add(
                "collapsed"
            );

        }

    },


    /*==================================================
        ACTIVE PAGE HIGHLIGHT
    ==================================================*/

    highlightCurrentPage() {

        /*
        ==============================================
        IMPORTANT:
        sidebar.html uses .app-menu-item
        NOT .app-menu-link
        ==============================================
        */

        const menuItems =
            document.querySelectorAll(
                ".app-menu-item"
            );


        if (!menuItems.length) {

            return;

        }


        /*
        ==============================================
        CURRENT FILE
        ==============================================
        */

        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        /*
        Some environments may produce
        an empty filename.
        */

        if (!currentPage) {

            currentPage =
                "dashboard.html";

        }


        /*
        ==============================================
        REMOVE OLD ACTIVE STATES
        ==============================================
        */

        menuItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        /*
        ==============================================
        FIND CURRENT PAGE
        ==============================================
        */

        menuItems.forEach(
            item => {

                const href =
                    item.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                /*
                Ignore placeholder links
                */

                if (
                    href === "#"
                    ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


                /*
                Extract filename from href
                */

                const linkPage =
                    href
                        .split("/")
                        .pop();


                if (
                    linkPage ===
                    currentPage
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    },


    /*==================================================
        REFRESH ACTIVE PAGE
    ==================================================*/

    refresh() {

        this.highlightCurrentPage();

    }

};



/*==================================================
    APPLICATION START
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            typeof App !== "undefined"
            &&
            App.UI
        ) {

            App.UI.Sidebar.init();

        }

    }
);