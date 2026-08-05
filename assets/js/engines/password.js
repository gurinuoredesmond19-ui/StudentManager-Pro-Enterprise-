


/**============ Password Engine ============== */
App.UI.Password = {
    init(){
        console.log("Password Engine Loaded");



    },

    toggle(inputId, iconId){
        const input =
        document.getElementById(inputId);
             const icon =
        document.getElementById(iconId);
        if (!input || !icon ) return;
        if (input.type === "password")
        {
            input.type = "text" ;
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        }
        else{
            input.type = "password";
             icon.classList.remove("fa-eye-slash");
             icon.classList.add("fa-eye")
        }

        
    }
};

/**====== Password Strong Checker =========== */
App.UI.Password.strength =
function (password) {
    let score =0 ;
    if (password.length>= 8 ) score ++ ;
    if (/ [A-Z]/.test(password)) score ++ ;
    if (/ [a-z]/.test(password)) score ++ ;
    if (/ [0-9]/.test(password)) score ++ ;
    if (/ [!@#$%^&*(),.?":{}|<>]/.test(password)) score++ ;
    return score;


    


}

/**==========  Strenght Label ========== */

App.UI.Password.level =
function(score){
    switch(score){
        case 0:
        case 1:
            return "Weak";
            case 2:
                return "Fair";
                case 3:
                    return "Good";
                    case 4:
                    case 5:
                        return "Strong";
                        default:
                            return "Weak"    ;
                

        


    }
}


/**======== Password Match Checker ========= */

App.UI.Password.match =
function(password, confirmPassword){
    return password == 
    confirmPassword;

}




/**======== Password Validation ========= */
App.UI.Password.validate =
function(password){
    return {
        length: password.length >= 8,
        uppercase:
        /[A-Z]/.test(password),

        toLowerCase:
         /[a-z]/.test(password),

        number:
         /[0-9]/.test(password),

        special:
         / [!@#$%^&*(),.?":{}|<>]/.test(password)


    };
}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})
