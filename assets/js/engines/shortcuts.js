






/*==================================================
    KEYBOARD SHORTCUTS ENGINE
==================================================*/

App.UI.Shortcuts = {

    shortcuts: {},

    init() {

        document.addEventListener("keydown", (e) => {

            const key = [];

            if (e.ctrlKey) key.push("Ctrl");
            if (e.shiftKey) key.push("Shift");
            if (e.altKey) key.push("Alt");

            key.push(e.key.toUpperCase());

            const combination = key.join("+");

            if (this.shortcuts[combination]) {

                e.preventDefault();

                this.shortcuts[combination]();

            }

        });

    },

    register(combination, callback) {

        this.shortcuts[combination] = callback;

    },

    unregister(combination) {

        delete this.shortcuts[combination];

    }

};

/** ======= Auto Initializer ========== */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();
});