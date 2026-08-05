/*
====================================================
StudentManager Pro Enterprise
Core Application
Version: 1.0
====================================================
*/

const App = {

    version: "1.0.0",

    name: "StudentManager Pro Enterprise",

    initialized: false,

    config: {

        schoolName: "StudentManager Pro",

        theme: "light",

        language: "en",

        currency: "GHS"

    },

    UI: {},

    Auth: {},

    Firebase: {},

    Dashboard: {},

    Students: {},

    Teachers: {},

    Subjects: {},

    Classes: {},

    Registration: {},

    Attendance: {},

    Marks: {},

    Reports: {},

    Fees: {},

    Timetable: {},

    Analytics: {},

    Settings: {},

    Utils: {},

    init() {

        if (this.initialized) return;

        console.log("====================================");
        console.log(this.name);
        console.log("Version :", this.version);
        console.log("Initializing...");
        console.log("====================================");

        this.initialized = true;

        this.loadTheme();

        this.bindEvents();

    },

    loadTheme() {

        document.body.setAttribute("data-theme", this.config.theme);

    },

    bindEvents() {

        console.log("Global Events Loaded");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

/*======== Utility Functions ==========*/

App.Utils = {

    id(id){

        return document.getElementById(id);

    },

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

        return document.querySelectorAll(selector);

    },

    create(tag){

        return document.createElement(tag);

    },

    randomID(){

        return Math.random().toString(36).substring(2,10);

    },

    today(){

        return new Date();

    }

};

/*======== Currency Formatter ======*/


App.Utils.currency = function(amount){

    return new Intl.NumberFormat("en-GH",{

        style:"currency",

        currency:"GHS"

    }).format(amount);

};

/*===== Number Formatter =====*/

App.Utils.number = function(number){
  return new
  Intl.NumberFormat().format(number)
}


/*=======Date Formatter =======*/


App.Utils.date = function(date){

    return new Date(date).toLocaleDateString("en-GB",{

        day:"numeric",

        month:"short",

        year:"numeric"

    });

};


/*===== Time Formatter ======*/
App.Utils.time = function(date){

    return new Date(date).toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

};


/*===== Loading Manager ======*/

App.Loading = {

    show(){

        document.getElementById("loadingOverlay")

        ?.classList.add("show");

    },

    hide(){

        document.getElementById("loadingOverlay")

        ?.classList.remove("show");

    }

};


/*========== Notification manager =====*/

App.Notify = {

    success(message){

        console.log("SUCCESS :",message);

    },

    error(message){

        console.log("ERROR :",message);

    },

    warning(message){

        console.log("WARNING :",message);

    },

    info(message){

        console.log("INFO :",message);

    }

};


/*======== Local Storage ======*/

App.Storage = {

    set(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key){

        return JSON.parse(

            localStorage.getItem(key)

        );

    },

    remove(key){

        localStorage.removeItem(key);

    },

    clear(){

        localStorage.clear();

    }

};

/*===== Theme Manager ====*/

App.Theme = {

    set(theme){

        document.body.setAttribute(

            "data-theme",

            theme

        );

        App.Storage.set(

            "theme",

            theme

        );

    },

    load(){

        const theme =

        App.Storage.get("theme")

        || "light";

        this.set(theme);

    }

};


/*====== System Ready =======*/

document.addEventListener("DOMContentLoaded", ()=>{
  App.init();
  App.Theme.load();
})
