/*
=========================================
StudentManager Pro Enterprise
Student Service
Firebase / Firestore + Storage
=========================================
*/

import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
    db,
    auth,
    storage
} from "./firebase-config.js";


/*
=========================================
CONFIGURATION
=========================================
*/

const STUDENTS_COLLECTION = "students";

/*
 * Default human avatar.
 *
 * This is used whenever a student has no
 * passport photo.
 */
export const DEFAULT_AVATAR =
    "assets/images/avatar.png";


/*
=========================================
STUDENT COLLECTION REFERENCE
=========================================
*/

const studentsCollection =
    collection(
        db,
        STUDENTS_COLLECTION
    );


/*
=========================================
AUTHENTICATED USER
=========================================
*/

function getCurrentUserId() {

    return auth.currentUser?.uid || null;

}


/*
=========================================
STUDENT ID GENERATOR
=========================================

Firestore document ID is the permanent
database identifier.

studentId is the human-readable ID shown
to administrators, teachers and students.

Example:

STU/0001/26
STU/0002/26
=========================================
*/

function generateStudentId() {

    const year =
        String(new Date().getFullYear())
            .slice(-2);

    const randomNumber =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `STU/${randomNumber}/${year}`;

}


/*
=========================================
FILE NAME SANITIZER
=========================================
*/

function sanitizeFileName(fileName) {

    return String(fileName || "file")
        .replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
        );

}


/*
=========================================
CREATE STUDENT
=========================================
*/

export async function createStudent(
    studentData = {}
) {

    try {

        const userId =
            getCurrentUserId();


        const student = {

            /*
            -----------------------------
            Student Identity
            -----------------------------
            */

            studentId:
                studentData.studentId ||
                generateStudentId(),

            studentFirstName:
                studentData.studentFirstName || "",

            studentMiddleName:
                studentData.studentMiddleName || "",

            studentLastName:
                studentData.studentLastName || "",


            /*
            -----------------------------
            Personal Information
            -----------------------------
            */

            studentDateOfBirth:
                studentData.studentDateOfBirth || "",

            studentGender:
                studentData.studentGender || "",

            studentNationality:
                studentData.studentNationality || "",

            studentBirthPlace:
                studentData.studentBirthPlace || "",

            studentPreviousSchool:
                studentData.studentPreviousSchool || "",


            /*
            -----------------------------
            Contact Information
            -----------------------------
            */

            studentPhone:
                studentData.studentPhone || "",

            studentAlternativePhone:
                studentData.studentAlternativePhone || "",

            studentEmail:
                studentData.studentEmail || "",

            studentEmergencyPhone:
                studentData.studentEmergencyPhone || "",

            studentAddress:
                studentData.studentAddress || "",

            studentCity:
                studentData.studentCity || "",

            studentRegion:
                studentData.studentRegion || "",

            studentDigitalAddress:
                studentData.studentDigitalAddress || "",


            /*
            -----------------------------
            Guardian Information
            -----------------------------
            */

            guardianName:
                studentData.guardianName || "",

            guardianRelationship:
                studentData.guardianRelationship || "",

            guardianPhone:
                studentData.guardianPhone || "",

            guardianAlternativePhone:
                studentData.guardianAlternativePhone || "",

            guardianEmail:
                studentData.guardianEmail || "",

            guardianOccupation:
                studentData.guardianOccupation || "",

            guardianAddress:
                studentData.guardianAddress || "",


            /*
            -----------------------------
            Academic Information
            -----------------------------
            */

            studentLevel:
                studentData.studentLevel || "",

            studentProgramme:
                studentData.studentProgramme || "",

            studentHouse:
                studentData.studentHouse || "",

            studentAcademicYear:
                studentData.studentAcademicYear || "",

            studentIndexNumber:
                studentData.studentIndexNumber || "",


            /*
            -----------------------------
            Passport
            -----------------------------
            */

            passportPhotoUrl:
                studentData.passportPhotoUrl || "",

            passportStoragePath:
                studentData.passportStoragePath || "",


            /*
            -----------------------------
            Documents
            -----------------------------
            */

            birthCertificateUrl:
                studentData.birthCertificateUrl || "",

            birthCertificateStoragePath:
                studentData.birthCertificateStoragePath || "",

            placementDocumentUrl:
                studentData.placementDocumentUrl || "",

            placementDocumentStoragePath:
                studentData.placementDocumentStoragePath || "",

            otherDocumentUrl:
                studentData.otherDocumentUrl || "",

            otherDocumentStoragePath:
                studentData.otherDocumentStoragePath || "",


            /*
            -----------------------------
            System Status
            -----------------------------
            */

            status:
                studentData.status ||
                "Active",

            createdBy:
                studentData.createdBy ||
                userId,

            updatedBy:
                userId,

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp()

        };


        const documentReference =
            await addDoc(
                studentsCollection,
                student
            );


        console.log(
            "Student successfully created:",
            documentReference.id
        );


        return {

            id: documentReference.id,

            ...student,

            /*
             * Use the default avatar until
             * a real passport is uploaded.
             */
            passportPhotoUrl:
                student.passportPhotoUrl ||
                DEFAULT_AVATAR

        };

    } catch (error) {

        console.error(
            "Failed to create student:",
            error
        );

        throw error;

    }

}


