











/*==================================================
    SCROLL TO TOP ENGINE
==================================================*/

App.UI.Scroll = {

    button: null,

    init() {

        this.button = document.getElementById("scrollTopBtn");

        if (!this.button) return;

        window.addEventListener("scroll", () => {

            this.toggle();

        });

        this.button.addEventListener("click", () => {

            this.toTop();

        });

    },

    toggle() {

        if (window.scrollY > 300) {

            this.button.classList.add("show");

        } else {

            this.button.classList.remove("show");

        }

    },

    toTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


};
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
