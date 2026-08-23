/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   STUDENT REGISTER — DATA ENGINE
   STEP 4B
   ========================================================== */


/* ==========================================================
   STUDENT REGISTER — DATA SOURCE
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
   LOAD STUDENTS FROM STORAGE
   ========================================================== */

function loadStudents() {

    const saved =
        localStorage.getItem(
            "studentRecords"
        );

    let registeredStudents = [];


    if (saved) {

        try {

            const parsed =
                JSON.parse(saved);


            if (Array.isArray(parsed)) {

                registeredStudents =
                    parsed;

            }

        } catch (error) {

            console.warn(
                "Unable to load saved student records.",
                error
            );

        }

    }


    return [
        ...demoStudents,
        ...registeredStudents
    ];

}


/* ==========================================================
   STUDENT DATA
   ========================================================== */

const students =
    loadStudents();


/* ==========================================================
   FILTERED DATA
   ========================================================== */

let filteredStudents =
    [...students];

let currentPage = 1;

const recordsPerPage = 5;


/* ==========================================================
   DOM ELEMENTS
   ========================================================== */

const tableBody =
    document.getElementById(
        "studentRegisterTableBody"
    );

const emptyState =
    document.getElementById(
        "studentRegisterEmpty"
    );

const searchInput =
    document.getElementById(
        "registerSearch"
    );

const levelFilter =
    document.getElementById(
        "registerLevelFilter"
    );

const genderFilter =
    document.getElementById(
        "registerGenderFilter"
    );

const statusFilter =
    document.getElementById(
        "registerStatusFilter"
    );

const clearFiltersButton =
    document.getElementById(
        "clearRegisterFilters"
    );

const resultCount =
    document.getElementById(
        "registerResultCount"
    );

const paginationInfo =
    document.getElementById(
        "registerPaginationInfo"
    );

const currentPageElement =
    document.getElementById(
        "registerCurrentPage"
    );

const previousButton =
    document.getElementById(
        "registerPreviousPage"
    );

const nextButton =
    document.getElementById(
        "registerNextPage"
    );


/* ==========================================================
   RENDER REGISTER
   ========================================================== */

function renderStudents() {

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    const startIndex =
        (currentPage - 1) *
        recordsPerPage;


    const endIndex =
        startIndex +
        recordsPerPage;


    const pageStudents =
        filteredStudents.slice(
            startIndex,
            endIndex
        );


    if (pageStudents.length === 0) {

        if (emptyState) {

            emptyState.style.display =
                "flex";

        }

        updatePagination();

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    pageStudents.forEach(
        student => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <div class="register-student-cell">

                        <div class="register-avatar">

                            ${getInitials(
                                student.name ||
                                "Student"
                            )}

                        </div>

                        <div>

                            <strong>
                                ${escapeHtml(
                                    student.name ||
                                    "Unnamed Student"
                                )}
                            </strong>

                            <small>
                                Student
                            </small>

                        </div>

                    </div>

                </td>


                <td>

                    <span class="student-id">
                        ${escapeHtml(
                            student.id ||
                            "—"
                        )}
                    </span>

                </td>


                <td>
                    ${escapeHtml(
                        student.gender ||
                        "—"
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        student.level ||
                        "—"
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        student.programme ||
                        "—"
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        student.house ||
                        "—"
                    )}
                </td>


                <td>

                    <span class="
                        register-status
                        ${getStatusClass(
                            student.status ||
                            "Pending"
                        )}
                    ">

                        ${escapeHtml(
                            student.status ||
                            "Pending"
                        )}

                    </span>

                </td>


                <td>

                    <div class="register-row-actions">

                        <button
                            type="button"
                            class="register-action-btn"
                            title="View Student"
                            data-action="view"
                            data-id="${escapeHtml(
                                student.id ||
                                ""
                            )}">

                            <i class="fa-solid fa-eye"></i>

                        </button>


                        <button
                            type="button"
                            class="register-action-btn"
                            title="Edit Student"
                            data-action="edit"
                            data-id="${escapeHtml(
                                student.id ||
                                ""
                            )}">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            type="button"
                            class="register-action-btn"
                            title="More Actions"
                            data-action="more"
                            data-id="${escapeHtml(
                                student.id ||
                                ""
                            )}">

                            <i class="fa-solid fa-ellipsis"></i>

                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );


    updatePagination();

}


/* ==========================================================
   ESCAPE HTML
   ========================================================== */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================================
   INITIALS
   ========================================================== */

