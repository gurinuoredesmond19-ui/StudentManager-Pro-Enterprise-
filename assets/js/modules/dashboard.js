/*
=========================================
StudentManager Pro Enterprise
Dashboard Module
=========================================
*/



document.addEventListener("DOMContentLoaded", () => {

    loadSidebar();

    loadTopbar();

    loadDashboardOverview();

    loadQuickActions();
    
    loadRecentActivities();

    loadNotifications();

   


});



/* ==================================================
   SIDEBAR LOADER
================================================== */

async function loadSidebar() {

    const sidebar =
        document.getElementById("sidebar");


    /*
    ==============================================
    SIDEBAR CONTAINER NOT FOUND
    ==============================================
    */

    if (!sidebar) {

        console.warn(
            "Sidebar container #sidebar was not found."
        );

        return;

    }


    try {

        /*
        ==========================================
        LOAD SHARED SIDEBAR COMPONENT
        ==========================================
        */

        const response =
            await fetch(
                "assets/components/sidebar.html"
            );


        /*
        ==========================================
        CHECK SERVER RESPONSE
        ==========================================
        */

        if (!response.ok) {

            throw new Error(
                `Sidebar failed to load: ${response.status}`
            );

        }


        /*
        ==========================================
        INSERT SIDEBAR HTML
        ==========================================
        */

        sidebar.innerHTML =
            await response.text();


        /*
        ==========================================
        INITIALIZE SIDEBAR ENGINE
        IMPORTANT:
        This happens AFTER sidebar.html exists.
        ==========================================
        */

        if (
            typeof App !== "undefined"
            &&
            App.UI
            &&
            App.UI.Sidebar
        ) {

            App.UI.Sidebar.init();

        }

        else {

            /*
            Fallback for your existing system
            */

            if (
                typeof initializeSidebarToggle ===
                "function"
            ) {

                initializeSidebarToggle();

            }

        }


        console.log(
            "Sidebar loaded successfully."
        );

    }


    catch (error) {

        console.error(
            "Sidebar loading error:",
            error
        );


        /*
        ==========================================
        OPTIONAL ERROR MESSAGE
        ==========================================
        */

        sidebar.innerHTML = `

            <div class="sidebar-error">

                <span>⚠️</span>

                <p>
                    Unable to load navigation.
                </p>

            </div>

        `;

    }

}


/* ========== topbar  ============*/
async function loadTopbar(){

    const topbar = document.getElementById("topbar");

    if(!topbar) return;

    const response = await fetch("assets/components/topbar.html");

    topbar.innerHTML = await response.text();

}


/* ========== dashboard-ovrview ============*/


async function loadDashboardOverview(){

    const overview = document.getElementById("dashboardOverview");

    if(!overview) return;

    const response = await fetch("assets/components/dashboard-overview.html");

    overview.innerHTML = await response.text();

    initializeStudentChart();

    initializeGenderChart();

    initializeFeesChart();

    initializeAttendance();

}






function initializeSidebarToggle(){

    const toggle = document.getElementById("sidebarToggle");

    const sidebar = document.querySelector(".app-sidebar");

    const main = document.querySelector(".app-main");

    if(!toggle || !sidebar || !main) return;

    toggle.addEventListener("click",()=>{

        sidebar.classList.toggle("collapsed");

        main.classList.toggle("expanded");

    });

}


/* ========== quick actions ============*/

async function loadQuickActions(){

    const container = document.getElementById("quickActions");

    if(!container) return;

    const response = await fetch("assets/components/quick-actions.html");

    container.innerHTML = await response.text();

}


/* ========== recent activities ============*/

async function loadRecentActivities(){

    const container = document.getElementById("recentActivities");

    if(!container) return;

    const response = await fetch("assets/components/recent-activities.html");

    container.innerHTML = await response.text();

}


/* ========== Notification ============*/

async function loadNotifications(){

    const container = document.getElementById("notificationsPanel");

    if(!container) return;

    const response = await fetch("assets/components/notifications.html");

    container.innerHTML = await response.text();

}


/* ============== Chart(Stats) script ============*/

function initializeStudentChart(){

    const canvas = document.getElementById("studentChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "SHS 1",
                "SHS 2",
                "SHS 3"
            ],

            datasets:[{

                label:"Students",

                data:[420,398,436],

                borderWidth:1

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}


/*=================== Gender Chart ==============*/


function initializeGenderChart(){

    const canvas = document.getElementById("genderChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"pie",

        data:{

            labels:["Boys","Girls"],

            datasets:[{

                data:[620,634]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}



function initializeFeesChart(){

    const canvas = document.getElementById("feesChart");

    if(!canvas) return;

    new Chart(canvas,{
        type: "line" ,
        data: {
            labels:["Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",


            ],
            datasets:[{
                label: "Fees Collected (GH$)",

                data: [
                    18000,
                    24000,
                    20000,
                    30000,
                    34000,
                    10050
                ],
                fill: false,
                tension: .4
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}




function initializeAttendance(){

    const canvas = document.getElementById("attendanceChart");

    if(!canvas) return;

    new Chart(canvas,{

        type: "line",
        data: {
            
            labels :[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri"
            ],

            datasets:[{

                label : "Attendance %" ,
                data :[
                    95,
                    92,
                    88,
                    74,
                    93

                ],
                Transition : .4,
                fill: false
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }


    });
}
