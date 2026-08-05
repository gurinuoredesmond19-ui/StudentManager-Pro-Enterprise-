/*
==========================================================
StudentManager Pro Enterprise
Admin Setup Module
Part 3 — School Records Controller
==========================================================
*/

import {
    db,
    storage
} from "../firebase/firebase-config.js";

import {
    monitorAuth,
    getUserRole
} from "../core/auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


/* ======================================================
   CONFIGURATION
====================================================== */

const SCHOOL_ID = "main";

const SCHOOL_DOCUMENT = doc(
    db,
    "schools",
    SCHOOL_ID
);


/* ======================================================
   DOM ELEMENTS
====================================================== */

const elements = {

    schoolName:
        document.getElementById("schoolName"),

    schoolCode:
        document.getElementById("schoolCode"),

    schoolType:
        document.getElementById("schoolType"),

    motto:
        document.getElementById("motto"),

    description:
        document.getElementById("description"),

    schoolLogo:
        document.getElementById("schoolLogo"),

    schoolLogoPreview:
        document.getElementById("schoolLogoPreview"),

    address:
        document.getElementById("address"),

    city:
        document.getElementById("city"),

    region:
        document.getElementById("region"),

    country:
        document.getElementById("country"),

    phone:
        document.getElementById("phone"),

    alternatePhone:
        document.getElementById("alternatePhone"),

    email:
        document.getElementById("email"),

    website:
        document.getElementById("website"),

    headName:
        document.getElementById("headName"),

    academicYear:
        document.getElementById("academicYear"),

    currentTerm:
        document.getElementById("currentTerm"),

    saveButton:
        document.getElementById("saveSchoolRecords"),

    resetButton:
        document.getElementById("resetSchoolForm"),

    message:
        document.getElementById("setupMessage")

};


/* ======================================================
   STATE
====================================================== */

let currentLogoUrl = "";

let selectedLogoFile = null;

let adminAuthorized = false;


/* ======================================================
   DEFAULT DATA
====================================================== */

const defaultSchoolRecord = {

    schoolName: "",

    schoolCode: "",

    schoolType: "",

    motto: "",

    description: "",

    logoUrl: "",

    address: "",

    city: "",

    region: "",

    country: "",

    phone: "",

    alternatePhone: "",

    email: "",

    website: "",

    headName: "",

    academicYear: "",

    currentTerm: "",

    status: "active"

};


/* ======================================================
   MESSAGE
====================================================== */

function showMessage(message, type = "info") {

    if (!elements.message) return;

    elements.message.textContent = message;

    elements.message.className =
        `setup-message ${type}`;

}


/* ======================================================
   CLEAR MESSAGE
====================================================== */

function clearMessage() {

    if (!elements.message) return;

    elements.message.textContent = "";

    elements.message.className =
        "setup-message";

}


/* ======================================================
   ACCESS DENIED
====================================================== */

function denyAccess(message = "Administrator access required.") {

    adminAuthorized = false;

    if (elements.saveButton) {

        elements.saveButton.disabled = true;

    }

    if (elements.resetButton) {

        elements.resetButton.disabled = true;

    }

    if (elements.schoolLogo) {

        elements.schoolLogo.disabled = true;

    }

    showMessage(
        message,
        "error"
    );

}


/* ======================================================
   ADMIN ACCESS CHECK
====================================================== */

function verifyAdminAccess() {

    const role =
        getUserRole();

    if (role !== "admin") {

        denyAccess(
            "Access denied. Administrator privileges are required."
        );

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1500);

        return false;

    }

    adminAuthorized = true;

    return true;

}


/* ======================================================
   SET BUTTON LOADING
====================================================== */

