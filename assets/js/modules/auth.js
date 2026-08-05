/*
=========================================
StudentManager Pro Enterprise
Authentication Module
Version 1.0
=========================================
*/



import { auth, db } from "../firebase/firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", loginUser);

});

 async function loginUser(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    if(username === ""){

        App.UI.Toast({
            message:"Please enter your email or username.",
            type:"warning"
        });

        return;
    }

    if(password === ""){

        App.UI.Toast({
            message:"Please enter your password.",
            type:"warning"
        });

        return;
    }

    const button = document.querySelector(".app-btn");

    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Signing In...";

   
    try {

    const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
    );

    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {

        App.UI.Toast({
            message: "User profile not found.",
            type: "error"
        });

        button.disabled = false;
        button.innerHTML = originalText;
        return;
    }

    const userData = userDoc.data();

    if (userData.status !== "active") {

        App.UI.Toast({
            message: "Your account has been disabled.",
            type: "error"
        });

        button.disabled = false;
        button.innerHTML = originalText;
        return;
    }

    App.UI.Toast({
        message: "Login successful!",
        type: "success"
    });

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);

} catch (error) {

    button.disabled = false;
    button.innerHTML = originalText;

    App.UI.Toast({
        message: error.message,
        type: "error"
    });

}

}