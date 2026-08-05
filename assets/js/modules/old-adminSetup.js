/*
==========================================================
StudentManager Pro Enterprise
Admin Setup Module
Part 1 — School Records
==========================================================
*/

import {
    db
} from "../firebase/firebase-config.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ======================================================
   SCHOOL RECORD
====================================================== */

const SCHOOL_DOCUMENT = "main";


/* ======================================================
   DEFAULT SCHOOL RECORD
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
   LOAD SCHOOL RECORD
====================================================== */

export async function loadSchoolRecord(schoolId = SCHOOL_DOCUMENT) {

    try {

        const schoolRef = doc(
            db,
            "schools",
            schoolId
        );

        const snapshot = await getDoc(schoolRef);

        if (!snapshot.exists()) {

            return {

                success: true,

                exists: false,

                data: defaultSchoolRecord

            };

        }

        return {

            success: true,

            exists: true,

            data: snapshot.data()

        };

    }

    catch (error) {

        console.error(
            "Unable to load school record:",
            error
        );

        return {

            success: false,

            exists: false,

            data: null,

            error

        };

    }

}


/* ======================================================
   SAVE SCHOOL RECORD
====================================================== */

export async function saveSchoolRecord(
    schoolData,
    schoolId = SCHOOL_DOCUMENT
) {

    try {

        const schoolRef = doc(
            db,
            "schools",
            schoolId
        );

        const cleanedData = {

            ...defaultSchoolRecord,

            ...schoolData,

            updatedAt: serverTimestamp()

        };

        await setDoc(

            schoolRef,

            cleanedData,

            {
                merge: true
            }

        );

        return {

            success: true,

            message:
                "School records saved successfully."

        };

    }

    catch (error) {

        console.error(
            "Unable to save school record:",
            error
        );

        return {

            success: false,

            message:
                "Unable to save school records.",

            error

        };

    }

}


/* ======================================================
   EXPORT DEFAULT SCHOOL RECORD
====================================================== */

export {
    defaultSchoolRecord
};