/*
=========================================
GET ALL STUDENTS
=========================================
*/

export async function getStudents() {

    try {

        const studentsQuery =
            query(
                studentsCollection,
                orderBy(
                    "createdAt",
                    "desc"
                )
            );


        const snapshot =
            await getDocs(
                studentsQuery
            );


        return snapshot.docs.map(
            document => {

                const data =
                    document.data();


                return {

                    id:
                        document.id,

                    ...data,

                    /*
                     * Never return an empty
                     * passport image to the UI.
                     */
                    passportPhotoUrl:
                        data.passportPhotoUrl ||
                        DEFAULT_AVATAR

                };

            }
        );

    } catch (error) {

        console.error(
            "Failed to fetch students:",
            error
        );

        throw error;

    }

}


/*
=========================================
GET STUDENT BY FIRESTORE DOCUMENT ID
=========================================
*/

export async function getStudentById(
    studentDocumentId
) {

    try {

        if (!studentDocumentId) {

            throw new Error(
                "Student document ID is required."
            );

        }


        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        const snapshot =
            await getDoc(
                studentReference
            );


        if (!snapshot.exists()) {

            return null;

        }


        const data =
            snapshot.data();


        return {

            id:
                snapshot.id,

            ...data,

            passportPhotoUrl:
                data.passportPhotoUrl ||
                DEFAULT_AVATAR

        };

    } catch (error) {

        console.error(
            "Failed to fetch student:",
            error
        );

        throw error;

    }

}


/*
=========================================
UPDATE STUDENT
=========================================
*/

export async function updateStudent(
    studentDocumentId,
    studentData = {}
) {

    try {

        if (!studentDocumentId) {

            throw new Error(
                "Student document ID is required."
            );

        }


        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        const updateData = {

            ...studentData,

            updatedBy:
                getCurrentUserId(),

            updatedAt:
                serverTimestamp()

        };


        /*
         * Do not accidentally store the
         * UI's default avatar as a real
         * Firebase Storage photo.
         */
        if (
            updateData.passportPhotoUrl ===
            DEFAULT_AVATAR
        ) {

            updateData.passportPhotoUrl = "";

        }


        await updateDoc(
            studentReference,
            updateData
        );


        console.log(
            "Student successfully updated:",
            studentDocumentId
        );


        return await getStudentById(
            studentDocumentId
        );

    } catch (error) {

        console.error(
            "Failed to update student:",
            error
        );

        throw error;

    }

}


/*
=========================================
DELETE STUDENT
=========================================
*/