function getInitials(name) {

    return String(name || "Student")
        .split(" ")
        .filter(Boolean)
        .map(
            word =>
                word.charAt(0)
        )
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


/* ==========================================================
   STATUS CLASS
   ========================================================== */

function getStatusClass(status) {

    return String(status || "pending")
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
        students.filter(
            student => {

                const matchesSearch =
                    !search ||

                    String(
                        student.name || ""
                    )
                    .toLowerCase()
                    .includes(search) ||

                    String(
                        student.id || ""
                    )
                    .toLowerCase()
                    .includes(search) ||

                    String(
                        student.programme || ""
                    )
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

            }
        );


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


    filteredStudents =
        [...students];


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
                total /
                recordsPerPage
            )
        );


    if (currentPage > totalPages) {

        currentPage =
            totalPages;

    }


    const start =
        total === 0
            ? 0
            : (
                (currentPage - 1) *
                recordsPerPage
            ) + 1;


    const end =
        Math.min(
            currentPage *
            recordsPerPage,
            total
        );


    if (resultCount) {

        resultCount.textContent =
            `${total} record${
                total === 1
                    ? ""
                    : "s"
            }`;

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
            student =>
                student.status ===
                "Active"
        ).length;


    const pending =
        students.filter(
            student =>
                student.status ===
                "Pending"
        ).length;


    const finalYear =
        students.filter(
            student =>
                student.level ===
                "SHS 3"
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

        element.textContent =
            value;

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


        if (
            currentPage <
            totalPages
        ) {

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
                item =>
                    item.id ===
                    studentId
            );


        if (!student) {
            return;
        }


        if (action === "view") {

            window.location.href =
                `student-profile.html?id=${encodeURIComponent(
                    student.id
                )}`;

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


/* ==========================================================
   STUDENT REGISTRATION CONTROLLER
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ======================================================
           ELEMENTS
           ====================================================== */

        const modal =
            document.querySelector(
                ".student-registration-modal"
            );


        const form =
            document.querySelector(
                "#studentRegistrationForm"
            );


        const closeButton =
            document.querySelector(
                ".student-registration-close"
            );


        const cancelButton =
            document.querySelector(
                "#cancelStudentRegistration"
            );


        const saveDraftButtons =
            document.querySelectorAll(
                ".student-registration-dialog .app-btn-light, " +
                ".student-registration-dialog .app-btn-secondary"
            );


        const stepPanels =
            document.querySelectorAll(
                ".registration-form-step"
            );


        const stepIndicators =
            document.querySelectorAll(
                ".registration-step"
            );


        const progressBar =
            document.querySelector(
                "#registrationProgressBar"
            );


        const progressPercent =
            document.querySelector(
                "#registrationPercentage"
            );


        const completeButton =
            document.querySelector(
                "#completeStudentRegistration"
            );


        /* ======================================================
           SAFETY CHECK
           ====================================================== */

        if (!modal || !form) {

            console.warn(
                "Student registration modal or form was not found."
            );

            return;

        }


        if (!stepPanels.length) {

            console.warn(
                "No registration form steps were found."
            );

            return;

        }


        /* ======================================================
           STATE
           ====================================================== */

        let currentStep = 0;


        const totalSteps =
            stepPanels.length;


        /* ======================================================
           STEP BUTTONS
           ====================================================== */

        const allNextButtons =
            document.querySelectorAll(
                ".registration-form-step .app-btn-primary"
            );


        const allBackButtons =
            document.querySelectorAll(
                ".registration-form-step .app-btn-light"
            );


        /* ======================================================
           STEP 6 REVIEW CONTAINER
           ====================================================== */

        const reviewContainer =
            document.querySelector(
                "#studentRegistrationReview"
            );


        /* ======================================================
           OPEN MODAL
           ====================================================== */

        function openModal() {

            modal.hidden = false;

            modal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

            currentStep = 0;

            updateStep();

            updateProgress();

        }


        /* ======================================================
           CLOSE MODAL
           ====================================================== */

        function closeModal() {

            modal.classList.remove(
                "show"
            );

            modal.hidden = true;

            document.body.style.overflow =
                "";

        }


        /* ======================================================
           OPEN REGISTRATION BUTTONS
           ====================================================== */

        const openButtons =
            document.querySelectorAll(
                ".student-register-content .app-btn-primary"
            );


        openButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        openModal();

                    }
                );

            }
        );


        /* ======================================================
           CLOSE BUTTON
           ====================================================== */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeModal
            );

        }


        /* ======================================================
           CANCEL BUTTON
           ====================================================== */

        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    closeModal();

                }
            );

        }


        /* ======================================================
           BACKDROP
           ====================================================== */

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );


        /* ======================================================
           ESCAPE KEY
           ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "show"
                    )
                ) {

                    closeModal();

                }

            }
        );


        /* ======================================================
           UPDATE STEP
           ====================================================== */

        function updateStep() {

            stepPanels.forEach(
                (panel, index) => {

                    panel.classList.toggle(
                        "active",
                        index === currentStep
                    );


                    panel.hidden =
                        index !== currentStep;

                }
            );


            stepIndicators.forEach(
                (indicator, index) => {

                    indicator.classList.toggle(
                        "active",
                        index === currentStep
                    );


                    indicator.classList.toggle(
                        "completed",
                        index < currentStep
                    );


                    indicator.setAttribute(
                        "aria-current",
                        index === currentStep
                            ? "step"
                            : "false"
                    );

                }
            );


            /* ----------------------------------------------
               NEXT BUTTONS
            ---------------------------------------------- */

            allNextButtons.forEach(
                button => {

                    const panel =
                        button.closest(
                            ".registration-form-step"
                        );


                    if (!panel) {
                        return;
                    }


                    const panelIndex =
                        Array.from(
                            stepPanels
                        ).indexOf(
                            panel
                        );


                    button.style.display =
                        panelIndex ===
                        currentStep
                            ? ""
                            : "none";

                }
            );


            /* ----------------------------------------------
               BACK BUTTONS
            ---------------------------------------------- */

            allBackButtons.forEach(
                button => {

                    const panel =
                        button.closest(
                            ".registration-form-step"
                        );


                    if (!panel) {
                        return;
                    }


                    const panelIndex =
                        Array.from(
                            stepPanels
                        ).indexOf(
                            panel
                        );


                    button.style.display =
                        panelIndex ===
                        currentStep
                            ? ""
                            : "none";

                }
            );


            /* ----------------------------------------------
               COMPLETE BUTTON
            ---------------------------------------------- */

            if (completeButton) {

                const finalPanel =
                    completeButton.closest(
                        ".registration-form-step"
                    );


                if (finalPanel) {

                    const finalIndex =
                        Array.from(
                            stepPanels
                        ).indexOf(
                            finalPanel
                        );


                    completeButton.style.display =
                        finalIndex ===
                        currentStep
                            ? ""
                            : "none";

                }

            }


            /* ----------------------------------------------
               STEP 6 — REFRESH REVIEW
            ---------------------------------------------- */

            if (
                currentStep ===
                totalSteps - 1
            ) {

                if (reviewContainer) {

                    reviewContainer.hidden =
                        false;

                }

                buildRegistrationReview();

            }

        }


        /* ======================================================
           VALIDATE CURRENT STEP
           ====================================================== */

        function validateCurrentStep() {

            const currentPanel =
                stepPanels[
                    currentStep
                ];


            if (!currentPanel) {

                return true;

            }


            const fields =
                currentPanel.querySelectorAll(
                    "input, select, textarea"
                );


            let valid = true;


            fields.forEach(
                field => {

                    if (
                        !field.hasAttribute(
                            "required"
                        ) &&
                        field.dataset.required !==
                            "true"
                    ) {

                        return;

                    }


                    let value =
                        field.value;


                    if (
                        typeof value ===
                        "string"
                    ) {

                        value =
                            value.trim();

                    }


                    const wrapper =
                        field.closest(
                            ".student-registration-field"
                        );


                    if (!value) {

                        valid = false;


                        if (wrapper) {

                            wrapper.classList.add(
                                "has-error"
                            );

                        }


                        field.setAttribute(
                            "aria-invalid",
                            "true"
                        );

                    } else {

                        if (wrapper) {

                            wrapper.classList.remove(
                                "has-error"
                            );

                        }


                        field.removeAttribute(
                            "aria-invalid"
                        );

                    }

                }
            );


            if (!valid) {

                const firstError =
                    currentPanel.querySelector(
                        '[aria-invalid="true"]'
                    );


                if (firstError) {

                    firstError.focus();

                }

            }


            return valid;

        }


        /* ======================================================
           NEXT BUTTONS
           ====================================================== */

        allNextButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        if (
                            !validateCurrentStep()
                        ) {

                            return;

                        }


                        if (
                            currentStep <
                            totalSteps - 1
                        ) {

                            currentStep++;


                            updateStep();

                            updateProgress();


                            const heading =
                                stepPanels[
                                    currentStep
                                ].querySelector(
                                    "h2, h3, .registration-step-heading"
                                );


                            if (
                                heading &&
                                typeof heading.focus ===
                                    "function"
                            ) {

                                heading.setAttribute(
                                    "tabindex",
                                    "-1"
                                );


                                heading.focus();

                            }

                        }

                    }
                );

            }
        );


        /* ======================================================
           BACK BUTTONS
           ====================================================== */

        allBackButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        if (
                            currentStep > 0
                        ) {

                            currentStep--;

                            updateStep();

                            updateProgress();

                        }

                    }
                );

            }
        );


        /* ======================================================
           STEP INDICATORS
           ====================================================== */

        stepIndicators.forEach(
            (indicator, index) => {

                indicator.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        if (
                            index >
                            currentStep
                        ) {

                            if (
                                !validateCurrentStep()
                            ) {

                                return;

                            }

                        }


                        currentStep =
                            index;


                        updateStep();

                        updateProgress();

                    }
                );

            }
        );


        /* ======================================================
           LIVE VALIDATION
           ====================================================== */

        form.addEventListener(
            "input",
            event => {

                const field =
                    event.target;


                if (
                    !field.matches(
                        "input, select, textarea"
                    )
                ) {

                    return;

                }


                const wrapper =
                    field.closest(
                        ".student-registration-field"
                    );


                if (
                    field.hasAttribute(
                        "required"
                    ) &&
                    field.value.trim()
                ) {

                    if (wrapper) {

                        wrapper.classList.remove(
                            "has-error"
                        );

                    }


                    field.removeAttribute(
                        "aria-invalid"
                    );

                }


                if (
                    currentStep ===
                    totalSteps - 1
                ) {

                    buildRegistrationReview();

                }


                updateProgress();

            }
        );


        form.addEventListener(
            "change",
            () => {

                if (
                    currentStep ===
                    totalSteps - 1
                ) {

                    buildRegistrationReview();

                }


                updateProgress();

            }
        );


        /* ======================================================
           COMPLETION CALCULATION
           ====================================================== */

        function calculateCompletion() {

            const fields =
                form.querySelectorAll(
                    "input, select, textarea"
                );


            if (!fields.length) {

                return 0;

            }


            let completed = 0;


            fields.forEach(
                field => {

                    if (
                        field.type ===
                        "file"
                    ) {

                        if (
                            field.files &&
                            field.files.length
                        ) {

                            completed++;

                        }

                        return;

                    }


                    if (
                        field.value &&
                        field.value.trim() !== ""
                    ) {

                        completed++;

                    }

                }
            );


            return Math.round(
                (
                    completed /
                    fields.length
                ) * 100
            );

        }


        /* ======================================================
           PROGRESS COLOR
           ====================================================== */

        function getProgressColor(
            percent
        ) {

            if (percent <= 50) {

                return "#dc2626";

            }


            if (percent <= 80) {

                return "#eab308";

            }


            if (percent <= 95) {

                return "#84cc16";

            }


            return "#15803d";

        }


        /* ======================================================
           UPDATE PROGRESS
           ====================================================== */

        function updateProgress() {

            const percent =
                calculateCompletion();


            if (progressBar) {

                progressBar.style.width =
                    `${percent}%`;


                progressBar.style.background =
                    getProgressColor(
                        percent
                    );

            }


            if (progressPercent) {

                progressPercent.textContent =
                    `${percent}%`;

            }

        }


        /* ======================================================
           SAVE DRAFT
           ====================================================== */

        function saveRegistration() {

            const formData =
                new FormData(form);


            const studentData = {};


            formData.forEach(
                (value, key) => {

                    if (
                        value instanceof File
                    ) {

                        if (value.name) {

                            studentData[key] =
                                value.name;

                        }

                    } else {

                        studentData[key] =
                            value;

                    }

                }
            );


            studentData.registrationProgress =
                calculateCompletion();


            studentData.currentStep =
                currentStep;


            studentData.lastSaved =
                new Date().toISOString();


            localStorage.setItem(
                "studentRegistrationDraft",
                JSON.stringify(
                    studentData
                )
            );


            alert(
                "Student registration draft saved successfully."
            );

        }


        /* ======================================================
           SAVE DRAFT BUTTONS
           ====================================================== */

        saveDraftButtons.forEach(
            button => {

                if (
                    button ===
                    completeButton
                ) {

                    return;

                }


                if (
                    button.textContent
                        .trim()
                        .toLowerCase()
                        .includes(
                            "save draft"
                        )
                ) {

                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();

                            saveRegistration();

                        }
                    );

                }

            }
        );


        /* ======================================================
           RESTORE DRAFT
           ====================================================== */

        function restoreDraft() {

            const saved =
                localStorage.getItem(
                    "studentRegistrationDraft"
                );


            if (!saved) {

                return;

            }


            try {

                const data =
                    JSON.parse(saved);


                Object.keys(data).forEach(
                    key => {

                        const field =
                            form.elements[key];


                        if (
                            !field ||
                            key ===
                                "registrationProgress" ||
                            key ===
                                "lastSaved" ||
                            key ===
                                "currentStep"
                        ) {

                            return;

                        }


                        if (
                            field.type ===
                            "file"
                        ) {

                            return;

                        }


                        field.value =
                            data[key];

                    }
                );


                if (
                    Number.isInteger(
                        data.currentStep
                    ) &&
                    data.currentStep >= 0 &&
                    data.currentStep <
                        totalSteps
                ) {

                    currentStep =
                        data.currentStep;

                }


                updateStep();

                updateProgress();


            } catch (error) {

                console.error(
                    "Unable to restore student registration draft.",
                    error
                );

            }

        }


        /* ======================================================
           STEP 6 — REVIEW ENGINE
           ====================================================== */

        function escapeReviewHtml(
            value
        ) {

            return String(value ?? "")
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        function getFieldValue(
            name
        ) {

            const field =
                form.elements[name];


            if (!field) {

                return "";

            }


            if (
                field.type ===
                "file"
            ) {

                if (
                    field.files &&
                    field.files.length
                ) {

                    return Array.from(
                        field.files
                    )
                    .map(
                        file =>
                            file.name
                    )
                    .join(", ");

                }


                return "";

            }


            if (
                field instanceof
                RadioNodeList
            ) {

                const checked =
                    Array.from(field)
                        .find(
                            radio =>
                                radio.checked
                        );


                return checked
                    ? checked.value.trim()
                    : "";

            }


            if (
                field.type ===
                "checkbox"
            ) {

                return field.checked
                    ? field.value ||
                        "Yes"
                    : "";

            }


            return field.value
                ? field.value.trim()
                : "";

        }


        function displayReviewValue(
            value
        ) {

            if (!value) {

                return "—";

            }


            return escapeReviewHtml(
                value
            );

        }


        function createReviewRow(
            label,
            value
        ) {

            return `

                <div class="registration-review-row">

                    <span class="registration-review-label">

                        ${escapeReviewHtml(
                            label
                        )}

                    </span>

                    <strong class="registration-review-value">

                        ${displayReviewValue(
                            value
                        )}

                    </strong>

                </div>

            `;

        }


        function createReviewSection(
            title,
            icon,
            step,
            rows
        ) {

            return `

                <section class="registration-review-section">

                    <div class="registration-review-section-header">

                        <div>

                            <span class="registration-review-section-icon">

                                <i class="${escapeReviewHtml(
                                    icon
                                )}"></i>

                            </span>

                            <div>

                                <span class="registration-review-kicker">

                                    STEP ${step}

                                </span>

                                <h4>

                                    ${escapeReviewHtml(
                                        title
                                    )}

                                </h4>

                            </div>

                        </div>


                        <button
                            type="button"
                            class="registration-review-edit"
                            data-review-edit="${step}">

                            <i class="fa-solid fa-pen"></i>

                            Edit

                        </button>

                    </div>


                    <div class="registration-review-grid">

                        ${rows}

                    </div>

                </section>

            `;

        }


        /* ======================================================
           BUILD REVIEW
           ====================================================== */

        function buildRegistrationReview() {

            if (!reviewContainer) {

                console.warn(
                    "Step 6 review container #studentRegistrationReview was not found."
                );

                return;

            }


            if (
                currentStep ===
                totalSteps - 1
            ) {

                reviewContainer.hidden =
                    false;

            }


            const firstName =
                getFieldValue(
                    "studentFirstName"
                );


            const middleName =
                getFieldValue(
                    "studentMiddleName"
                );


            const lastName =
                getFieldValue(
                    "studentLastName"
                );


            const fullName =
                [
                    firstName,
                    middleName,
                    lastName
                ]
                .filter(Boolean)
                .join(" ");


            reviewContainer.innerHTML = `

                ${createReviewSection(
                    "Personal Information",
                    "fa-solid fa-user",
                    1,

                    createReviewRow(
                        "Full Name",
                        fullName
                    ) +

                    createReviewRow(
                        "Date of Birth",
                        getFieldValue(
                            "studentDateOfBirth"
                        )
                    ) +

                    createReviewRow(
                        "Gender",
                        getFieldValue(
                            "studentGender"
                        )
                    ) +

                    createReviewRow(
                        "Nationality",
                        getFieldValue(
                            "studentNationality"
                        )
                    ) +

                    createReviewRow(
                        "Place of Birth",
                        getFieldValue(
                            "studentBirthPlace"
                        )
                    ) +

                    createReviewRow(
                        "Previous School",
                        getFieldValue(
                            "studentPreviousSchool"
                        )
                    )
                )}


                ${createReviewSection(
                    "Contact Information",
                    "fa-solid fa-address-book",
                    2,

                    createReviewRow(
                        "Primary Phone",
                        getFieldValue(
                            "studentPhone"
                        )
                    ) +

                    createReviewRow(
                        "Alternative Phone",
                        getFieldValue(
                            "studentAlternativePhone"
                        )
                    ) +

                    createReviewRow(
                        "Email Address",
                        getFieldValue(
                            "studentEmail"
                        )
                    ) +

                    createReviewRow(
                        "Emergency Phone",
                        getFieldValue(
                            "studentEmergencyPhone"
                        )
                    ) +

                    createReviewRow(
                        "Residential Address",
                        getFieldValue(
                            "studentAddress"
                        )
                    ) +

                    createReviewRow(
                        "City / Town",
                        getFieldValue(
                            "studentCity"
                        )
                    ) +

                    createReviewRow(
                        "Region",
                        getFieldValue(
                            "studentRegion"
                        )
                    ) +

                    createReviewRow(
                        "Digital Address",
                        getFieldValue(
                            "studentDigitalAddress"
                        )
                    )
                )}


                ${createReviewSection(
                    "Guardian / Parent",
                    "fa-solid fa-people-roof",
                    3,

                    createReviewRow(
                        "Guardian Name",
                        getFieldValue(
                            "guardianName"
                        )
                    ) +

                    createReviewRow(
                        "Relationship",
                        getFieldValue(
                            "guardianRelationship"
                        )
                    ) +

                    createReviewRow(
                        "Guardian Phone",
                        getFieldValue(
                            "guardianPhone"
                        )
                    ) +

                    createReviewRow(
                        "Alternative Phone",
                        getFieldValue(
                            "guardianAlternativePhone"
                        )
                    ) +

                    createReviewRow(
                        "Email Address",
                        getFieldValue(
                            "guardianEmail"
                        )
                    ) +

                    createReviewRow(
                        "Occupation",
                        getFieldValue(
                            "guardianOccupation"
                        )
                    ) +

                    createReviewRow(
                        "Address",
                        getFieldValue(
                            "guardianAddress"
                        )
                    )
                )}


                ${createReviewSection(
                    "Academic Information",
                    "fa-solid fa-graduation-cap",
                    4,

                    createReviewRow(
                        "Level",
                        getFieldValue(
                            "studentLevel"
                        )
                    ) +

                    createReviewRow(
                        "Programme",
                        getFieldValue(
                            "studentProgramme"
                        )
                    ) +

                    createReviewRow(
                        "House",
                        getFieldValue(
                            "studentHouse"
                        )
                    ) +

                    createReviewRow(
                        "Academic Year",
                        getFieldValue(
                            "studentAcademicYear"
                        )
                    ) +

                    createReviewRow(
                        "Index Number",
                        getFieldValue(
                            "studentIndexNumber"
                        )
                    )
                )}


                ${createReviewSection(
                    "Documents",
                    "fa-solid fa-folder-open",
                    5,

                    createReviewRow(
                        "Passport Photograph",
                        getFieldValue(
                            "studentPassportPhoto"
                        )
                    ) +

                    createReviewRow(
                        "Birth Certificate",
                        getFieldValue(
                            "studentBirthCertificate"
                        )
                    ) +

                    createReviewRow(
                        "Placement Document",
                        getFieldValue(
                            "studentPlacementDocument"
                        )
                    ) +

                    createReviewRow(
                        "Other Document",
                        getFieldValue(
                            "studentOtherDocument"
                        )
                    )
                )}

            `;


            attachReviewEditButtons();

        }


        /* ======================================================
           REVIEW EDIT BUTTONS
           ====================================================== */

        function attachReviewEditButtons() {

            if (!reviewContainer) {

                return;

            }


            const editButtons =
                reviewContainer.querySelectorAll(
                    "[data-review-edit]"
                );


            editButtons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();


                            const targetStep =
                                Number(
                                    button.dataset.reviewEdit
                                );


                            if (
                                !Number.isInteger(
                                    targetStep
                                )
                            ) {

                                return;

                            }


                            if (
                                targetStep < 1 ||
                                targetStep > totalSteps
                            ) {

                                return;

                            }


                            currentStep =
                                targetStep - 1;


                            updateStep();

                            updateProgress();


                            const targetPanel =
                                stepPanels[
                                    currentStep
                                ];


                            if (targetPanel) {

                                const focusTarget =
                                    targetPanel.querySelector(
                                        "input, select, textarea, h2, h3, .registration-step-heading"
                                    );


                                if (focusTarget) {

                                    if (
                                        focusTarget.matches(
                                            "h2, h3, .registration-step-heading"
                                        )
                                    ) {

                                        focusTarget.setAttribute(
                                            "tabindex",
                                            "-1"
                                        );

                                    }


                                    focusTarget.focus();

                                }

                            }

                        }
                    );

                }
            );

        }


        /* ======================================================
           COLLECT COMPLETE STUDENT DATA
           ====================================================== */

          

