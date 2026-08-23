/*
==========================================================
StudentManager Pro Enterprise
Student Profile Module
Step 4C-3C
==========================================================
*/


/* ==========================================================
   DEMO STUDENTS
   ========================================================== */

const demoStudents = [

    {
        id: "SMP-2026-0001",
        name: "Kwame Mensah",
        gender: "Male",
        level: "SHS 1",
        programme: "General Arts",
        house: "Unity House",
        status: "Active"
    },

    {
        id: "SMP-2026-0002",
        name: "Ama Asante",
        gender: "Female",
        level: "SHS 1",
        programme: "General Science",
        house: "Victory House",
        status: "Active"
    },

    {
        id: "SMP-2026-0003",
        name: "Daniel Owusu",
        gender: "Male",
        level: "SHS 2",
        programme: "Business",
        house: "Unity House",
        status: "Active"
    },

    {
        id: "SMP-2026-0004",
        name: "Abena Boateng",
        gender: "Female",
        level: "SHS 2",
        programme: "General Arts",
        house: "Excellence House",
        status: "Pending"
    },

    {
        id: "SMP-2026-0005",
        name: "Samuel Addo",
        gender: "Male",
        level: "SHS 3",
        programme: "General Science",
        house: "Victory House",
        status: "Active"
    },

    {
        id: "SMP-2026-0006",
        name: "Adwoa Ofori",
        gender: "Female",
        level: "SHS 3",
        programme: "Home Economics",
        house: "Unity House",
        status: "Graduated"
    },

    {
        id: "SMP-2026-0007",
        name: "Michael Asare",
        gender: "Male",
        level: "SHS 1",
        programme: "Agricultural Science",
        house: "Excellence House",
        status: "Active"
    },

    {
        id: "SMP-2026-0008",
        name: "Akosua Yeboah",
        gender: "Female",
        level: "SHS 2",
        programme: "General Science",
        house: "Victory House",
        status: "Active"
    }

];


/* ==========================================================
   LOAD REGISTERED STUDENTS
   ========================================================== */

function loadRegisteredStudents() {

    const saved =
        localStorage.getItem("studentRecords");

    if (!saved) {
        return [];
    }

    try {

        const parsed =
            JSON.parse(saved);

        if (Array.isArray(parsed)) {
            return parsed;
        }

    } catch (error) {

        console.error(
            "Unable to load registered students.",
            error
        );

    }

    return [];

}


/* ==========================================================
   NORMALIZE REGISTERED STUDENT
   ==========================================================

   The register may save fields using names such as:

   studentFirstName
   studentMiddleName
   studentLastName
   studentGender
   studentLevel
   studentProgramme
   studentHouse

   The profile converts those into a consistent structure.
   ========================================================== */

function normalizeStudent(student) {

    if (!student) {
        return null;
    }


    const firstName =
        student.studentFirstName ||
        student.firstName ||
        "";


    const middleName =
        student.studentMiddleName ||
        student.middleName ||
        "";


    const lastName =
        student.studentLastName ||
        student.lastName ||
        "";


    let fullName =
        student.name ||
        student.fullName ||
        student.studentName ||
        "";


    if (
        !fullName ||
        String(fullName).trim() === ""
    ) {

        fullName = [

            firstName,
            middleName,
            lastName

        ]
        .filter(
            value =>
                value &&
                String(value).trim() !== ""
        )
        .join(" ");

    }


    return {

        ...student,

        id:
            student.id ||
            student.studentId ||
            student.studentID ||
            "",

        name:
            String(fullName).trim(),

        gender:
            student.studentGender ||
            student.gender ||
            "",

        level:
            student.studentLevel ||
            student.level ||
            "",

        programme:
            student.studentProgramme ||
            student.programme ||
            "",

        house:
            student.studentHouse ||
            student.house ||
            "",

        status:
            student.status ||
            student.studentStatus ||
            "Active"

    };

}


/* ==========================================================
   COMBINE STUDENT DATA
   ========================================================== */

