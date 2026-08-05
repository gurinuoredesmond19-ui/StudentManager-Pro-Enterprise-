/*
==========================================================
StudentManager Pro Enterprise
Authentication Engine
Version 1.0
==========================================================
*/

import {
    auth,
    db
} from "../firebase/firebase-config.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {

    doc,
    getDoc,

    collection,
    query,
    where,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ======================================================
   AUTHENTICATION STATE
====================================================== */

const authState = {

    user: null,

    profile: null,

    authenticated: false

};


/* ======================================================
   SIGN IN
====================================================== */

export async function login(email, password) {

    try {

        
           const userEmail =
    await findUserEmail(email);

if (!userEmail) {

    return {

        success: false,

        message: "User not found."

    };

}

const credential =
    await signInWithEmailAndPassword(

        auth,

        userEmail,

        password

    );
            

        authState.user = credential.user;

        authState.authenticated = true;

        return {

            success: true,

            user: credential.user

        };

    } catch (error) {

        return {

            success: false,

            code: error.code,

            message: error.message

        };

    }

}


/* ======================================================
   SIGN OUT
====================================================== */

export async function logout() {

    try {

        await signOut(auth);

        authState.user = null;
        authState.profile = null;
        authState.authenticated = false;

        return {

            success: true

        };

    } catch (error) {

        return {

            success: false,

            code: error.code,

            message: error.message

        };

    }

}



/* ======================================================
   PASSWORD RESET
====================================================== */

export async function resetPassword(email) {

    try {

        await sendPasswordResetEmail(auth, email);

        return {

            success: true

        };

    } catch (error) {

        return {

            success: false,

            code: error.code,

            message: error.message

        };

    }

}



/* ======================================================
   GET CURRENT USER
====================================================== */

export function getCurrentUser() {

    return auth.currentUser;

}



/* ======================================================
   LOAD USER PROFILE
====================================================== */

export async function loadUserProfile(uid) {

    try {

        const userRef = doc(db, "users", uid);

        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {

            return null;

        }

        authState.profile = snapshot.data();

        return snapshot.data();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}




/* ======================================================
   USER LOOKUP ENGINE
====================================================== */

export async function findUserEmail(identifier) {

    try {

        const usersRef = collection(db, "users");

        /*
        Search by Email
        */

        let q = query(

            usersRef,

            where("email", "==", identifier)

        );

        let snapshot = await getDocs(q);

        if (!snapshot.empty) {

            return snapshot.docs[0].data().email;

        }

        /*
        Search by Username
        */

        q = query(

            usersRef,

            where("username", "==", identifier)

        );

        snapshot = await getDocs(q);

        if (!snapshot.empty) {

            return snapshot.docs[0].data().email;

        }

        /*
        Search by Student ID
        */

        q = query(

            usersRef,

            where("studentId", "==", identifier)

        );

        snapshot = await getDocs(q);

        if (!snapshot.empty) {

            return snapshot.docs[0].data().email;

        }

        /*
        Search by Staff ID
        */

        q = query(

            usersRef,

            where("staffId", "==", identifier)

        );

        snapshot = await getDocs(q);

        if (!snapshot.empty) {

            return snapshot.docs[0].data().email;

        }

        return null;

    }

    catch (error) {

        console.error(error);

        return null;

    }

}



/* ======================================================
   AUTH STATE LISTENER
====================================================== */

/* ======================================================
   AUTH STATE LISTENER
====================================================== */

export function monitorAuth(callback) {

    return onAuthStateChanged(

        auth,

        async (user) => {

            if (user) {

                authState.user = user;

                authState.authenticated = true;

                await loadUserProfile(user.uid);

            }

            else {

                authState.user = null;

                authState.profile = null;

                authState.authenticated = false;

            }

            /*
            ------------------------------------------
            Firebase authentication is now initialized
            ------------------------------------------
            */

            if (!authInitialized) {

                authInitialized = true;

                resolveAuthReady(authState);

            }

            if (typeof callback === "function") {

                callback(authState);

            }

        }

    );

}


/* ======================================================
   GET AUTH STATE
====================================================== */

export function getAuthState() {

    return authState;

}



/* ======================================================
   AUTH READY SYSTEM
====================================================== */
 let resolveAuthReady;
 const authReady = new Promise((resolve) => {
    resolveAuthReady = resolve;
});

let authInitialized = false;





/* ======================================================
   GET CURRENT USER ROLE
====================================================== */

export function getUserRole() {

    if (!authState.authenticated) {

        return null;

    }

    if (!authState.profile) {

        return null;

    }

    return authState.profile.role || null;

}


/* ======================================================
   WAIT FOR AUTHENTICATION TO INITIALIZE
====================================================== */

export function waitForAuth() {

    return authReady;

}