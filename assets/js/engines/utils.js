




/*==================================================
    UTILITY HELPERS ENGINE
==================================================*/

App.UI.Utils = {

    init() {

        console.log("Utility Helpers Loaded");

    },

    /*---------------------------------------------
      FORMAT DATE
    ---------------------------------------------*/
    formatDate(date = new Date()) {

        return new Intl.DateTimeFormat("en-GB").format(date);

    },

    /*---------------------------------------------
      FORMAT DATE & TIME
    ---------------------------------------------*/
    formatDateTime(date = new Date()) {

        return date.toLocaleString();

    },

    /*---------------------------------------------
      FORMAT CURRENCY
    ---------------------------------------------*/
    currency(amount) {

        return new Intl.NumberFormat("en-GH", {

            style: "currency",

            currency: "GHS"

        }).format(amount);

    },

    /*---------------------------------------------
      GENERATE RANDOM ID
    ---------------------------------------------*/
    randomId(length = 8) {

        const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let id = "";

        for (let i = 0; i < length; i++) {

            id += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );

        }

        return id;

    },

    /*---------------------------------------------
      COPY TO CLIPBOARD
    ---------------------------------------------*/
    copy(text) {

        navigator.clipboard.writeText(text);

    },

    /*---------------------------------------------
      DEBOUNCE
    ---------------------------------------------*/
    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

};
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