function loadAllStudents() {

    const registeredStudents =
        loadRegisteredStudents();


    /*
     * Normalize real registered students first.
     */

    const normalizedRegistered =
        registeredStudents
            .map(normalizeStudent)
            .filter(Boolean);


    /*
     * Registered students come first.
     * Real saved records therefore take priority.
     */

    return [

        ...normalizedRegistered,

        ...demoStudents

    ];

}


/* ==========================================================
   GET STUDENT ID FROM URL
   ========================================================== */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const studentId =
    urlParams.get("id");


/* ==========================================================
   FIND STUDENT
   ========================================================== */

const students =
    loadAllStudents();


const student =
    students.find(
        item =>
            String(item.id) ===
            String(studentId)
    );


/* ==========================================================
   SAFE VALUE
   ========================================================== */

function valueOrFallback(
    value,
    fallback = "Not Available"
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {

        return fallback;

    }

    return String(value).trim();

}


/* ==========================================================
   SET TEXT
   ========================================================== */

function setText(
    id,
    value,
    fallback = "Not Available"
) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    element.textContent =
        valueOrFallback(
            value,
            fallback
        );

}


/* ==========================================================
   FIND ELEMENT BY TEXT LABEL
   ========================================================== */

function setDetailByLabel(
    label,
    value,
    fallback = "Not Available"
) {

    const elements =
        document.querySelectorAll(
            ".profile-detail-grid > div"
        );


    elements.forEach(
        container => {

            const labelElement =
                container.querySelector(
                    "span"
                );


            const valueElement =
                container.querySelector(
                    "strong"
                );


            if (
                !labelElement ||
                !valueElement
            ) {

                return;

            }


            if (
                labelElement.textContent
                    .trim()
                    .toLowerCase() ===
                label.toLowerCase()
            ) {

                valueElement.textContent =
                    valueOrFallback(
                        value,
                        fallback
                    );

            }

        }
    );

}


/* ==========================================================
   SET STATUS
   ========================================================== */

function updateStatus(
    status
) {

    const badge =
        document.querySelector(
            ".student-status-badge"
        );


    if (!badge) {
        return;
    }


    const cleanStatus =
        valueOrFallback(
            status,
            "Active"
        );


    badge.classList.remove(
        "active",
        "pending",
        "graduated",
        "inactive"
    );


    badge.classList.add(
        cleanStatus
            .toLowerCase()
            .replace(/\s+/g, "-")
    );


    /*
     * Find the actual text node in the badge.
     */

    const textNodes =
        Array.from(
            badge.childNodes
        ).filter(
            node =>
                node.nodeType ===
                Node.TEXT_NODE &&
                node.textContent.trim()
        );


    if (textNodes.length) {

        textNodes[
            textNodes.length - 1
        ].textContent =
            ` ${cleanStatus} Student`;

    }

}


/* ==========================================================
   BUILD FULL NAME
   ========================================================== */

function getStudentName(
    student
) {

    if (
        student &&
        student.name &&
        String(student.name).trim()
    ) {

        return String(
            student.name
        ).trim();

    }


    if (!student) {
        return "";
    }


    const parts = [

        student.studentFirstName,

        student.studentMiddleName,

        student.studentLastName

    ];


    return parts
        .filter(
            value =>
                value &&
                String(value).trim()
        )
        .join(" ");

}


/* ==========================================================
   BLACK HUMAN FACE FALLBACK
   ==========================================================

   Used whenever a student has no saved passport photo.

   This is an inline SVG, so it does not depend on another
   image file being present.
   ========================================================== */