function collectStudentData() {

    const formData =
        new FormData(form);

    const studentData = {};

    formData.forEach(
        (value, key) => {

            /*
             * FILE INPUTS
             * ------------------------------------------------
             * Store the selected file as a Data URL so the
             * actual passport image can be displayed later.
             */

            if (
                value instanceof File
            ) {

                if (
                    value &&
                    value.name
                ) {

                    /*
                     * Store the filename temporarily.
                     * The actual image will be added below.
                     */

                    studentData[key] =
                        value.name;

                }

                return;

            }


            /*
             * Preserve multiple fields
             * with the same name.
             */

            if (
                Object.prototype.hasOwnProperty.call(
                    studentData,
                    key
                )
            ) {

                if (
                    Array.isArray(
                        studentData[key]
                    )
                ) {

                    studentData[key].push(
                        value
                    );

                } else {

                    studentData[key] = [
                        studentData[key],
                        value
                    ];

                }

            } else {

                studentData[key] =
                    value;

            }

        }
    );


    /*
     * --------------------------------------------------------
     * PASSPORT PHOTO
     * --------------------------------------------------------
     * Read the actual selected passport image.
     *
     * This allows student-profile.js to display the image
     * after the student has been saved.
     */

    const passportPhoto =
        form.elements[
            "studentPassportPhoto"
        ];


    if (
        passportPhoto &&
        passportPhoto.files &&
        passportPhoto.files.length > 0
    ) {

        const file =
            passportPhoto.files[0];


        /*
         * Only process image files.
         */

        if (
            file.type &&
            file.type.startsWith("image/")
        ) {

            const reader =
                new FileReader();


            reader.onload = () => {

                /*
                 * Find the student record that was just saved.
                 *
                 * The actual record is updated after the FileReader
                 * finishes reading the image.
                 */

                const saved =
                    localStorage.getItem(
                        "studentRecords"
                    );


                if (!saved) {
                    return;
                }


                try {

                    const records =
                        JSON.parse(saved);


                    if (
                        !Array.isArray(records) ||
                        !records.length
                    ) {

                        return;

                    }


                    const lastStudent =
                        records[
                            records.length - 1
                        ];


                    /*
                     * Store the actual image Data URL.
                     */

                    lastStudent.studentPassportPhotoData =
                        reader.result;


                    /*
                     * Keep the original filename too.
                     */

                    lastStudent.studentPassportPhoto =
                        file.name;


                    localStorage.setItem(
                        "studentRecords",
                        JSON.stringify(records)
                    );


                } catch (error) {

                    console.error(
                        "Unable to save passport photo.",
                        error
                    );

                }

            };


            reader.readAsDataURL(file);

        }

    }


    studentData.registrationProgress =
        calculateCompletion();


    studentData.savedAt =
        new Date().toISOString();


    return studentData;

}

   


        /* ======================================================
           READ FILE AS DATA URL
           ====================================================== */

        function readFileAsDataURL(
            file
        ) {

            return new Promise(
                (
                    resolve,
                    reject
                ) => {

                    if (!file) {

                        resolve("");

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        () => {

                            resolve(
                                reader.result
                            );

                        };


                    reader.onerror =
                        () => {

                            reject(
                                reader.error
                            );

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }


        /* ======================================================
           SAVE COMPLETED STUDENT
           WITH PASSPORT PHOTO
           ====================================================== */

       

async function saveCompletedStudent() {

    const studentData =
        collectStudentData();


    /*
     * --------------------------------------------------------
     * READ PASSPORT PHOTO BEFORE SAVING THE STUDENT
     * --------------------------------------------------------
     */

    const passportPhoto =
        form.elements[
            "studentPassportPhoto"
        ];


    if (
        passportPhoto &&
        passportPhoto.files &&
        passportPhoto.files.length > 0
    ) {

        const file =
            passportPhoto.files[0];


        if (
            file.type &&
            file.type.startsWith("image/")
        ) {

            try {

                studentData.studentPassportPhoto =
                    file.name;


                studentData.studentPassportPhotoData =
                    await new Promise(
                        (resolve, reject) => {

                            const reader =
                                new FileReader();


                            reader.onload = () => {

                                resolve(
                                    reader.result
                                );

                            };


                            reader.onerror = () => {

                                reject(
                                    reader.error
                                );

                            };


                            reader.readAsDataURL(
                                file
                            );

                        }
                    );

            } catch (error) {

                console.error(
                    "Unable to read passport photo.",
                    error
                );

            }

        }

    }


    /*
     * --------------------------------------------------------
     * LOAD EXISTING STUDENTS
     * --------------------------------------------------------
     */

    let savedStudents = [];


    const existing =
        localStorage.getItem(
            "studentRecords"
        );


    if (existing) {

        try {

            const parsed =
                JSON.parse(existing);


            if (
                Array.isArray(parsed)
            ) {

                savedStudents =
                    parsed;

            }

        } catch (error) {

            console.warn(
                "Unable to read existing student records. Starting a new list.",
                error
            );

        }

    }


    /*
     * --------------------------------------------------------
     * CREATE STUDENT ID
     * --------------------------------------------------------
     */

    const studentId =
        `SMP-${new Date().getFullYear()}-${String(
            savedStudents.length + 1
        ).padStart(4, "0")}`;


    studentData.id =
        studentId;


    studentData.status =
        "Active";


    /*
     * --------------------------------------------------------
     * SAVE STUDENT
     * --------------------------------------------------------
     */

    savedStudents.push(
        studentData
    );


    localStorage.setItem(
        "studentRecords",
        JSON.stringify(
            savedStudents
        )
    );


    return studentData;

}



        /* ======================================================
           COMPLETE REGISTRATION
           ====================================================== */

        if (completeButton) {

            completeButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    finishRegistration();

                }
            );

        }


        /* ======================================================
           FINISH REGISTRATION
           ====================================================== */

        async function finishRegistration() {

            const completion =
                calculateCompletion();


            if (
                completion < 100
            ) {

                const proceed =
                    confirm(
                        `Registration is ${completion}% complete. Some information is still missing. Save this student anyway?`
                    );


                if (!proceed) {

                    return;

                }

            }


            /* ----------------------------------------------
               SAVE COMPLETE STUDENT
            ---------------------------------------------- */

            const savedStudent =
                await saveCompletedStudent();


            /* ----------------------------------------------
               REMOVE DRAFT
            ---------------------------------------------- */

            localStorage.removeItem(
                "studentRegistrationDraft"
            );


            /* ----------------------------------------------
               SUCCESS
            ---------------------------------------------- */

            alert(
                `Student registration completed successfully.\n\nStudent ID: ${savedStudent.id}`
            );


            /* ----------------------------------------------
               RESET FORM
            ---------------------------------------------- */

            form.reset();


            currentStep = 0;


            updateStep();

            updateProgress();


            closeModal();

        }


        /* ======================================================
           FORM SUBMIT PROTECTION
           ====================================================== */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                finishRegistration();

            }
        );


        /* ======================================================
           INITIALIZE
           ====================================================== */

        restoreDraft();

        updateStep();

        updateProgress();

    }
);