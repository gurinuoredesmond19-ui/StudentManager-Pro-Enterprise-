/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    UI ENGINE
    Version 1.0
==========================================================

    IMPORTANT ARCHITECTURE

    ui.js initializes GENERAL UI engines only.

    It DOES NOT:
        - load the sidebar
        - initialize the sidebar
        - attach sidebar events
        - manage sidebar state

    Sidebar responsibility belongs to:
        dashboard.js → loads sidebar.html
        sidebar.js   → initializes sidebar behavior

==========================================================
*/


/*==========================================================
    UI INITIALIZER
==========================================================*/

App.UI.init = function () {

    console.log("====================================");
    console.log(" StudentManager Pro Enterprise ");
    console.log(" UI Engine Version 1.0 ");
    console.log("====================================");


    /*======================================================
        CORE UI ENGINES
    ======================================================*/

    if (App.UI.Modal?.init) {

        App.UI.Modal.init();

    }


    if (App.UI.Dropdown?.init) {

        App.UI.Dropdown.init();

    }


    /*======================================================
        UI ENGINES
    ======================================================*/

    if (App.UI.Loading?.init) {

        App.UI.Loading.init();

    }


    if (App.UI.Search?.init) {

        App.UI.Search.init();

    }


    if (App.UI.Table?.init) {

        App.UI.Table.init();

    }


    if (App.UI.Pagination?.init) {

        App.UI.Pagination.init();

    }


    /*======================================================
        SYSTEM ENGINES
    ======================================================*/

    if (App.UI.Print?.init) {

        App.UI.Print.init();

    }


    if (App.UI.Export?.init) {

        App.UI.Export.init();

    }


    if (App.UI.Password?.init) {

        App.UI.Password.init();

    }


    if (App.UI.Image?.init) {

        App.UI.Image.init();

    }


    /*======================================================
        DIALOGS
    ======================================================*/

    if (App.UI.Confirm?.init) {

        App.UI.Confirm.init();

    }


    /*======================================================
        UTILITIES
    ======================================================*/

    if (App.UI.Scroll?.init) {

        App.UI.Scroll.init();

    }


    if (App.UI.Shortcuts?.init) {

        App.UI.Shortcuts.init();

    }


    if (App.UI.Utils?.init) {

        App.UI.Utils.init();

    }


    /*======================================================
        IMPORTANT

        DO NOT ADD:

            App.UI.Sidebar.init();

        DO NOT ADD:

            App.UI.Sidebar.load();

        DO NOT ADD:

            loadSidebar();

        The dashboard module is responsible for loading
        the sidebar after the HTML has been inserted.
    ======================================================*/


    console.log(
        "✓ General UI Engine Loaded Successfully"
    );

};


/*==========================================================
    APPLICATION START
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            typeof App === "undefined" ||
            !App.UI
        ) {

            console.error(
                "StudentManager Pro: App.UI is not available."
            );

            return;

        }


        App.UI.init();

    }
);