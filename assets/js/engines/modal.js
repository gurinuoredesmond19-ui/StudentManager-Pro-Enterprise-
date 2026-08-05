/*
========================================================
 StudentManager Pro Enterprise
 UI Engine
 Version 1.0
========================================================
*/



/*==================== MODAL ENGINE =================== */

App.UI.Modal = {

    activeModal: null,

    init() {

        this.initializeModals();

        console.log("UI Engine Loaded");

    },

    initializeModals() {

        document.querySelectorAll(".app-modal").forEach(modal => {

            modal.addEventListener("click", function (e) {

                if (e.target === modal) {

                    App.UI.closeModal(modal.id);

                }

            });

        });

    },

    openModal(id) {

        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

        this.activeModal = id;

    },

    closeModal(id) {

        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.remove("show");

        document.body.style.overflow = "";

        this.activeModal = null;

    },

    closeAllModals() {

        document.querySelectorAll(".app-modal")

        .forEach(modal => {

            modal.classList.remove("show");

        });

        document.body.style.overflow = "";

        this.activeModal = null;

    }

};


/* ========== ESC Closes Modal========*/

document.addEventListener("keydown",
  function(e){
    if (e.key=== "Escspe"){
      App.UI.closeAllModals()
    }
  }
)


/* ====== Open Button Autho ========*/


document.querySelectorAll("[data-modal]")

.forEach(button=>{

    button.addEventListener("click",function(){

        App.UI.openModal(

            this.dataset.modal

        );

    });

});


/* ====== Close Button Autho ========*/


document.querySelectorAll("[data-close]")

.forEach(button=>{

    button.addEventListener("click",function(){

        App.UI.closeModal(

            this.dataset.close

        );

    });

});





/* === Prevent Multiple Open ===*/

App.UI.isModalOpen= function(){
  return this. activeModal!==null

}


/*== Get Active Modal ===*/

App.UI.getActiveModal= function(){
  return this.activeModal;

}

/*==== Center Modal Auth ====*/
App.UI.centerModal=function(id){

    const modal=document.getElementById(id);

    if(!modal) return;

    modal.scrollTop=0;

}


/*==== Shake Modal ====*/

App.UI.shakeModal=function(id){

    const modal=document.getElementById(id);

    if(!modal) return;

    modal.classList.add("app-shake");

    setTimeout(()=>{

        modal.classList.remove("app-shake");

    },400);

}


/*======== Confirmation Before Closing  ========= */


App.UI.closeWithConfirmation= function(id){
  if(confirm("Close this window?")){
    App.UI.closeModal(id)
  }
}


/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})

