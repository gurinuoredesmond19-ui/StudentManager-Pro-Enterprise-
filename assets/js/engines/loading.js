

/*==================================================
    LOADING ENGINE
==================================================*/

App.UI.Loading = {

    active: false,

    show() {

        const loader = document.getElementById("appLoading");

        if (!loader) return;

        loader.classList.add("show");

        this.active = true;

    },

    hide() {

        const loader = document.getElementById("appLoading");

        if (!loader) return;

        loader.classList.remove("show");

        this.active = false;

    },

    isLoading() {

        return this.active;

    }

};


/**===== Button Loading ======== */

App.UI.Loading.button = function(button, text = "Loading...") {

    if (!button) return;

    button.dataset.original = button.innerHTML;

    button.disabled = true;

    button.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        ${text}

    `;

}



/**===== Restore Button  ======== */

App.UI.Loading.restoreButton = function(button){

    if(!button) return;

    button.disabled = false;

    button.innerHTML = button.dataset.original;

}





/**===== Loading Delay Helper ======== */

App.UI.Loading.wait = function(milliseconds){

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
