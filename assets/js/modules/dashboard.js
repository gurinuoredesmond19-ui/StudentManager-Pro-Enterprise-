/*
==========================================================
    STUDENTMANAGER PRO ENTERPRISE
    DASHBOARD MODULE
    Version 2.0
==========================================================
*/


/*==========================================================
    APPLICATION START
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        /*
        ==================================================
        SIDEBAR
        ==================================================

        Sidebar is loaded and initialized ONLY through
        the Sidebar Engine.

        Do NOT add another sidebar event listener here.
        */

        if (
            typeof App !== "undefined" &&
            App.UI &&
            App.UI.Sidebar
        ) {
             await loadTopbar();

            await App.UI.Sidebar.load();

        }

        else {

            console.error(
                "StudentManager Pro: Sidebar engine is not available."
            );

        }


        /*
        ==================================================
        TOPBAR
        ==================================================
        */

       


        /*
        ==================================================
        DASHBOARD CONTENT
        ==================================================
        */

        await loadDashboardOverview();

        await loadQuickActions();

        await loadRecentActivities();

        await loadNotifications();

    }
);


/*==========================================================
    TOPBAR
==========================================================*/

async function loadTopbar() {

    const topbar =
        document.getElementById(
            "topbar"
        );


    if (!topbar) {

        return;

    }


    try {

        const response =
            await fetch(
                "assets/components/topbar.html"
            );


        if (!response.ok) {

            throw new Error(
                `Topbar failed to load: ${response.status}`
            );

        }


        topbar.innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(
            "Topbar loading error:",
            error
        );

    }

}


/*==========================================================
    DASHBOARD OVERVIEW
==========================================================*/

async function loadDashboardOverview() {

    const overview =
        document.getElementById(
            "dashboardOverview"
        );


    if (!overview) {

        return;

    }


    try {

        const response =
            await fetch(
                "assets/components/dashboard-overview.html"
            );


        if (!response.ok) {

            throw new Error(
                `Dashboard overview failed: ${response.status}`
            );

        }


        overview.innerHTML =
            await response.text();


        /*
        Initialize charts AFTER HTML exists.
        */

        initializeStudentChart();

        initializeGenderChart();

        initializeFeesChart();

        initializeAttendance();

    }

    catch (error) {

        console.error(
            "Dashboard overview loading error:",
            error
        );

    }

}


/*==========================================================
    QUICK ACTIONS
==========================================================*/

async function loadQuickActions() {

    const container =
        document.getElementById(
            "quickActions"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                "assets/components/quick-actions.html"
            );


        if (!response.ok) {

            throw new Error(
                `Quick actions failed: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(
            "Quick actions loading error:",
            error
        );

    }

}


/*==========================================================
    RECENT ACTIVITIES
==========================================================*/

async function loadRecentActivities() {

    const container =
        document.getElementById(
            "recentActivities"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                "assets/components/recent-activities.html"
            );


        if (!response.ok) {

            throw new Error(
                `Recent activities failed: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(
            "Recent activities loading error:",
            error
        );

    }

}


/*==========================================================
    NOTIFICATIONS
==========================================================*/

async function loadNotifications() {

    const container =
        document.getElementById(
            "notificationsPanel"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                "assets/components/notifications.html"
            );


        if (!response.ok) {

            throw new Error(
                `Notifications failed: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(
            "Notifications loading error:",
            error
        );

    }

}


/*==========================================================
    STUDENT CHART
==========================================================*/

function initializeStudentChart() {

    const canvas =
        document.getElementById(
            "studentChart"
        );


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    new Chart(
        canvas,
        {

            type: "bar",

            data: {

                labels: [

                    "SHS 1",
                    "SHS 2",
                    "SHS 3"

                ],

                datasets: [

                    {

                        label: "Students",

                        data: [
                            420,
                            398,
                            436
                        ],

                        borderWidth: 1

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );

}


/*==========================================================
    GENDER CHART
==========================================================*/

function initializeGenderChart() {

    const canvas =
        document.getElementById(
            "genderChart"
        );


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    new Chart(
        canvas,
        {

            type: "pie",

            data: {

                labels: [

                    "Boys",
                    "Girls"

                ],

                datasets: [

                    {

                        data: [
                            620,
                            634
                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );

}


/*==========================================================
    FEES CHART
==========================================================*/

function initializeFeesChart() {

    const canvas =
        document.getElementById(
            "feesChart"
        );


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels: [

                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"

                ],

                datasets: [

                    {

                        label:
                            "Fees Collected (GH$)",

                        data: [

                            18000,
                            24000,
                            20000,
                            30000,
                            34000,
                            10050

                        ],

                        fill: false,

                        tension: 0.4

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );

}


/*==========================================================
    ATTENDANCE CHART
==========================================================*/

function initializeAttendance() {

    const canvas =
        document.getElementById(
            "attendanceChart"
        );


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels: [

                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"

                ],

                datasets: [

                    {

                        label:
                            "Attendance %",

                        data: [

                            95,
                            92,
                            88,
                            74,
                            93

                        ],

                        fill: false,

                        tension: 0.4

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        min: 0,

                        max: 100

                    }

                }

            }

        }
    );

}