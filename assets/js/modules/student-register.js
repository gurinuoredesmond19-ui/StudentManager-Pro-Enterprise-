/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   STUDENT REGISTER — DATA ENGINE
   STEP 4B
   ========================================================== */

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
   STATE
   ========================================================== */

let filteredStudents = [...students];

let currentPage = 1;

const recordsPerPage = 5;


/* ==========================================================
   DOM ELEMENTS
   ========================================================== */

const tableBody =
    document.getElementById("studentRegisterTableBody");

const emptyState =
    document.getElementById("studentRegisterEmpty");

const searchInput =
    document.getElementById("registerSearch");

const levelFilter =
    document.getElementById("registerLevelFilter");

const genderFilter =
    document.getElementById("registerGenderFilter");

const statusFilter =
    document.getElementById("registerStatusFilter");

const clearFiltersButton =
    document.getElementById("clearRegisterFilters");

const resultCount =
    document.getElementById("registerResultCount");

const paginationInfo =
    document.getElementById("registerPaginationInfo");

const currentPageElement =
    document.getElementById("registerCurrentPage");

const previousButton =
    document.getElementById("registerPreviousPage");

const nextButton =
    document.getElementById("registerNextPage");


/* ==========================================================
   RENDER REGISTER
   ========================================================== */

function renderStudents() {

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";


    const startIndex =
        (currentPage - 1) * recordsPerPage;

    const endIndex =
        startIndex + recordsPerPage;

    const pageStudents =
        filteredStudents.slice(
            startIndex,
            endIndex
        );


    if (pageStudents.length === 0) {

        emptyState.style.display = "flex";

        updatePagination();

        return;

    }


    emptyState.style.display = "none";


    pageStudents.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="register-student-cell">

                    <div class="register-avatar">

                        ${getInitials(student.name)}

                    </div>

                    <div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            Student
                        </small>

                    </div>

                </div>

            </td>


            <td>

                <span class="student-id">
                    ${student.id}
                </span>

            </td>


            <td>
                ${student.gender}
            </td>


            <td>
                ${student.level}
            </td>


            <td>
                ${student.programme}
            </td>


            <td>
                ${student.house}
            </td>


            <td>

                <span class="
                    register-status
                    ${getStatusClass(student.status)}
                ">

                    ${student.status}

                </span>

            </td>


            <td>

                <div class="register-row-actions">

                    <button
                        type="button"
                        class="register-action-btn"
                        title="View Student"
                        data-action="view"
                        data-id="${student.id}">

                        <i class="fa-solid fa-eye"></i>

                    </button>


                    <button
                        type="button"
                        class="register-action-btn"
                        title="Edit Student"
                        data-action="edit"
                        data-id="${student.id}">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        type="button"
                        class="register-action-btn"
                        title="More Actions"
                        data-action="more"
                        data-id="${student.id}">

                        <i class="fa-solid fa-ellipsis"></i>

                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    updatePagination();

}


/* ==========================================================
   INITIALS
   ========================================================== */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


/* ==========================================================
   STATUS CLASS
   ========================================================== */

function getStatusClass(status) {

    return status
        .toLowerCase()
        .replace(/\s+/g, "-");

}


/* ==========================================================
   FILTERING
   ========================================================== */

function applyFilters() {

    const search =
        searchInput?.value
            .trim()
            .toLowerCase() || "";


    const level =
        levelFilter?.value || "";


    const gender =
        genderFilter?.value || "";


    const status =
        statusFilter?.value || "";


    filteredStudents =
        students.filter(student => {

            const matchesSearch =
                !search ||

                student.name
                    .toLowerCase()
                    .includes(search) ||

                student.id
                    .toLowerCase()
                    .includes(search) ||

                student.programme
                    .toLowerCase()
                    .includes(search);


            const matchesLevel =
                !level ||
                student.level === level;


            const matchesGender =
                !gender ||
                student.gender === gender;


            const matchesStatus =
                !status ||
                student.status === status;


            return (
                matchesSearch &&
                matchesLevel &&
                matchesGender &&
                matchesStatus
            );

        });


    currentPage = 1;

    renderStudents();

}


/* ==========================================================
   CLEAR FILTERS
   ========================================================== */

function clearFilters() {

    if (searchInput) {
        searchInput.value = "";
    }

    if (levelFilter) {
        levelFilter.value = "";
    }

    if (genderFilter) {
        genderFilter.value = "";
    }

    if (statusFilter) {
        statusFilter.value = "";
    }


    filteredStudents = [...students];

    currentPage = 1;

    renderStudents();

}


/* ==========================================================
   PAGINATION
   ========================================================== */

function updatePagination() {

    const total =
        filteredStudents.length;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total / recordsPerPage
            )
        );


    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const start =
        total === 0
            ? 0
            : (currentPage - 1) *
                recordsPerPage + 1;


    const end =
        Math.min(
            currentPage *
                recordsPerPage,
            total
        );


    if (resultCount) {

        resultCount.textContent =
            `${total} record${total === 1 ? "" : "s"}`;

    }


    if (paginationInfo) {

        paginationInfo.textContent =
            `Showing ${start}–${end} of ${total}`;

    }


    if (currentPageElement) {

        currentPageElement.textContent =
            currentPage;

    }


    if (previousButton) {

        previousButton.disabled =
            currentPage <= 1;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage >= totalPages;

    }


    updateSummary();

}


/* ==========================================================
   SUMMARY
   ========================================================== */

function updateSummary() {

    const total =
        students.length;


    const active =
        students.filter(
            student => student.status === "Active"
        ).length;


    const pending =
        students.filter(
            student => student.status === "Pending"
        ).length;


    const finalYear =
        students.filter(
            student => student.level === "SHS 3"
        ).length;


    setText(
        "registerTotalStudents",
        total
    );

    setText(
        "registerActiveStudents",
        active
    );

    setText(
        "registerPendingStudents",
        pending
    );

    setText(
        "registerFinalYearStudents",
        finalYear
    );

}


/* ==========================================================
   SAFE TEXT UPDATE
   ========================================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* ==========================================================
   EVENT LISTENERS
   ========================================================== */

searchInput?.addEventListener(
    "input",
    applyFilters
);

levelFilter?.addEventListener(
    "change",
    applyFilters
);

genderFilter?.addEventListener(
    "change",
    applyFilters
);

statusFilter?.addEventListener(
    "change",
    applyFilters
);

clearFiltersButton?.addEventListener(
    "click",
    clearFilters
);


/* ==========================================================
   PAGINATION EVENTS
   ========================================================== */

previousButton?.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {

            currentPage--;

            renderStudents();

        }

    }
);


nextButton?.addEventListener(
    "click",
    () => {

        const totalPages =
            Math.ceil(
                filteredStudents.length /
                recordsPerPage
            );


        if (currentPage < totalPages) {

            currentPage++;

            renderStudents();

        }

    }
);


/* ==========================================================
   ROW ACTIONS
   ========================================================== */

tableBody?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const studentId =
            button.dataset.id;

        const action =
            button.dataset.action;


        const student =
            students.find(
                item => item.id === studentId
            );


        if (!student) {
            return;
        }


        if (action === "view") {

           window.location.href =
                `student-profile.html?id=$
                {encodeURIComponent(student.id)}`;

        }


        if (action === "edit") {

            alert(
                `Edit student: ${student.name}`
            );

        }


        if (action === "more") {

            alert(
                `More actions for: ${student.name}`
            );

        }

    }
);


/* ==========================================================
   INITIAL LOAD
   ========================================================== */

renderStudents();