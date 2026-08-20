/*
==========================================================
StudentManager Pro Enterprise
Student Profile Module
Step 4C-3C
==========================================================
*/

const students = [

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
   GET STUDENT ID FROM URL
   ========================================================== */

const urlParams =
    new URLSearchParams(window.location.search);

const studentId =
    urlParams.get("id");


/* ==========================================================
   FIND STUDENT
   ========================================================== */

const student =
    students.find(
        item => item.id === studentId
    );


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
            "Student ID:",
            studentId
        );

        console.log(
            "Student:",
            student
        );

const nameElement =
    document.getElementById("profileStudentName");

const idElement =
    document.getElementById("profileStudentId");


if (student) {

    if (nameElement) {
        nameElement.textContent =
            student.name;
    }

    if (idElement) {
        idElement.textContent =
            student.id;
    }

}



    }




    
);