function getDefaultStudentAvatar() {

    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200">

                <rect
                    width="200"
                    height="200"
                    fill="#f1f3f5"/>

                <circle
                    cx="100"
                    cy="72"
                    r="42"
                    fill="#111111"/>

                <path
                    d="
                        M35 178
                        C38 132
                        64 110
                        100 110
                        C136 110
                        162 132
                        165 178
                        Z"
                    fill="#111111"/>

            </svg>
        `)
    );

}


/* ==========================================================
   FIND SAVED PHOTO
   ========================================================== */

function getStudentPhoto(
    student
) {

    if (!student) {
        return "";
    }


    /*
     * Support the common photo field names that may exist
     * in the registration record.
     */

    const possiblePhotoFields = [

        "studentPassportPhoto",

        "passportPhoto",

        "studentPhoto",

        "profilePhoto",

        "photo",

        "photoUrl",

        "image",

        "imageUrl"

    ];


    for (
        const field of possiblePhotoFields
    ) {

        const photo =
            student[field];


        if (
            photo &&
            typeof photo === "string" &&
            photo.trim() !== ""
        ) {

            return photo.trim();

        }

    }


    return "";

}


/* ==========================================================
   APPLY STUDENT PHOTO
   ========================================================== */

function applyStudentPhoto(
    student,
    fullName
) {

    const avatar =
        document.querySelector(
            ".student-profile-avatar img"
        );


    if (!avatar) {
        return;
    }


    const savedPhoto =
        getStudentPhoto(student);


    /*
     * No saved photo:
     * show black human-face icon.
     */

    if (!savedPhoto) {

        avatar.src =
            getDefaultStudentAvatar();

        avatar.alt =
            `${fullName || "Student"} profile photo`;

        return;

    }


    /*
     * If the register stored a Data URL
     * such as:
     *
     * data:image/jpeg;base64,...
     *
     * the browser can display it directly.
     */

    if (
        savedPhoto.startsWith(
            "data:image/"
        )
    ) {

        avatar.src =
            savedPhoto;

        avatar.alt =
            `${fullName} profile photo`;

        return;

    }


    /*
     * If the stored value is already a complete URL,
     * use it directly.
     */

    if (
        savedPhoto.startsWith("http://") ||
        savedPhoto.startsWith("https://") ||
        savedPhoto.startsWith("blob:")
    ) {

        avatar.src =
            savedPhoto;

        avatar.alt =
            `${fullName} profile photo`;

        return;

    }


    /*
     * If the registration system stored a local path,
     * attempt to use it.
     */

    avatar.src =
        savedPhoto;

    avatar.alt =
        `${fullName} profile photo`;


    /*
     * If that image cannot be loaded, automatically
     * return to the black human-face icon.
     */

    avatar.onerror = () => {

        avatar.onerror = null;

        avatar.src =
            getDefaultStudentAvatar();

        avatar.alt =
            `${fullName || "Student"} profile photo`;

    };

}


/* ==========================================================
   POPULATE PROFILE
   ========================================================== */

function populateStudentProfile(
    student
) {

    if (!student) {

        console.warn(
            "Student was not found:",
            studentId
        );


        setText(
            "profileStudentName",
            "Student Not Found"
        );


        setText(
            "profileStudentId",
            studentId || "No ID"
        );


        /*
         * Even when no student is found,
         * keep the default avatar.
         */

        const avatar =
            document.querySelector(
                ".student-profile-avatar img"
            );


        if (avatar) {

            avatar.src =
                getDefaultStudentAvatar();

            avatar.alt =
                "Student profile photo";

        }


        return;

    }


    console.log(
        "Loading student profile:",
        student
    );


    /* ======================================================
       BASIC IDENTITY
       ====================================================== */

    const fullName =
        getStudentName(student);


    setText(
        "profileStudentName",
        fullName,
        "Student Name"
    );


    setText(
        "profileStudentId",
        student.id,
        "No Student ID"
    );


    /* ======================================================
       STATUS
       ====================================================== */

    updateStatus(
        student.status
    );


    /* ======================================================
       PERSONAL INFORMATION
       ====================================================== */

    setDetailByLabel(
        "Full Name",
        fullName
    );


    setDetailByLabel(
        "Date of Birth",
        student.studentDateOfBirth ||
        student.dateOfBirth
    );


    setDetailByLabel(
        "Gender",
        student.studentGender ||
        student.gender
    );


    setDetailByLabel(
        "Nationality",
        student.studentNationality ||
        student.nationality ||
        "Ghanaian"
    );


    /* ======================================================
       ACADEMIC INFORMATION
       ====================================================== */

    setDetailByLabel(
        "Academic Year",
        student.studentAcademicYear ||
        student.academicYear ||
        "2026 / 2027"
    );


    setDetailByLabel(
        "Programme",
        student.studentProgramme ||
        student.programme
    );


    setDetailByLabel(
        "Class",
        student.studentLevel ||
        student.level
    );


    setDetailByLabel(
        "Enrollment Status",
        student.status,
        "Active"
    );


    /* ======================================================
       GUARDIAN INFORMATION
       ====================================================== */

    setDetailByLabel(
        "Guardian Name",
        student.guardianName ||
        student.studentGuardianName
    );


    setDetailByLabel(
        "Relationship",
        student.guardianRelationship ||
        student.studentGuardianRelationship
    );


    setDetailByLabel(
        "Phone",
        student.guardianPhone ||
        student.studentGuardianPhone
    );


    setDetailByLabel(
        "Emergency Contact",
        student.studentEmergencyPhone ||
        student.emergencyContact
    );


    /* ======================================================
       QUICK SUMMARY
       ====================================================== */

    const summaryItems =
        document.querySelectorAll(
            ".profile-summary-item"
        );


    summaryItems.forEach(
        item => {

            const label =
                item.querySelector(
                    "span"
                );


            const value =
                item.querySelector(
                    "strong"
                );


            if (
                !label ||
                !value
            ) {

                return;

            }


            const labelText =
                label.textContent
                    .trim()
                    .toLowerCase();


            /* ----------------------------------------------
               ADMISSION NUMBER
               ---------------------------------------------- */

            if (
                labelText ===
                "admission number"
            ) {

                value.textContent =
                    valueOrFallback(

                        student.studentIndexNumber ||

                        student.admissionNumber ||

                        student.indexNumber ||

                        student.id

                    );

            }


            /* ----------------------------------------------
               CLASS
               ---------------------------------------------- */

            if (
                labelText ===
                "class"
            ) {

                value.textContent =
                    valueOrFallback(

                        student.studentLevel ||

                        student.level

                    );

            }


            /* ----------------------------------------------
               STREAM
               ---------------------------------------------- */

            if (
                labelText ===
                "stream"
            ) {

                value.textContent =
                    valueOrFallback(

                        student.studentStream ||

                        student.stream

                    );

            }


            /* ----------------------------------------------
               HOUSE
               ---------------------------------------------- */

            if (
                labelText ===
                "house"
            ) {

                value.textContent =
                    valueOrFallback(

                        student.studentHouse ||

                        student.house

                    );

            }

        }
    );


    /* ======================================================
       STUDENT AVATAR / PASSPORT PHOTO
       ====================================================== */

   

const avatar =
    document.querySelector(
        ".student-profile-avatar img"
    );


if (avatar) {

    /*
     * ------------------------------------------------------
     * REAL SAVED PASSPORT PHOTO
     * ------------------------------------------------------
     */

    if (
        student.studentPassportPhotoData
    ) {

        avatar.src =
            student.studentPassportPhotoData;

        avatar.alt =
            `${fullName} profile photo`;

    } else {

        /*
         * --------------------------------------------------
         * NO PASSPORT PHOTO
         * --------------------------------------------------
         *
         * Keep the existing black human-face image.
         */

        avatar.src =
            "assets/images/avatar.png";

        avatar.alt =
            "No passport photo available";

    }

}


    /* ======================================================
       PAGE TITLE
       ====================================================== */

    document.title =
        `${fullName} | Student Profile | StudentManager Pro Enterprise`;

}


/* ==========================================================
   INITIAL LOAD
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Student Profile module loaded."
        );


        console.log(
            "Requested Student ID:",
            studentId
        );


        console.log(
            "Available students:",
            students
        );


        populateStudentProfile(
            student
        );

    }
);