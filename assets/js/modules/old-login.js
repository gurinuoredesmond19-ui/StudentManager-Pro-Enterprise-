document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       SHOW / HIDE PASSWORD
    ============================ */

    const password = document.getElementById("password");

    const eye = document.querySelector(".toggle-password");

    if(password && eye){

        eye.addEventListener("click", () => {

            if(password.type === "password"){

                password.type = "text";

                eye.classList.remove("fa-eye");

                eye.classList.add("fa-eye-slash");

            }else{

                password.type = "password";

                eye.classList.remove("fa-eye-slash");

                eye.classList.add("fa-eye");

            }

        });

    }

});





/* ==========================================
   ROLE CARD SELECTION
========================================== */

const roleCards = document.querySelectorAll(".role-card");

const staffDepartment = document.getElementById("staffDepartment");

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        roleCards.forEach(item => {

            item.classList.remove("active");

            item.querySelector("input").checked = false;

        });

        card.classList.add("active");

        card.querySelector("input").checked = true;

        if(card.dataset.role === "staff"){

            staffDepartment.style.display = "block";

            staffDepartment.classList.add("show-department");

        }else{

            staffDepartment.style.display = "none";

            staffDepartment.classList.remove("show-department");

        }

    });

});




// ==========================================
// StudentManager Pro Enterprise Login
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const staffCard = document.querySelector(".role-card[data-role='Staff']");
    const staffModal = document.getElementById("staffModal");
    const closeBtn = document.getElementById("closeStaffModal");
    const cancelBtn = document.getElementById("cancelStaff");
    const continueBtn = document.getElementById("continueStaff");

    const staffOptions = document.querySelectorAll(".staff-option");
    const loginButton = document.getElementById("loginButton");

    let selectedDepartment = "";

    // Open modal when Staff is selected
    if (staffCard) {
        staffCard.addEventListener("click", () => {
            staffModal.classList.add("show");
        });
    }

    // Close modal
    function closeModal() {
        staffModal.classList.remove("show");
    }

    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    // Close when clicking outside
    staffModal.addEventListener("click", (e) => {
        if (e.target === staffModal) {
            closeModal();
        }
    });

    // Close with ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // Select department
    staffOptions.forEach(option => {

        option.addEventListener("click", () => {

            staffOptions.forEach(o => o.classList.remove("active"));

            option.classList.add("active");

            selectedDepartment = option.dataset.role;

        });

    });

    // Continue button
    continueBtn.addEventListener("click", () => {

        if (selectedDepartment === "") {

            alert("Please select a department.");

            return;

        }

        loginButton.innerHTML =
            `<i class="fa-solid fa-right-to-bracket"></i>
             Sign in as ${selectedDepartment}`;

        loginButton.dataset.department = selectedDepartment;

        closeModal();

    });

});