export async function deleteStudent(
    studentDocumentId
) {

    try {

        if (!studentDocumentId) {

            throw new Error(
                "Student document ID is required."
            );

        }


        /*
         * Get the student first so we can
         * remove their stored files too.
         */
        const student =
            await getStudentById(
                studentDocumentId
            );


        /*
         * Delete student's passport.
         */
        if (
            student?.passportStoragePath
        ) {

            await deleteStudentFile(
                student.passportStoragePath
            );

        }


        /*
         * Delete stored documents.
         */
        const documentPaths = [

            student?.birthCertificateStoragePath,

            student?.placementDocumentStoragePath,

            student?.otherDocumentStoragePath

        ];


        for (
            const storagePath
            of documentPaths
        ) {

            if (storagePath) {

                await deleteStudentFile(
                    storagePath
                );

            }

        }


        /*
         * Delete Firestore record.
         */
        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        await deleteDoc(
            studentReference
        );


        console.log(
            "Student successfully deleted:",
            studentDocumentId
        );


        return true;

    } catch (error) {

        console.error(
            "Failed to delete student:",
            error
        );

        throw error;

    }

}


/*
=========================================
UPLOAD STUDENT PASSPORT
=========================================

Each student receives a unique folder:

students/
    FIRESTORE_DOCUMENT_ID/
        passport/
            timestamp_filename.jpg

Therefore:

Student A ≠ Student B

A student's passport can never be
accidentally shared simply because
another student was registered later.
=========================================
*/

export async function uploadStudentPassport(
    studentDocumentId,
    file
) {

    try {

        if (!studentDocumentId) {

            throw new Error(
                "Student document ID is required."
            );

        }


        if (!(file instanceof File)) {

            throw new Error(
                "A valid passport image file is required."
            );

        }


        /*
         * Make sure the uploaded file is
         * actually an image.
         */
        if (
            !file.type.startsWith("image/")
        ) {

            throw new Error(
                "Passport must be an image file."
            );

        }


        /*
         * Get existing student record.
         */
        const existingStudent =
            await getStudentById(
                studentDocumentId
            );


        const oldStoragePath =
            existingStudent?.passportStoragePath ||
            "";


        /*
         * Unique filename.
         */
        const safeFileName =
            sanitizeFileName(
                file.name
            );


        const storagePath =
            `students/${studentDocumentId}/passport/${Date.now()}_${safeFileName}`;


        const storageReference =
            ref(
                storage,
                storagePath
            );


        /*
         * Upload image.
         */
        await uploadBytes(
            storageReference,
            file,
            {
                contentType:
                    file.type
            }
        );


        /*
         * Get public download URL.
         */
        const downloadUrl =
            await getDownloadURL(
                storageReference
            );


        /*
         * Save the URL AND storage path
         * to Firestore.
         */
        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        await updateDoc(
            studentReference,
            {

                passportPhotoUrl:
                    downloadUrl,

                passportStoragePath:
                    storagePath,

                updatedBy:
                    getCurrentUserId(),

                updatedAt:
                    serverTimestamp()

            }
        );


        /*
         * Remove the old passport only
         * AFTER the new passport has been
         * successfully uploaded and saved.
         */
        if (
            oldStoragePath &&
            oldStoragePath !== storagePath
        ) {

            try {

                await deleteStudentFile(
                    oldStoragePath
                );

            } catch (deleteError) {

                console.warn(
                    "Old passport could not be removed:",
                    deleteError
                );

            }

        }


        console.log(
            "Passport successfully uploaded:",
            studentDocumentId
        );


        return {

            passportPhotoUrl:
                downloadUrl,

            passportStoragePath:
                storagePath

        };

    } catch (error) {

        console.error(
            "Failed to upload passport:",
            error
        );

        throw error;

    }

}


/*
=========================================
UPLOAD STUDENT DOCUMENT
=========================================

Supported document types:

birthCertificate
placementDocument
otherDocument
=========================================
*/

