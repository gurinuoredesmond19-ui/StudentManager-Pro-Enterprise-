



/*==================================================
    CONFIRM DIALOG ENGINE
==================================================*/

App.UI.Confirm = {

    init() {

        console.log("Confirm Dialog Engine Loaded");

    },

    show(options = {}) {

        return new Promise((resolve) => {

            const title = options.title || "Confirmation";

            const message = options.message || "Are you sure?";

            const confirmText = options.confirmText || "Yes";

            const cancelText = options.cancelText || "Cancel";

            const modal = document.getElementById("appConfirmModal");

            if (!modal) {

                console.error("Confirm modal not found.");

                resolve(false);

                return;

            }

            modal.querySelector(".confirm-title").innerText = title;

            modal.querySelector(".confirm-message").innerText = message;

            modal.querySelector(".confirm-ok").innerText = confirmText;

            modal.querySelector(".confirm-cancel").innerText = cancelText;

            modal.classList.add("show");

            const ok = modal.querySelector(".confirm-ok");

            const cancel = modal.querySelector(".confirm-cancel");

            const close = (result) => {

                modal.classList.remove("show");

                ok.onclick = null;

                cancel.onclick = null;

                resolve(result);

            };

            ok.onclick = () => close(true);

            cancel.onclick = () => close(false);

        });

    }

};

  /**======= Quick Delete Dialog ========== */

  App.UI.Confirm.delete = function(item 
    = "record"){

    return this.show({

        title: "Delete",

        message: `Are you sure you want to delete this ${item}?`,

        confirmText: "Delete",

        cancelText: "Cancel"

    });

}


/**========= Logout Dialog =========== */

App.UI.Confirm.logout = function(){

    return this.show({

        title: "Logout",

        message: "Do you want to logout from the system?",

        confirmText: "Logout",

        cancelText: "Stay"

    });

}


/**====== Reset Dialog ======== */
App.UI.Confirm.reset = function(){

    return this.show({

        title: "Reset",

        message: "This action cannot be undone.",

        confirmText: "Reset",

        cancelText: "Cancel"

    });

}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
