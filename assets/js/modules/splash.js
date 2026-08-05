/*
=========================================
StudentManager Pro Enterprise
Splash Screen Engine
Version 1.0
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    let progress = 0;
    const loadingText = document.getElementById("loadingPercentage");

    const timer = setInterval(() => {

        progress++;

        if (loadingText) {
            loadingText.textContent = progress + "%";
        }

        if (progress >= 100) {

            clearInterval(timer);

            setTimeout(() => {

                // TODO:
                // Later we'll replace this with Firebase Authentication

                const loggedIn = false;

                if (loggedIn) {
                    window.location.href = "dashboard.html";
                } else {
                    window.location.href = "login.html";
                }

            }, 500);

        }

    }, 30);

});