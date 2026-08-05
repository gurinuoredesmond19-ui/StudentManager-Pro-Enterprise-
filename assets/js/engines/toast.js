


/*=====================================================
  TOAST NOTIFICATION ENGINE
=====================================================*/


App.UI.Toast = function (options = {}) {

    const type = options.type || "info";
    const title = options.title || "Notification";
    const message = options.message || "";
    const duration = options.duration || 5000;

    let container = document.querySelector(".app-toast-container");

    if (!container) {

        container = document.createElement("div");
        container.className = "app-toast-container";

        document.body.appendChild(container);

    }

    const icons = {

        success: "fa-solid fa-circle-check",

        error: "fa-solid fa-circle-xmark",

        warning: "fa-solid fa-triangle-exclamation",

        info: "fa-solid fa-circle-info"

    };

    const toast = document.createElement("div");

    toast.className = `app-toast app-toast-${type}`;

    toast.innerHTML = `

        <div class="app-toast-icon">
            <i class="${icons[type]}"></i>
        </div>

        <div class="app-toast-content">

            <div class="app-toast-title">
                ${title}
            </div>

            <div class="app-toast-message">
                ${message}
            </div>

        </div>

        <div class="app-toast-close">
            <i class="fa-solid fa-xmark"></i>
        </div>

        <div class="app-toast-progress"></div>

    `;

    container.appendChild(toast);

    const removeToast = () => {

        toast.style.animation = "toastOut .30s forwards";

        setTimeout(() => {

            toast.remove();

        }, 300);

    };

    toast.querySelector(".app-toast-close")

        .addEventListener("click", removeToast);

    setTimeout(removeToast, duration);

};



App.UI.success = function(message){

    App.UI.Toast({

        type:"success",

        title:"Success",

        message:message

    });

};

App.UI.error = function(message){

    App.UI.Toast({

        type:"error",

        title:"Error",

        message:message

    });

};

App.UI.warning = function(message){

    App.UI.Toast({

        type:"warning",

        title:"Warning",

        message:message

    });

};

App.UI.info = function(message){

    App.UI.Toast({

        type:"info",

        title:"Information",

        message:message

    });

};

App.UI.playNotification = function(){
    const audio = new Audio("assests/audio/notification.mp3");
    audio.volume = 0.25;
    audio.play() .catch(()=>{});


}

/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})

