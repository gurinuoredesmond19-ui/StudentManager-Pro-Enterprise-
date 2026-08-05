


/*==================================================
    FINAL AUTO INITIALIZER
==================================================*/

App.UI.init = function () {

    console.log("====================================");
    console.log(" StudentManager Pro Enterprise ");
    console.log(" UI Engine Version 1.0 ");
    console.log("====================================");

    // Core Engines
    App.UI.Modal?.init();
    App.UI.Sidebar?.init();
    App.UI.Dropdown?.init();

    // UI Engines
    App.UI.Loading?.init?.();
    App.UI.Search?.init?.();
    App.UI.Table?.init?.();
    App.UI.Pagination?.init?.();

    // System Engines
    App.UI.Print?.init?.();
    App.UI.Export?.init?.();
    App.UI.Password?.init?.();
    App.UI.Image?.init?.();

    // Dialogs
    App.UI.Confirm?.init?.();

    // Utilities
    App.UI.Scroll?.init?.();
    App.UI.Shortcuts?.init?.();
    App.UI.Utils?.init?.();

    console.log("✓ UI Engine Loaded Successfully");

};
document.addEventListener("DOMContentLoaded",()=>{
    App.UI.init();
});












