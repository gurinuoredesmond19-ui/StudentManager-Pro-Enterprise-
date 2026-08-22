/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   STUDENT MODULE
   SIDEBAR CONTROLLER
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("appSidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    /*
    ----------------------------------------------------------
    SAFETY CHECK
    ----------------------------------------------------------
    */

    if (!sidebar) {
        console.warn("Student Sidebar: #appSidebar not found.");
        return;
    }


    /*
    ----------------------------------------------------------
    OPEN SIDEBAR
    ----------------------------------------------------------
    */

    const openSidebar = () => {

        sidebar.classList.add("show");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("show");
        }

        document.body.classList.add("sidebar-open");

    };


    /*
    ----------------------------------------------------------
    CLOSE SIDEBAR
    ----------------------------------------------------------
    */

    const closeSidebar = () => {

        sidebar.classList.remove("show");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

        document.body.classList.remove("sidebar-open");

    };


    /*
    ----------------------------------------------------------
    TOGGLE SIDEBAR
    ----------------------------------------------------------
    */

    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", () => {

            const isOpen =
                sidebar.classList.contains("show");

            if (isOpen) {

                closeSidebar();

            } else {

                openSidebar();

            }

        });

    }


    /*
    ----------------------------------------------------------
    OVERLAY CLOSE
    ----------------------------------------------------------
    */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", () => {

            closeSidebar();

        });

    }


    /*
    ----------------------------------------------------------
    MOBILE NAVIGATION
    ----------------------------------------------------------
    */

    const sidebarLinks =
        sidebar.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 992) {

                closeSidebar();

            }

        });

    });


    /*
    ----------------------------------------------------------
    ESCAPE KEY
    ----------------------------------------------------------
    */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });


    /*
    ----------------------------------------------------------
    RESPONSIVE STATE
    ----------------------------------------------------------
    */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeSidebar();

        }

    });


    /*
    ----------------------------------------------------------
    BODY SCROLL CONTROL
    ----------------------------------------------------------
    */

    const observer =
        new MutationObserver(() => {

            const sidebarIsOpen =
                sidebar.classList.contains("show");

            if (
                window.innerWidth <= 992 &&
                sidebarIsOpen
            ) {

                document.body.style.overflow = "hidden";

            } else {

                document.body.style.overflow = "";

            }

        });


    observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"]
    });

});