function setSavingState(isSaving) {

    if (!elements.saveButton) return;

    if (isSaving) {

        elements.saveButton.disabled = true;

        elements.saveButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Saving...
        `;

    } else {

        elements.saveButton.disabled = false;

        elements.saveButton.innerHTML = `
            <i class="fa-solid fa-floppy-disk"></i>
            Save School Records
        `;

    }

}


/* ======================================================
   GET FORM DATA
====================================================== */

function getFormData() {

    return {

        schoolName:
            elements.schoolName?.value.trim() || "",

        schoolCode:
            elements.schoolCode?.value.trim() || "",

        schoolType:
            elements.schoolType?.value || "",

        motto:
            elements.motto?.value.trim() || "",

        description:
            elements.description?.value.trim() || "",

        logoUrl:
            currentLogoUrl || "",

        address:
            elements.address?.value.trim() || "",

        city:
            elements.city?.value.trim() || "",

        region:
            elements.region?.value.trim() || "",

        country:
            elements.country?.value.trim() || "",

        phone:
            elements.phone?.value.trim() || "",

        alternatePhone:
            elements.alternatePhone?.value.trim() || "",

        email:
            elements.email?.value.trim() || "",

        website:
            elements.website?.value.trim() || "",

        headName:
            elements.headName?.value.trim() || "",

        academicYear:
            elements.academicYear?.value.trim() || "",

        currentTerm:
            elements.currentTerm?.value || "",

        status: "active"

    };

}


/* ======================================================
   VALIDATE FORM
====================================================== */

function validateForm(data) {

    if (!data.schoolName) {

        showMessage(
            "Please enter the official school name.",
            "error"
        );

        elements.schoolName?.focus();

        return false;

    }

    if (
        data.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {

        showMessage(
            "Please enter a valid school email address.",
            "error"
        );

        elements.email?.focus();

        return false;

    }

    if (data.website) {

        try {

            new URL(data.website);

        } catch {

            showMessage(
                "Please enter a valid website URL.",
                "error"
            );

            elements.website?.focus();

            return false;

        }

    }

    return true;

}


/* ======================================================
   FILL FORM
====================================================== */

function fillForm(data) {

    if (!data) return;

    if (elements.schoolName)
        elements.schoolName.value =
            data.schoolName || "";

    if (elements.schoolCode)
        elements.schoolCode.value =
            data.schoolCode || "";

    if (elements.schoolType)
        elements.schoolType.value =
            data.schoolType || "";

    if (elements.motto)
        elements.motto.value =
            data.motto || "";

    if (elements.description)
        elements.description.value =
            data.description || "";

    if (elements.address)
        elements.address.value =
            data.address || "";

    if (elements.city)
        elements.city.value =
            data.city || "";

    if (elements.region)
        elements.region.value =
            data.region || "";

    if (elements.country)
        elements.country.value =
            data.country || "";

    if (elements.phone)
        elements.phone.value =
            data.phone || "";

    if (elements.alternatePhone)
        elements.alternatePhone.value =
            data.alternatePhone || "";

    if (elements.email)
        elements.email.value =
            data.email || "";

    if (elements.website)
        elements.website.value =
            data.website || "";

    if (elements.headName)
        elements.headName.value =
            data.headName || "";

    if (elements.academicYear)
        elements.academicYear.value =
            data.academicYear || "";

    if (elements.currentTerm)
        elements.currentTerm.value =
            data.currentTerm || "";

    currentLogoUrl =
        data.logoUrl || "";

    if (currentLogoUrl) {

        showLogoPreview(currentLogoUrl);

    } else {

        resetLogoPreview();

    }

}


/* ======================================================
   LOAD SCHOOL RECORD
====================================================== */

async function loadSchoolRecord() {

    if (!adminAuthorized) {

        return;

    }

    try {

        showMessage(
            "Loading school records...",
            "info"
        );

        const snapshot =
            await getDoc(
                SCHOOL_DOCUMENT
            );

        if (!snapshot.exists()) {

            fillForm(
                defaultSchoolRecord
            );

            clearMessage();

            return;

        }

        fillForm(
            snapshot.data()
        );

        showMessage(
            "School records loaded.",
            "success"
        );

    }

    catch (error) {

        console.error(
            "School record loading error:",
            error
        );

        showMessage(
            "Unable to load school records.",
            "error"
        );

    }

}


/* ======================================================
   LOGO PREVIEW
====================================================== */

function showLogoPreview(source) {

    if (!elements.schoolLogoPreview) return;

    elements.schoolLogoPreview.innerHTML = `
        <img
            src="${source}"
            alt="School Logo Preview">
    `;

}


/* ======================================================
   RESET LOGO PREVIEW
====================================================== */

function resetLogoPreview() {

    if (!elements.schoolLogoPreview) return;

    elements.schoolLogoPreview.innerHTML = `
        <i class="fa-solid fa-school"></i>
        <span>No logo selected</span>
    `;

}


/* ======================================================
   HANDLE LOGO SELECTION
====================================================== */

function handleLogoSelection(event) {

    if (!adminAuthorized) {

        denyAccess();

        return;

    }

    const file =
        event.target.files?.[0];

    if (!file) return;


    const allowedTypes = [

        "image/png",
        "image/jpeg",
        "image/webp"

    ];


    if (!allowedTypes.includes(file.type)) {

        showMessage(
            "Please choose a PNG, JPG or WebP image.",
            "error"
        );

        event.target.value = "";

        selectedLogoFile = null;

        return;

    }


    const maxSize =
        2 * 1024 * 1024;


    if (file.size > maxSize) {

        showMessage(
            "Logo must be 2 MB or smaller.",
            "error"
        );

        event.target.value = "";

        selectedLogoFile = null;

        return;

    }


    selectedLogoFile = file;


    const reader =
        new FileReader();


    reader.onload = () => {

        showLogoPreview(
            reader.result
        );

    };


    reader.readAsDataURL(file);


    clearMessage();

}


/* ======================================================
   UPLOAD LOGO
====================================================== */

async function uploadSchoolLogo(file) {

    if (!adminAuthorized) {

        throw new Error(
            "Administrator access required."
        );

    }

    if (!file) {

        return currentLogoUrl;

    }


    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();


    const logoReference =
        ref(
            storage,
            `schools/${SCHOOL_ID}/logo.${extension}`
        );


    await uploadBytes(

        logoReference,

        file,

        {
            contentType: file.type
        }

    );


    return await getDownloadURL(
        logoReference
    );

}


/* ======================================================
   SAVE SCHOOL RECORD
====================================================== */

async function saveSchoolRecords() {

    if (!adminAuthorized) {

        denyAccess();

        return;

    }


    clearMessage();


    const data =
        getFormData();


    if (!validateForm(data)) {

        return;

    }


    try {

        setSavingState(true);


        showMessage(
            "Saving school records...",
            "info"
        );


        if (selectedLogoFile) {

            data.logoUrl =
                await uploadSchoolLogo(
                    selectedLogoFile
                );

            currentLogoUrl =
                data.logoUrl;

        }


        await setDoc(

            SCHOOL_DOCUMENT,

            {

                ...defaultSchoolRecord,

                ...data,

                updatedAt:
                    serverTimestamp()

            },

            {
                merge: true
            }

        );


        selectedLogoFile = null;


        if (elements.schoolLogo) {

            elements.schoolLogo.value = "";

        }


        showMessage(
            "School records saved successfully.",
            "success"
        );

    }

    catch (error) {

        console.error(
            "School record save error:",
            error
        );


        showMessage(
            "Unable to save school records. Please try again.",
            "error"
        );

    }

    finally {

        setSavingState(false);

    }

}


/* ======================================================
   RESET FORM
====================================================== */

function resetSchoolForm() {

    if (!adminAuthorized) {

        denyAccess();

        return;

    }


    fillForm(
        defaultSchoolRecord
    );


    selectedLogoFile = null;

    currentLogoUrl = "";


    if (elements.schoolLogo) {

        elements.schoolLogo.value = "";

    }


    clearMessage();

}


/* ======================================================
   EVENTS
====================================================== */

elements.saveButton?.addEventListener(

    "click",

    saveSchoolRecords

);


elements.resetButton?.addEventListener(

    "click",

    resetSchoolForm

);


elements.schoolLogo?.addEventListener(

    "change",

    handleLogoSelection

);


/* ======================================================
   AUTHENTICATION INITIALIZATION
====================================================== */

monitorAuth(
    async (state) => {

        /*
        ==============================================
        WAIT FOR FIREBASE AUTH STATE
        ==============================================
        */

        if (!state.authenticated) {

            showMessage(
                "Checking administrator access...",
                "info"
            );

            return;

        }


        /*
        ==============================================
        VERIFY ADMIN ROLE
        ==============================================
        */

        if (!verifyAdminAccess()) {

            return;

        }


        /*
        ==============================================
        ADMIN VERIFIED
        ==============================================
        */

        await loadSchoolRecord();

    }
);