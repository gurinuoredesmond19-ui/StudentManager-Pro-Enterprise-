/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   STUDENTS MODULE
   Dashboard Controller
   ========================================================== */

import { StudentDataService }
    from "./student-data.js";


document.addEventListener("DOMContentLoaded", async () => {


    /* ======================================================
       SAFE ELEMENT UPDATE
       ====================================================== */

    function setElementValue(id, value) {

        const element =
            document.getElementById(id);

        if (!element) {

            console.warn(
                `Students Module: Element #${id} was not found.`
            );

            return;

        }

        element.textContent =
            Number(value).toLocaleString();

    }


    /* ======================================================
       UPDATE STATISTICS
       ====================================================== */

    function updateStatistics(statistics) {

        setElementValue(
            "totalStudents",
            statistics.totalStudents
        );

        setElementValue(
            "newAdmissions",
            statistics.newAdmissions
        );

        setElementValue(
            "pendingEnrollment",
            statistics.pendingEnrollment
        );

        setElementValue(
            "finalYearStudents",
            statistics.finalYearStudents
        );

    }


    /* ======================================================
       UPDATE ADMISSION PIPELINE
       ====================================================== */

    function updateAdmissionPipeline(pipeline) {

        setElementValue(
            "placementCount",
            pipeline.placement
        );

        setElementValue(
            "verifiedCount",
            pipeline.verified
        );

        setElementValue(
            "reportedCount",
            pipeline.reported
        );

        setElementValue(
            "enrolledCount",
            pipeline.enrolled
        );

    }


    /* ======================================================
       LOAD DASHBOARD
       ====================================================== */

    async function loadStudentDashboard() {

        try {

            const dashboardData =
                await StudentDataService
                    .getDashboardSummary();


            updateStatistics(
                dashboardData.statistics
            );


            updateAdmissionPipeline(
                dashboardData.admissionPipeline
            );


            console.log(
                "StudentManager Pro: Dashboard data loaded.",
                dashboardData
            );


        } catch (error) {

            console.error(
                "StudentManager Pro: Failed to load student dashboard.",
                error
            );

        }

    }


    /* ======================================================
       INITIALIZE
       ====================================================== */

    await loadStudentDashboard();


});


/* ==========================================================
   STUDENT POPULATION CHART
   Step 3D-B
   ========================================================== */

let studentPopulationChart = null;


/* ==========================================================
   POPULATION DATA
   Temporary structure
   Will later come from Firebase
   ========================================================== */

const populationData = {

    year: {
        labels: [
            "SHS 1",
            "SHS 2",
            "SHS 3"
        ],

        values: [
            420,
            395,
            365
        ]
    },

    term: {
        labels: [
            "Term 1",
            "Term 2",
            "Term 3"
        ],

        values: [
            1180,
            1145,
            1180
        ]
    }

};


/* ==========================================================
   INITIALIZE POPULATION CHART
   ========================================================== */

function initializeStudentPopulationChart() {

    const canvas =
        document.getElementById("studentPopulationChart");

    if (!canvas) {
        return;
    }


    const context =
        canvas.getContext("2d");


    const currentData =
        populationData.year;


    studentPopulationChart =
        new Chart(context, {

            type: "bar",

            data: {

                labels: currentData.labels,

                datasets: [

                    {

                        label: "Students",

                        data: currentData.values,

                        borderRadius: 8,

                        borderSkipped: false,

                        maxBarThickness: 55

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {

                    intersect: false,

                    mode: "index"

                },


                plugins: {

                    legend: {

                        display: false

                    },


                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                return (
                                    " Students: " +
                                    context.parsed.y
                                );

                            }

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display: false

                        },

                        ticks: {

                            color: "#64748b",

                            font: {

                                size: 11

                            }

                        }

                    },


                    y: {

                        beginAtZero: true,

                        grid: {

                            color:
                                "rgba(148, 163, 184, 0.15)"

                        },

                        ticks: {

                            color: "#64748b",

                            font: {

                                size: 10

                            }

                        }

                    }

                }

            }

        });


    updatePopulationChartTotal(
        currentData.values
    );

}


/* ==========================================================
   UPDATE TOTAL
   ========================================================== */

function updatePopulationChartTotal(values) {

    const totalElement =
        document.getElementById(
            "populationChartTotal"
        );


    if (!totalElement) {
        return;
    }


    const total =
        values.reduce(
            (sum, value) => sum + value,
            0
        );


    totalElement.textContent =
        total.toLocaleString();

}


/* ==========================================================
   CHART FILTERS
   ========================================================== */

function initializePopulationFilters() {

    const filters =
        document.querySelectorAll(
            ".population-filter"
        );


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            function() {

                const period =
                    this.dataset.period;


                const selectedData =
                    populationData[period];


                if (
                    !selectedData ||
                    !studentPopulationChart
                ) {
                    return;
                }


                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                this.classList.add("active");


                studentPopulationChart.data.labels =
                    selectedData.labels;


                studentPopulationChart.data.datasets[0].data =
                    selectedData.values;


                studentPopulationChart.update();


                updatePopulationChartTotal(
                    selectedData.values
                );

            }
        );

    });

}


/* ==========================================================
   START POPULATION ANALYTICS
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeStudentPopulationChart();

        initializePopulationFilters();

    }
);


/* ==========================================================
   STUDENT STATISTICS
   Step 3E
   ========================================================== */