export async function uploadStudentDocument(
    studentDocumentId,
    file,
    documentType
) {

    try {

        if (!studentDocumentId) {

            throw new Error(
                "Student document ID is required."
            );

        }


        if (!(file instanceof File)) {

            throw new Error(
                "A valid document file is required."
            );

        }


        const allowedTypes = [

            "birthCertificate",

            "placementDocument",

            "otherDocument"

        ];


        if (
            !allowedTypes.includes(
                documentType
            )
        ) {

            throw new Error(
                "Invalid student document type."
            );

        }


        const safeFileName =
            sanitizeFileName(
                file.name
            );


        const storagePath =
            `students/${studentDocumentId}/documents/${documentType}/${Date.now()}_${safeFileName}`;


        const storageReference =
            ref(
                storage,
                storagePath
            );


        /*
         * Upload file.
         */
        await uploadBytes(
            storageReference,
            file,
            {
                contentType:
                    file.type ||
                    "application/octet-stream"
            }
        );


        /*
         * Get download URL.
         */
        const downloadUrl =
            await getDownloadURL(
                storageReference
            );


        /*
         * Determine Firestore fields.
         */
        const urlFieldMap = {

            birthCertificate:
                "birthCertificateUrl",

            placementDocument:
                "placementDocumentUrl",

            otherDocument:
                "otherDocumentUrl"

        };


        const pathFieldMap = {

            birthCertificate:
                "birthCertificateStoragePath",

            placementDocument:
                "placementDocumentStoragePath",

            otherDocument:
                "otherDocumentStoragePath"

        };


        const urlField =
            urlFieldMap[
                documentType
            ];


        const pathField =
            pathFieldMap[
                documentType
            ];


        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        await updateDoc(
            studentReference,
            {

                [urlField]:
                    downloadUrl,

                [pathField]:
                    storagePath,

                updatedBy:
                    getCurrentUserId(),

                updatedAt:
                    serverTimestamp()

            }
        );


        return {

            url:
                downloadUrl,

            storagePath:
                storagePath,

            documentType:
                documentType

        };

    } catch (error) {

        console.error(
            "Failed to upload student document:",
            error
        );

        throw error;

    }

}


/*
=========================================
DELETE STUDENT STORAGE FILE
=========================================
*/

export async function deleteStudentFile(
    storagePath
) {

    try {

        if (!storagePath) {

            return false;

        }


        const storageReference =
            ref(
                storage,
                storagePath
            );


        await deleteObject(
            storageReference
        );


        console.log(
            "Student file deleted:",
            storagePath
        );


        return true;

    } catch (error) {

        console.error(
            "Failed to delete student file:",
            error
        );

        throw error;

    }

}


/*
=========================================
REMOVE STUDENT PASSPORT
=========================================
*/

export async function removeStudentPassport(
    studentDocumentId
) {

    try {

        const student =
            await getStudentById(
                studentDocumentId
            );


        if (
            student?.passportStoragePath
        ) {

            try {

                await deleteStudentFile(
                    student.passportStoragePath
                );

            } catch (error) {

                console.warn(
                    "Passport file could not be deleted from Storage:",
                    error
                );

            }

        }


        const studentReference =
            doc(
                db,
                STUDENTS_COLLECTION,
                studentDocumentId
            );


        await updateDoc(
            studentReference,
            {

                passportPhotoUrl:
                    "",

                passportStoragePath:
                    "",

                updatedBy:
                    getCurrentUserId(),

                updatedAt:
                    serverTimestamp()

            }
        );


        return true;

    } catch (error) {

        console.error(
            "Failed to remove student passport:",
            error
        );

        throw error;

    }

}


/*
=========================================
REAL-TIME STUDENT LISTENER
=========================================

Whenever a student is:

• Added
• Edited
• Deleted

the Student Register can automatically
receive the latest list.
=========================================
*/

export function subscribeToStudents(
    callback,
    onError = null
) {

    if (
        typeof callback !== "function"
    ) {

        throw new Error(
            "subscribeToStudents requires a callback function."
        );

    }


    const studentsQuery =
        query(
            studentsCollection,
            orderBy(
                "createdAt",
                "desc"
            )
        );


    return onSnapshot(

        studentsQuery,

        snapshot => {

            const students =
                snapshot.docs.map(
                    document => {

                        const data =
                            document.data();


                        return {

                            id:
                                document.id,

                            ...data,

                            passportPhotoUrl:
                                data.passportPhotoUrl ||
                                DEFAULT_AVATAR

                        };

                    }
                );


            callback(
                students
            );

        },

        error => {

            console.error(
                "Student real-time listener failed:",
                error
            );


            if (
                typeof onError ===
                "function"
            ) {

                onError(
                    error
                );

            }

        }

    );

}