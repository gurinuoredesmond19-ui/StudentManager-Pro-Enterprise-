/*
=========================================
StudentManager Pro Enterprise
Firebase Configuration
=========================================
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsnZT3qdJuDTs68SbrX2UTKxeWnbFhqnY",
    authDomain: "studentmanager-pro-enterprise.firebaseapp.com",
    projectId: "studentmanager-pro-enterprise",
    storageBucket: "studentmanager-pro-enterprise.firebasestorage.app",
    messagingSenderId: "1069341597303",
    appId: "1:1069341597303:web:197f2fb355139e5aa17072"
};

 export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);