function updateStudentStatistics() {

    /*
     * Temporary student statistics.
     *
     * Later these values will come from Firebase
     * through the StudentDataService.
     */

    const statistics = {

        totalStudents: 1180,

        newAdmissions: 420,

        pendingEnrollment: 37,

        finalYearStudents: 365

    };


    /* ==============================
       TOTAL STUDENTS
    ============================== */

    const totalStudents =
        document.getElementById(
            "totalStudents"
        );

    if (totalStudents) {

        totalStudents.textContent =
            statistics.totalStudents.toLocaleString();

    }


    /* ==============================
       NEW ADMISSIONS
    ============================== */

    const newAdmissions =
        document.getElementById(
            "newAdmissions"
        );

    if (newAdmissions) {

        newAdmissions.textContent =
            statistics.newAdmissions.toLocaleString();

    }


    /* ==============================
       PENDING ENROLLMENT
    ============================== */

    const pendingEnrollment =
        document.getElementById(
            "pendingEnrollment"
        );

    if (pendingEnrollment) {

        pendingEnrollment.textContent =
            statistics.pendingEnrollment.toLocaleString();

    }


    /* ==============================
       FINAL YEAR
    ============================== */

    const finalYearStudents =
        document.getElementById(
            "finalYearStudents"
        );

    if (finalYearStudents) {

        finalYearStudents.textContent =
            statistics.finalYearStudents.toLocaleString();

    }

}


/* ==========================================================
   INITIALIZE STUDENT STATISTICS
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStudentStatistics();

    }
);





/* ==========================================================
   ADMISSION PIPELINE
   Step 3F
   ========================================================== */

function updateAdmissionPipeline() {

    /*
     * Temporary lifecycle statistics.
     *
     * Later these values will be calculated from
     * the actual student database.
     */

    const pipeline = {

        placement: 450,

        verified: 432,

        reported: 398,

        enrolled: 375

    };


    /* ==============================
       PLACEMENT INTAKE
    ============================== */

    const placementCount =
        document.getElementById(
            "placementCount"
        );

    if (placementCount) {

        placementCount.textContent =
            pipeline.placement.toLocaleString();

    }


    /* ==============================
       VERIFIED
    ============================== */

    const verifiedCount =
        document.getElementById(
            "verifiedCount"
        );

    if (verifiedCount) {

        verifiedCount.textContent =
            pipeline.verified.toLocaleString();

    }


    /* ==============================
       REPORTED
    ============================== */

    const reportedCount =
        document.getElementById(
            "reportedCount"
        );

    if (reportedCount) {

        reportedCount.textContent =
            pipeline.reported.toLocaleString();

    }


    /* ==============================
       ENROLLED
    ============================== */

    const enrolledCount =
        document.getElementById(
            "enrolledCount"
        );

    if (enrolledCount) {

        enrolledCount.textContent =
            pipeline.enrolled.toLocaleString();

    }

}


/* ==========================================================
   INITIALIZE ADMISSION PIPELINE
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAdmissionPipeline();

    }
);


/* ==========================================================
   RECENT STUDENT ACTIVITY
   Step 3G
   ========================================================== */

const recentStudentActivities = [

    {
        icon: "fa-user-check",
        type: "success",
        title: "Student enrollment completed",
        description: "Ama Mensah was enrolled into SHS 1 Science.",
        time: "8 minutes ago"
    },

    {
        icon: "fa-file-import",
        type: "info",
        title: "Placement records imported",
        description: "125 student placement records were imported.",
        time: "32 minutes ago"
    },

    {
        icon: "fa-user-shield",
        type: "purple",
        title: "Admission verified",
        description: "Kwame Asare's admission record was verified.",
        time: "1 hour ago"
    },

    {
        icon: "fa-user-plus",
        type: "orange",
        title: "New admission received",
        description: "A new SHS 1 admission record was created.",
        time: "2 hours ago"
    }

];


/* ==========================================================
   RENDER RECENT ACTIVITY
   ========================================================== */

function renderStudentActivity() {

    const activityContainer =
        document.getElementById(
            "studentActivity"
        );


    if (!activityContainer) {
        return;
    }


    if (
        !recentStudentActivities ||
        recentStudentActivities.length === 0
    ) {

        activityContainer.innerHTML = `

            <div class="student-activity-empty">

                <div>

                    <i class="fa-solid fa-clock-rotate-left"></i>

                </div>

                <h3>
                    No student activity yet
                </h3>

                <p>
                    Admissions, enrollment and student activities
                    will appear here automatically.
                </p>

            </div>

        `;

        return;

    }


    activityContainer.innerHTML = `

        <div class="student-activity-list">

            ${recentStudentActivities.map(activity => `

                <article class="student-activity-item">

                    <div class="
                        student-activity-icon
                        ${activity.type}
                    ">

                        <i class="
                            fa-solid
                            ${activity.icon}
                        "></i>

                    </div>


                    <div class="student-activity-content">

                        <strong>
                            ${activity.title}
                        </strong>

                        <p>
                            ${activity.description}
                        </p>

                    </div>


                    <time>
                        ${activity.time}
                    </time>

                </article>

            `).join("")}

        </div>

    `;

}


/* ==========================================================
   INITIALIZE STUDENT ACTIVITY
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudentActivity();

    }
);





