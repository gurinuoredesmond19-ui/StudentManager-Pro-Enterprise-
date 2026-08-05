/*
==========================================================
StudentManager Pro Enterprise
Login Engine
Version : 2.0
==========================================================

Features:
- Firebase email/password authentication
- Forgot password / password reset
- Password visibility toggle
- Whole role-card selection
- Staff department modal
- Remember Me
- Signing In loading state
- Professional error handling
- Firebase authentication persistence
- Duplicate event protection
==========================================================
*/


/* ==========================================================
   FIREBASE
========================================================== */

import {
    auth
} from "../firebase/firebase-config.js";


import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



/* ==========================================================
   APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       CONFIGURATION
    ====================================================== */

    const CONFIG = {

        defaultRole: "admin",

        toastDuration: 3500,

        redirectDelay: 700

    };


    /* ======================================================
       STATE
    ====================================================== */

    const loginState = {

        role: CONFIG.defaultRole,

        department: null,

        remember: false,

        loading: false,

        passwordResetting: false

    };


    /* ======================================================
       DOM REFERENCES
    ====================================================== */

    const elements = {

        /* Form */

        form:
            document.getElementById("loginForm"),

        username:
            document.getElementById("username"),

        password:
            document.getElementById("password"),

        rememberMe:
            document.getElementById("rememberMe"),

        loginButton:
            document.getElementById("loginButton"),


        /* Password eye */

        togglePassword:
            document.getElementById("togglePassword")
            ||
            document.querySelector(".toggle-password"),


        /* Forgot password */

        forgotPassword:
            document.getElementById("forgotPassword")
            ||
            document.querySelector(
                'a[href="#"]'
            ),


        /* Roles */

        roleCards:
            document.querySelectorAll(
                ".role-card"
            ),


        /* Department display */

        departmentLabel:
            document.querySelector(
                ".department-name"
            ),


        /* Optional inline department */

        staffDepartment:
            document.getElementById(
                "staffDepartment"
            ),


        /* Staff modal */

        staffModal:
            document.getElementById(
                "staffModal"
            ),

        closeModal:
            document.getElementById(
                "closeStaffModal"
            ),

        cancelModal:
            document.getElementById(
                "cancelStaff"
            ),

        continueModal:
            document.getElementById(
                "continueStaff"
            ),

        staffOptions:
            document.querySelectorAll(
                ".staff-option"
            )

    };


    /* ======================================================
       UTILITY — TOAST
    ====================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        let toast =
            document.querySelector(
                ".login-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "login-toast";

            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;


        toast.className =
            `login-toast ${type} show`;


        clearTimeout(
            toast._timeout
        );


        toast._timeout =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, CONFIG.toastDuration);

    }



    /* ======================================================
       UTILITY — ERROR MESSAGE
    ====================================================== */

    function getFirebaseErrorMessage(
        error
    ) {

        if (!error) {

            return "Something went wrong.";

        }


        switch (error.code) {


            /* LOGIN */

            case "auth/invalid-credential":

                return "Invalid email or password.";


            case "auth/invalid-email":

                return "Please enter a valid email address.";


            case "auth/user-not-found":

                return "No account was found with this email.";


            case "auth/wrong-password":

                return "Invalid email or password.";


            case "auth/user-disabled":

                return "This account has been disabled. Please contact the administrator.";


            case "auth/too-many-requests":

                return "Too many unsuccessful attempts. Please wait and try again.";


            case "auth/network-request-failed":

                return "Network error. Please check your internet connection.";


            /* PASSWORD RESET */

            case "auth/missing-email":

                return "Please enter your email address first.";


            /* GENERAL */

            default:

                console.error(
                    "Firebase error:",
                    error
                );

                return (
                    error.message
                    ||
                    "Unable to complete the request."
                );

        }

    }



    /* ======================================================
       PASSWORD VISIBILITY
====================================================== */

    function initializePasswordToggle() {

        const password =
            elements.password;

        const eye =
            elements.togglePassword;


        if (!password || !eye) {

            return;

        }


        eye.setAttribute(
            "role",
            "button"
        );


        eye.setAttribute(
            "tabindex",
            "0"
        );


        eye.setAttribute(
            "aria-label",
            "Show password"
        );


        function togglePasswordVisibility() {

            const hidden =
                password.type ===
                "password";


            password.type =
                hidden
                    ? "text"
                    : "password";


            eye.classList.toggle(
                "fa-eye",
                !hidden
            );


            eye.classList.toggle(
                "fa-eye-slash",
                hidden
            );


            eye.setAttribute(
                "aria-label",
                hidden
                    ? "Hide password"
                    : "Show password"
            );

        }


        eye.addEventListener(
            "click",
            togglePasswordVisibility
        );


        eye.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                    ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    togglePasswordVisibility();

                }

            }
        );

    }



    /* ======================================================
       LOGIN BUTTON STATE
====================================================== */

    function setLoading(
        loading
    ) {

        loginState.loading =
            loading;


        const button =
            elements.loginButton;


        if (!button) {

            return;

        }


        if (loading) {

            button.disabled =
                true;


            button.setAttribute(
                "aria-busy",
                "true"
            );


            button.innerHTML = `

                <i
                    class="fa-solid fa-spinner fa-spin">
                </i>

                <span>
                    Signing In...
                </span>

            `;

        }

        else {

            button.disabled =
                false;


            button.removeAttribute(
                "aria-busy"
            );


            button.innerHTML = `

                <i
                    class="fa-solid fa-right-to-bracket">
                </i>

                <span>
                    Sign In
                </span>

            `;

        }

    }



    /* ======================================================
       FORGOT PASSWORD BUTTON STATE
====================================================== */

    function setPasswordResetLoading(
        loading
    ) {

        loginState.passwordResetting =
            loading;


        if (!elements.forgotPassword) {

            return;

        }


        if (loading) {

            elements.forgotPassword.style.pointerEvents =
                "none";

            elements.forgotPassword.style.opacity =
                "0.6";

            elements.forgotPassword.dataset.originalText =
                elements.forgotPassword.textContent;

            elements.forgotPassword.textContent =
                "Sending...";

        }

        else {

            elements.forgotPassword.style.pointerEvents =
                "";

            elements.forgotPassword.style.opacity =
                "";

            elements.forgotPassword.textContent =
                elements.forgotPassword.dataset.originalText
                ||
                "Forgot Password?";

        }

    }



    /* ======================================================
       ROLE SELECTION
====================================================== */

    function initializeRoleSelection() {

        if (
            !elements.roleCards
            ||
            !elements.roleCards.length
        ) {

            return;

        }


        elements.roleCards.forEach(
            card => {


                card.addEventListener(
                    "click",
                    event => {

                        /*
                         * Prevent the radio button
                         * click from causing confusing
                         * duplicate behavior.
                         */

                        event.preventDefault();


                        selectRole(
                            card
                        );

                    }
                );


                /*
                 * Keyboard accessibility
                 */

                card.setAttribute(
                    "tabindex",
                    "0"
                );


                card.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter"
                            ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            selectRole(
                                card
                            );

                        }

                    }
                );

            }
        );


        /*
         * Set Admin as initial role
         */

        const initialCard =
            document.querySelector(
                `.role-card[data-role="${CONFIG.defaultRole}"]`
            );


        if (initialCard) {

            selectRole(
                initialCard,
                false
            );

        }

    }



    /* ======================================================
       SELECT ROLE
====================================================== */

    function selectRole(
        card,
        showStaffModal = true
    ) {

        if (!card) {

            return;

        }


        /*
         * Remove active state
         */

        elements.roleCards.forEach(
            item => {

                item.classList.remove(
                    "active"
                );


                const radio =
                    item.querySelector(
                        'input[type="radio"]'
                    );


                if (radio) {

                    radio.checked =
                        false;

                }

            }
        );


        /*
         * Activate selected card
         */

        card.classList.add(
            "active"
        );


        const radio =
            card.querySelector(
                'input[type="radio"]'
            );


        if (radio) {

            radio.checked =
                true;

        }


        /*
         * Read role
         */

        const role =
            (
                card.dataset.role
                ||
                ""
            ).toLowerCase();


        loginState.role =
            role;


        /*
         * Non-staff role
         */

        if (role !== "staff") {

            loginState.department =
                null;


            clearStaffSelection();

            hideInlineStaffDepartment();

            return;

        }


        /*
         * Staff role
         */

        showInlineStaffDepartment();


        if (showStaffModal) {

            openStaffModal();

        }

    }



    /* ======================================================
       STAFF MODAL — OPEN
====================================================== */

    function openStaffModal() {

        if (!elements.staffModal) {

            return;

        }


        elements.staffModal.classList.add(
            "show"
        );


        elements.staffModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }



    /* ======================================================
       STAFF MODAL — CLOSE
====================================================== */

    function closeStaffModal() {

        if (!elements.staffModal) {

            return;

        }


        elements.staffModal.classList.remove(
            "show"
        );


        elements.staffModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }



    /* ======================================================
       STAFF SELECTION
====================================================== */

    function initializeStaffDepartment() {


        /*
         * Close button
         */

        elements.closeModal?.addEventListener(
            "click",
            closeStaffModal
        );


        /*
         * Cancel button
         */

        elements.cancelModal?.addEventListener(
            "click",
            () => {

                /*
                 * If no department was selected,
                 * return to Admin role.
                 */

                if (
                    !loginState.department
                ) {

                    const adminCard =
                        document.querySelector(
                            '.role-card[data-role="admin"]'
                        );


                    if (adminCard) {

                        selectRole(
                            adminCard,
                            false
                        );

                    }

                }


                closeStaffModal();

            }
        );


        /*
         * Click outside modal
         */

        elements.staffModal?.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    elements.staffModal
                ) {

                    closeStaffModal();

                }

            }
        );


        /*
         * ESC
         */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                    &&
                    elements.staffModal?.classList.contains(
                        "show"
                    )
                ) {

                    closeStaffModal();

                }

            }
        );


        /*
         * Department cards
         */

        elements.staffOptions.forEach(
            option => {

                option.addEventListener(
                    "click",
                    () => {

                        elements.staffOptions.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        option.classList.add(
                            "active"
                        );


                        /*
                         * Support BOTH:
                         *
                         * data-role
                         * data-department
                         */

                        const department =
                            option.dataset.department
                            ||
                            option.dataset.role
                            ||
                            option.textContent.trim();


                        option.dataset.selected =
                            "true";


                        loginState.department =
                            department;

                    }
                );

            }
        );


        /*
         * Continue
         */

        elements.continueModal?.addEventListener(
            "click",
            () => {

                if (
                    !loginState.department
                ) {

                    showToast(
                        "Please select a staff department.",
                        "error"
                    );

                    return;

                }


                updateDepartmentLabel();


                closeStaffModal();


                showToast(
                    `${loginState.department} selected.`,
                    "success"
                );

            }
        );

    }



    /* ======================================================
       STAFF DISPLAY
====================================================== */

    function updateDepartmentLabel() {

        if (
            elements.departmentLabel
        ) {

            elements.departmentLabel.textContent =
                loginState.department
                ||
                "";

        }

    }



    function clearStaffSelection() {

        elements.staffOptions.forEach(
            option => {

                option.classList.remove(
                    "active"
                );

                option.dataset.selected =
                    "false";

            }
        );


        updateDepartmentLabel();

    }



    function showInlineStaffDepartment() {

        if (
            !elements.staffDepartment
        ) {

            return;

        }


        elements.staffDepartment.style.display =
            "block";


        elements.staffDepartment.classList.add(
            "show-department"
        );

    }



    function hideInlineStaffDepartment() {

        if (
            !elements.staffDepartment
        ) {

            return;

        }


        elements.staffDepartment.style.display =
            "none";


        elements.staffDepartment.classList.remove(
            "show-department"
        );

    }



    /* ======================================================
       VALIDATION
====================================================== */

    function validateLogin() {

        if (
            !elements.username
            ||
            !elements.password
        ) {

            return false;

        }


        const email =
            elements.username.value.trim();


        const password =
            elements.password.value;


        if (!email) {

            showToast(
                "Please enter your email address.",
                "error"
            );


            elements.username.focus();


            return false;

        }


        if (!password) {

            showToast(
                "Please enter your password.",
                "error"
            );


            elements.password.focus();


            return false;

        }


        if (
            loginState.role === "staff"
            &&
            !loginState.department
        ) {

            showToast(
                "Please select your staff department.",
                "error"
            );


            openStaffModal();


            return false;

        }


        return true;

    }



    /* ======================================================
       REMEMBER ME
====================================================== */

    function initializeRememberMe() {

        if (
            !elements.rememberMe
        ) {

            return;

        }


        elements.rememberMe.addEventListener(
            "change",
            () => {

                loginState.remember =
                    elements.rememberMe.checked;

            }
        );

    }



    /* ======================================================
       FIREBASE PERSISTENCE
====================================================== */

    async function applyPersistence() {

        const persistence =
            loginState.remember
                ? browserLocalPersistence
                : browserSessionPersistence;


        await setPersistence(
            auth,
            persistence
        );

    }



    /* ======================================================
       LOGIN
====================================================== */

    function initializeLogin() {

        if (
            !elements.form
        ) {

            console.warn(
                "Login form was not found."
            );

            return;

        }


        elements.form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /*
                 * Prevent duplicate submission
                 */

                if (
                    loginState.loading
                ) {

                    return;

                }


                /*
                 * Validate
                 */

                if (
                    !validateLogin()
                ) {

                    return;

                }


                /*
                 * Read Remember Me
                 */

                if (
                    elements.rememberMe
                ) {

                    loginState.remember =
                        elements.rememberMe.checked;

                }


                const email =
                    elements.username.value.trim();


                const password =
                    elements.password.value;


                /*
                 * Start loading
                 */

                setLoading(
                    true
                );


                try {

                    /*
                     * Apply Firebase persistence
                     */

                    await applyPersistence();


                    /*
                     * Firebase login
                     */

                    const credential =
                        await signInWithEmailAndPassword(
                            auth,
                            email,
                            password
                        );


                    /*
                     * Authentication succeeded
                     */

                    console.log(
                        "Firebase login successful:",
                        credential.user.uid
                    );


                    showToast(
                        "Welcome back! Signing you in...",
                        "success"
                    );


                    /*
                     * Give toast a moment to appear
                     */

                    setTimeout(
                        () => {

                            /*
                             * Use absolute-from-root
                             * dashboard path.
                             *
                             * Change this only if your
                             * dashboard is somewhere else.
                             */

                            window.location.href =
                                "dashboard.html";

                        },
                        CONFIG.redirectDelay
                    );

                }


                catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    setLoading(
                        false
                    );


                    showToast(
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }

            }
        );

    }



    /* ======================================================
       FORGOT PASSWORD
====================================================== */

    function initializeForgotPassword() {

        if (
            !elements.forgotPassword
        ) {

            console.warn(
                "Forgot Password link was not found."
            );

            return;

        }


        elements.forgotPassword.addEventListener(
            "click",
            async event => {

                event.preventDefault();


                /*
                 * Prevent duplicate requests
                 */

                if (
                    loginState.passwordResetting
                ) {

                    return;

                }


                if (
                    !elements.username
                ) {

                    return;

                }


                const email =
                    elements.username.value.trim();


                /*
                 * Email required
                 */

                if (!email) {

                    showToast(
                        "Enter your email address first, then click Forgot Password.",
                        "error"
                    );


                    elements.username.focus();


                    return;

                }


                /*
                 * Basic email check
                 */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    showToast(
                        "Please enter a valid email address.",
                        "error"
                    );


                    elements.username.focus();


                    return;

                }


                setPasswordResetLoading(
                    true
                );


                try {

                    /*
                     * Firebase sends the email
                     */

                    await sendPasswordResetEmail(
                        auth,
                        email
                    );


                    showToast(
                        "Password reset email sent. Check your inbox.",
                        "success"
                    );


                }


                catch (error) {

                    console.error(
                        "Password reset error:",
                        error
                    );


                    showToast(
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }


                finally {

                    setPasswordResetLoading(
                        false
                    );

                }

            }
        );

    }



    /* ======================================================
       INITIALIZATION
====================================================== */

    initializePasswordToggle();

    initializeRoleSelection();

    initializeStaffDepartment();

    initializeRememberMe();

    initializeLogin();

    initializeForgotPassword();


    console.log(
        "StudentManager Pro Login Engine initialized."
    );

});