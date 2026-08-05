/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    SIDEBAR ENGINE
==========================================================
*/

import {
    monitorAuth,
    getUserRole,
    logout
} from "../core/auth.js";


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


        if (!this.sidebar) {

            console.warn(
                "Sidebar not found. Waiting for sidebar component..."
            );

            return;

        }


        /*==================================================
            TOGGLE BUTTON
        ==================================================*/

        if (this.toggleButton) {

            this.toggleButton.addEventListener(
                "click",
                () => {

                    this.toggle();

                }
            );

        }


        /*==================================================
            MOBILE OVERLAY
        ==================================================*/

        if (this.overlay) {

            this.overlay.addEventListener(
                "click",
                () => {

                    this.close();

                }
            );

        }


        /*==================================================
            RESTORE STATE
        ==================================================*/

        this.restoreState();


        /*==================================================
            ACTIVE PAGE
        ==================================================*/

        this.highlightCurrentPage();


        /*==================================================
            AUTHENTICATION / ROLE
        ==================================================*/

        monitorAuth(
            async (state) => {

                if (!state.authenticated) {

                    return;

                }

                this.setupRoleNavigation();

            }
        );

    },


    /*==================================================
        ROLE-BASED NAVIGATION
    ==================================================*/

    setupRoleNavigation() {

        const role =
            getUserRole();


        /*
        ==============================================
        REMOVE EXISTING ADMIN SETUP
        ==============================================
        */

        const existing =
            document.querySelector(
                '[data-admin-setup="true"]'
            );


        if (existing) {

            existing.remove();

        }


        /*
        ==============================================
        ONLY ADMIN CAN SEE ADMIN SETUP
        ==============================================
        */

        if (role !== "admin") {

            return;

        }


        const navigation =
            document.querySelector(
                ".app-sidebar-menu"
            );


        if (!navigation) {

            return;

        }


        /*
        ==============================================
        CREATE ADMIN SETUP LINK
        ==============================================
        */

        const adminSetup =
            document.createElement("a");


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
        ==============================================
        INSERT BEFORE SETTINGS
        ==============================================
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
                        .includes("settings")
            );


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


        /*
        ==============================================
        REFRESH ACTIVE PAGE
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


        menuItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


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
                    href === "#"
                    ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


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
        REFRESH
    ==================================================*/

    refresh() {

        this.highlightCurrentPage();

        this.setupRoleNavigation();

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