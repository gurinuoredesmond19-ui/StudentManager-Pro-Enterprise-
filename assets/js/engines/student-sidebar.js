/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    STUDENT SIDEBAR ENGINE
    Version 1.0
==========================================================

    RESPONSIBILITIES:

    1. Initialize Student module sidebar
    2. Initialize hamburger
    3. Open / close mobile sidebar
    4. Handle mobile overlay
    5. Remember desktop collapsed state
    6. Highlight active Student page
    7. Refresh dynamically replaced sidebar

    IMPORTANT:

    This is the STUDENT MODULE sidebar engine.

    It is completely independent from:

        assets/js/engines/sidebar.js

    DO NOT use App.UI.Sidebar here.

    STUDENT MODULE PAGES:

        students.html
        student-register.html
        student-profile.html

==========================================================
*/


/*==========================================================
    APP SAFETY
==========================================================*/

window.App = window.App || {};

App.Student = App.Student || {};


/*==========================================================
    STUDENT SIDEBAR ENGINE
==========================================================*/

App.Student.Sidebar = {

    sidebar: null,

    overlay: null,

    toggleButton: null,

    initialized: false,


    /*======================================================
        INITIALIZE
    ======================================================*/

    init() {

        /*
        --------------------------------------------------
        Always rediscover the current DOM.

        Student pages may have slightly different HTML
        structures, so we do not assume old references
        are still valid.
        --------------------------------------------------
        */

        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.getElementById(
                "sidebarOverlay"
            );


        this.toggleButton =
            document.getElementById(
                "sidebarToggle"
            );


        /*
        --------------------------------------------------
        SIDEBAR NOT FOUND
        --------------------------------------------------
        */

        if (!this.sidebar) {

            console.warn(
                "Student Sidebar: .app-sidebar was not found."
            );

            return false;

        }


        /*
        ==================================================
        REMOVE PREVIOUS HANDLERS
        ==================================================
        */

        if (this.toggleButton) {

            this.toggleButton.onclick = null;

        }


        if (this.overlay) {

            this.overlay.onclick = null;

        }


        /*
        ==================================================
        HAMBURGER
        ==================================================
        */

        if (this.toggleButton) {

            this.toggleButton.onclick =
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    this.toggle();

                };

        }


        /*
        ==================================================
        MOBILE OVERLAY
        ==================================================
        */

        if (this.overlay) {

            this.overlay.onclick =
                (event) => {

                    event.preventDefault();

                    this.close();

                };

        }


        /*
        ==================================================
        RESTORE DESKTOP STATE
        ==================================================
        */

        this.restoreState();


        /*
        ==================================================
        ACTIVE PAGE
        ==================================================
        */

        this.highlightCurrentPage();


        /*
        ==================================================
        WINDOW RESIZE
        ==================================================
        */

        this.setupResizeHandler();


        this.initialized = true;


        console.log(
            "✓ Student Sidebar initialized."
        );


        return true;

    },


    /*======================================================
        TOGGLE SIDEBAR
    ======================================================*/

    toggle() {

        /*
        Refresh references in case the DOM was replaced.
        */

        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.getElementById(
                "sidebarOverlay"
            );


        if (!this.sidebar) {

            console.warn(
                "Student Sidebar: cannot toggle because sidebar was not found."
            );

            return;

        }


        /*
        ==================================================
        MOBILE / TABLET
        ==================================================
        */

        if (
            window.innerWidth <= 992
        ) {

            const opening =
                !this.sidebar.classList.contains(
                    "show"
                );


            this.sidebar.classList.toggle(
                "show",
                opening
            );


            if (this.overlay) {

                this.overlay.classList.toggle(
                    "show",
                    opening
                );

            }


            return;

        }


        /*
        ==================================================
        DESKTOP
        ==================================================
        */

        const collapsing =
            !this.sidebar.classList.contains(
                "collapsed"
            );


        this.sidebar.classList.toggle(
            "collapsed",
            collapsing
        );


        /*
        --------------------------------------------------
        MAIN CONTENT
        --------------------------------------------------
        */

        const main =
            document.querySelector(
                ".app-main"
            );


        if (main) {

            main.classList.toggle(
                "expanded",
                collapsing
            );

        }


        /*
        --------------------------------------------------
        SAVE DESKTOP PREFERENCE
        --------------------------------------------------
        */

        localStorage.setItem(
            "studentSidebarCollapsed",
            String(collapsing)
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

    },


    /*======================================================
        RESTORE STATE
    ======================================================*/

    restoreState() {

        if (!this.sidebar) {

            return;

        }


        /*
        ==================================================
        MOBILE
        ==================================================
        */

        if (
            window.innerWidth <= 992
        ) {

            this.sidebar.classList.remove(
                "show"
            );


            if (this.overlay) {

                this.overlay.classList.remove(
                    "show"
                );

            }


            return;

        }


        /*
        ==================================================
        DESKTOP
        ==================================================
        */

        const collapsed =
            localStorage.getItem(
                "studentSidebarCollapsed"
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
        HIGHLIGHT CURRENT PAGE
    ======================================================*/

    highlightCurrentPage() {

        const menuItems =
            this.sidebar
                ? this.sidebar.querySelectorAll(
                    ".sidebar-link"
                )
                : document.querySelectorAll(
                    ".sidebar-link"
                );


        if (!menuItems.length) {

            return;

        }


        /*
        --------------------------------------------------
        GET CURRENT PAGE
        --------------------------------------------------
        */

        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        /*
        --------------------------------------------------
        ROOT / EMPTY PATH
        --------------------------------------------------
        */

        if (!currentPage) {

            currentPage =
                "students.html";

        }


        /*
        --------------------------------------------------
        REMOVE EXISTING ACTIVE STATES
        --------------------------------------------------
        */

        menuItems.forEach(
            (item) => {

                item.classList.remove(
                    "active"
                );

            }
        );


        /*
        --------------------------------------------------
        APPLY ACTIVE STATE
        --------------------------------------------------
        */

        menuItems.forEach(
            (item) => {

                const href =
                    item.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                /*
                Ignore placeholder links.
                */

                if (
                    href === "#" ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


                /*
                Extract actual page name.
                */

                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0];


                /*
                Match current page.
                */

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


    /*======================================================
        RESIZE HANDLER
    ======================================================*/

    setupResizeHandler() {

        /*
        Prevent duplicate resize handlers.
        */

        if (
            this._resizeHandlerAttached
        ) {

            return;

        }


        this._resizeHandlerAttached =
            true;


        this._resizeHandler =
            () => {

                /*
                --------------------------------------------------
                Mobile
                --------------------------------------------------
                */

                if (
                    window.innerWidth <= 992
                ) {

                    this.close();

                    return;

                }


                /*
                --------------------------------------------------
                Desktop

                Restore saved collapsed state.
                --------------------------------------------------
                */

                this.restoreState();

            };


        window.addEventListener(
            "resize",
            this._resizeHandler
        );

    },


    /*======================================================
        REFRESH
    ======================================================*/

    refresh() {

        /*
        Rediscover the current sidebar elements.
        */

        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.getElementById(
                "sidebarOverlay"
            );


        this.toggleButton =
            document.getElementById(
                "sidebarToggle"
            );


        /*
        Reinitialize.
        */

        this.init();

    }

};


/*==========================================================
    AUTO INITIALIZE
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.Student.Sidebar.init();

    }
);