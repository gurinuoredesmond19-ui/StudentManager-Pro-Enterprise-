/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   COMPONENT LOADER
   ========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById(
        "studentRegistrationModalContainer"
    );

    if (!container) {
        return;
    }

    try {

        const response = await fetch(
            "assets/components/student-registration-modal.html"
        );

        if (!response.ok) {
            throw new Error(
                `Failed to load student registration modal: ${response.status}`
            );
        }

        const html = await response.text();

        container.innerHTML = html;

        console.log(
            "Student Registration Modal loaded successfully."
        );

        /*
         * Notify other scripts that the component
         * has finished loading.
         */
        document.dispatchEvent(
            new CustomEvent(
                "studentRegistrationModalLoaded"
            )
        );

    } catch (error) {

        console.error(
            "Student Registration Modal Loader Error:",
            error
        );

    }

});