/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    SIDEBAR ENGINE
    Version 2.0
==========================================================

    RESPONSIBILITIES:

    1. Load sidebar HTML
    2. Initialize hamburger
    3. Open / close sidebar
    4. Handle mobile overlay
    5. Remember desktop collapsed state
    6. Highlight active page
    7. Handle admin navigation

    IMPORTANT:

    sidebar.js owns the SIDEBAR ENGINE.

    ui.js does NOT initialize the sidebar.

    dashboard.js should call:

        App.UI.Sidebar.load();

==========================================================
*/


import {
    monitorAuth,
    getUserRole
} from "../core/auth.js";


/*==========================================================
    APP SAFETY
==========================================================*/

window.App = window.App || {};

App.UI = App.UI || {};


/*==========================================================
    SIDEBAR ENGINE
==========================================================*/

App.UI.Sidebar = {

    sidebar: null,

    overlay: null,

    toggleButton: null,

    initialized: false,

    authMonitoringStarted: false,


    /*======================================================
        LOAD SIDEBAR HTML
    ======================================================*/

    async load() {

        const container =
            document.getElementById("sidebar");


        if (!container) {

            console.warn(
                "Sidebar container #sidebar not found."
            );

            return false;

        }


        try {

            const response =
                await fetch(
                    "assets/components/sidebar.html"
                );


            if (!response.ok) {

                throw new Error(
                    `Sidebar failed to load: ${response.status}`
                );

            }


            const html =
                await response.text();


            /*
            Insert sidebar HTML.
            */

            container.innerHTML =
                html;


            /*
            Now the sidebar exists.
            Initialize it.
            */

            const initialized =
                this.init();


            if (!initialized) {

                throw new Error(
                    "Sidebar HTML loaded, but initialization failed."
                );

            }


            console.log(
                "✓ Sidebar loaded and initialized."
            );


            return true;

        }

        catch (error) {

            console.error(
                "Sidebar loading error:",
                error
            );


            container.innerHTML = `

                <div class="sidebar-error">

                    <span>⚠️</span>

                    <p>
                        Unable to load navigation.
                    </p>

                </div>

            `;


            return false;

        }

    },


    /*======================================================
        INITIALIZE SIDEBAR
    ======================================================*/

    init() {

        /*
        --------------------------------------------------
        IMPORTANT

        Do NOT use initialized as the first check.

        The sidebar can be dynamically replaced.
        Therefore we always rediscover the current
        DOM elements.
        --------------------------------------------------
        */


        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.querySelector(
                ".app-sidebar-overlay"
            );


        this.toggleButton =
            document.getElementById(
                "sidebarToggle"
            );


        /*
        --------------------------------------------------
        SIDEBAR NOT READY
        --------------------------------------------------
        */

        if (!this.sidebar) {

            console.warn(
                "Sidebar HTML is not available yet."
            );

            return false;

        }


        /*
        --------------------------------------------------
        REMOVE PREVIOUS HANDLERS
        --------------------------------------------------
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

        else {

            console.warn(
                "Sidebar hamburger #sidebarToggle was not found."
            );

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
        RESTORE SIDEBAR STATE
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
        AUTHENTICATION MONITOR

        Start this ONLY ONCE.
        ==================================================
        */

        this.startAuthMonitoring();


        this.initialized = true;


        console.log(
            "✓ Sidebar engine initialized."
        );


        return true;

    },


    /*======================================================
        AUTH MONITORING
    ======================================================*/

    startAuthMonitoring() {

        /*
        Prevent duplicate Firebase listeners.
        */

        if (
            this.authMonitoringStarted
        ) {

            return;

        }


        this.authMonitoringStarted = true;


        monitorAuth(
            async (state) => {

                if (!state.authenticated) {

                    return;

                }


                this.setupRoleNavigation();

            }
        );

    },


    /*======================================================
        ROLE NAVIGATION
    ======================================================*/

    setupRoleNavigation() {

        const navigation =
            document.querySelector(
                ".app-sidebar-menu"
            );


        if (!navigation) {

            return;

        }


        /*
        --------------------------------------------------
        Remove existing Admin Setup link.
        --------------------------------------------------
        */

        const existing =
            navigation.querySelector(
                '[data-admin-setup="true"]'
            );


        if (existing) {

            existing.remove();

        }


        /*
        --------------------------------------------------
        Get current role.
        --------------------------------------------------
        */

        const role =
            getUserRole();


        /*
        Only admin gets Admin Setup.
        */

        if (
            role !== "admin"
        ) {

            this.highlightCurrentPage();

            return;

        }


        /*
        --------------------------------------------------
        CREATE ADMIN SETUP LINK
        --------------------------------------------------
        */

        const adminSetup =
            document.createElement(
                "a"
            );


        adminSetup.href =
            "admin-setup.html";


        adminSetup.className =
            "app-menu-item";


        adminSetup.dataset.adminSetup =
            "true";


        adminSetup.innerHTML = `

            <span class="app-menu-icon">

                <i class="fa-solid fa-user-shield"></i>

            </span>

            <span class="app-menu-label">

                Admin Setup

            </span>

        `;


        /*
        --------------------------------------------------
        FIND SETTINGS
        --------------------------------------------------
        */

        const settings =
            Array.from(
                navigation.querySelectorAll(
                    ".app-menu-item"
                )
            ).find(
                item =>
                    item.textContent
                        .trim()
                        .toLowerCase()
                        .includes(
                            "settings"
                        )
            );


        /*
        --------------------------------------------------
        INSERT ADMIN SETUP
        --------------------------------------------------
        */

        if (settings) {

            navigation.insertBefore(
                adminSetup,
                settings
            );

        }

        else {

            navigation.appendChild(
                adminSetup
            );

        }


        this.highlightCurrentPage();

    },


    /*======================================================
        TOGGLE SIDEBAR
    ======================================================*/

    toggle() {

        /*
        Refresh DOM references in case the sidebar
        was dynamically replaced.
        */

        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.querySelector(
                ".app-sidebar-overlay"
            );


        if (!this.sidebar) {

            console.warn(
                "Cannot toggle sidebar: sidebar not found."
            );

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
        Main content
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
        Save desktop preference
        --------------------------------------------------
        */

        localStorage.setItem(
            "sidebarCollapsed",
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
        --------------------------------------------------
        MOBILE
        --------------------------------------------------

        Always start closed on mobile.
        --------------------------------------------------
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
        --------------------------------------------------
        DESKTOP
        --------------------------------------------------
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
        ACTIVE PAGE
    ======================================================*/

    highlightCurrentPage() {

        const menuItems =
            document.querySelectorAll(
                ".app-menu-item"
            );


        if (!menuItems.length) {

            return;

        }


        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        if (!currentPage) {

            currentPage =
                "dashboard.html";

        }


        /*
        --------------------------------------------------
        Remove active states.
        --------------------------------------------------
        */

        menuItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        /*
        --------------------------------------------------
        Highlight current page.
        --------------------------------------------------
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


                if (
                    href === "#" ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0];


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
        REFRESH
    ======================================================*/

    refresh() {

        /*
        Re-discover current sidebar elements.
        */

        this.sidebar =
            document.querySelector(
                ".app-sidebar"
            );


        this.overlay =
            document.querySelector(
                ".app-sidebar-overlay"
            );


        this.toggleButton =
            document.getElementById(
                "sidebarToggle"
            );


        /*
        Reconnect events.
        */

        this.init();

    }

};