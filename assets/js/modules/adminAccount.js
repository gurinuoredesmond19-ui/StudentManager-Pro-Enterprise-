/*
==========================================================
StudentManager Pro Enterprise
Admin Account Module
Part 7 — Firebase Authentication + Firestore
==========================================================
*/

import {
    auth,
    db
} from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ======================================================
   CONFIGURATION
====================================================== */

const ADMIN_COLLECTION = "administrators";


/* ======================================================
   DOM ELEMENTS
====================================================== */

const adminEmail =
    document.getElementById("adminEmail");

const adminName =
    document.getElementById("adminName");

const adminPhone =
    document.getElementById("adminPhone");

const adminRole =
    document.getElementById("adminRole");

const adminStatus =
    document.getElementById("adminStatus");

const adminUid =
    document.getElementById("adminUid");

const saveButton =
    document.getElementById("saveAdminAccount");

const resetButton =
    document.getElementById("resetAdminAccount");

const message =
    document.getElementById("adminAccountMessage");


/* ======================================================
   STATE
====================================================== */

let currentUser = null;

let originalProfile = null;


/* ======================================================
   MESSAGE
====================================================== */

function showMessage(text, type = "info") {

    if (!message) return;

    message.textContent = text;

    message.className =
        `setup-message ${type}`;

}


function clearMessage() {

    if (!message) return;

    message.textContent = "";

    message.className =
        "setup-message";

}


/* ======================================================
   BUTTON STATE
====================================================== */

function setSavingState(isSaving) {

    if (!saveButton) return;

    if (isSaving) {

        saveButton.disabled = true;

        saveButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Saving Admin Account...
        `;

    } else {

        saveButton.disabled = false;

        saveButton.innerHTML = `
            <i class="fa-solid fa-floppy-disk"></i>
            Save Admin Account
        `;

    }

}


/* ======================================================
   LOAD FIREBASE USER
====================================================== */

async function loadAdminAccount(user) {

    currentUser = user;


    if (!user) {

        showMessage(
            "No authenticated administrator was found. Please sign in again.",
            "error"
        );

        if (saveButton) {

            saveButton.disabled = true;

        }

        return;

    }


    /* -----------------------------------------------
       Firebase Authentication information
    ------------------------------------------------ */

    if (adminEmail) {

        adminEmail.value =
            user.email || "";

    }


    if (adminUid) {

        adminUid.value =
            user.uid || "";

    }


    if (adminRole) {

        adminRole.value =
            "Administrator";

    }


    if (adminStatus) {

        adminStatus.value =
            user.emailVerified
                ? "Active"
                : "Active — Email not verified";

    }


    /* -----------------------------------------------
       Load Firestore administrator profile
    ------------------------------------------------ */

    try {

        const adminRef =
            doc(
                db,
                ADMIN_COLLECTION,
                user.uid
            );


        const snapshot =
            await getDoc(adminRef);


        if (snapshot.exists()) {

            const profile =
                snapshot.data();

            originalProfile = {
                ...profile
            };


            if (adminName) {

                adminName.value =
                    profile.name || "";

            }


            if (adminPhone) {

                adminPhone.value =
                    profile.phone || "";

            }


            showMessage(
                "Administrator profile loaded.",
                "success"
            );

        } else {

            originalProfile = null;


            /*
             * Use Firebase Auth display name
             * if one already exists.
             */

            if (adminName) {

                adminName.value =
                    user.displayName || "";

            }


            showMessage(
                "Administrator account is ready for setup.",
                "info"
            );

        }

    }

    catch (error) {

        console.error(
            "Admin profile loading error:",
            error
        );


        showMessage(
            "Unable to load administrator profile.",
            "error"
        );

    }

}


/* ======================================================
   VALIDATE
====================================================== */

function validateAdminAccount() {

    const name =
        adminName?.value.trim() || "";


    if (!name) {

        showMessage(
            "Please enter the administrator name.",
            "error"
        );

        adminName?.focus();

        return false;

    }


    if (name.length < 2) {

        showMessage(
            "Administrator name must contain at least 2 characters.",
            "error"
        );

        adminName?.focus();

        return false;

    }


    return true;

}


/* ======================================================
   SAVE ADMIN PROFILE
====================================================== */

async function saveAdminAccount() {

    clearMessage();


    if (!currentUser) {

        showMessage(
            "No authenticated administrator was found.",
            "error"
        );

        return;

    }


    if (!validateAdminAccount()) {

        return;

    }


    try {

        setSavingState(true);


        showMessage(
            "Saving administrator account...",
            "info"
        );


        const adminRef =
            doc(
                db,
                ADMIN_COLLECTION,
                currentUser.uid
            );


        const profileData = {

            uid:
                currentUser.uid,

            email:
                currentUser.email || "",

            name:
                adminName?.value.trim() || "",

            phone:
                adminPhone?.value.trim() || "",

            role:
                "admin",

            accountStatus:
                "active",

            emailVerified:
                currentUser.emailVerified || false,

            updatedAt:
                serverTimestamp()

        };


        /*
         * If this is the first save,
         * create the profile timestamp.
         */

        if (!originalProfile) {

            profileData.createdAt =
                serverTimestamp();

        }


        await setDoc(
            adminRef,
            profileData,
            {
                merge: true
            }
        );


        originalProfile = {
            ...profileData
        };


        showMessage(
            "Administrator account saved successfully.",
            "success"
        );


    }

    catch (error) {

        console.error(
            "Admin account save error:",
            error
        );


        let errorMessage =
            "Unable to save administrator account.";


        if (
            error?.code ===
            "permission-denied"
        ) {

            errorMessage =
                "Permission denied. Please check your Firestore security rules.";

        }


        showMessage(
            errorMessage,
            "error"
        );

    }

    finally {

        setSavingState(false);

    }

}


/* ======================================================
   RESET
====================================================== */

function resetAdminAccount() {

    clearMessage();


    if (!currentUser) return;


    if (originalProfile) {

        if (adminName) {

            adminName.value =
                originalProfile.name || "";

        }


        if (adminPhone) {

            adminPhone.value =
                originalProfile.phone || "";

        }

    } else {

        if (adminName) {

            adminName.value =
                currentUser.displayName || "";

        }


        if (adminPhone) {

            adminPhone.value = "";

        }

    }


    showMessage(
        "Administrator changes have been reset.",
        "info"
    );

}


/* ======================================================
   EVENTS
====================================================== */

saveButton?.addEventListener(
    "click",
    saveAdminAccount
);


resetButton?.addEventListener(
    "click",
    resetAdminAccount
);


/* ======================================================
   AUTH STATE
====================================================== */

onAuthStateChanged(
    auth,
    async (user) => {

        await loadAdminAccount(user);

    }
);