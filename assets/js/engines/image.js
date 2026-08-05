






/**============== IMAGE PREVIEW  EGINE =========== */

App.UI.Image ={
    init(){
        console.log("Image Preview Engine Loaded");

    },

    preview(inputId, imageId , placeholder = ""){
        const input =
        document.getElementById(inputId);

         const image =
        document.getElementById(imageId);

        if (!input || !image) return;
        const file = input.files[0];
        if (!file){
            if (placeholder !== ""){
                image.src =
                placeholder;
            }
            return;

        }
        // Valid Image 
    const allaowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (! allaowedTypes.includes(file.type)
    ){

        App.UI.error("Only JPEG,PNG and WEBP images are allowed.");
        input.value = "";
        return;


        }
        const reader =
        new FileReader();
        reader.onload = function(e){
            image.src = 
            e.target.result;
        }
        reader.readAsDataURL(file);


    }
    
};



/**====== Remove Selected Images ====== */
App.UI.Image.remove =
function(inputId, imageId , placeholder = "") {
    const input =
    document.getElementById(inputId);

     const image =
    document.getElementById(imageId);
    if (input){
        input.value = "";

    }
    if (image) {
        image.src = placeholder;
    }
};






/**====== Validate Image Only ====== */

App.UI.Image.validate = function(file){
    if (!file) return false ;
    const allowed =
    [
         "image/jpeg",
        "image/png",
        "image/webp"
    ];
    return
    allowed.includes(file.type);


}




/**====== Get File Size ====== */

App.UI.Image.fileSize = function(file){

    if (!file ) return "0 KB";
    const size = file.size / 1024;
    if (size < 1024){
        return size.toFixed(1) + "KB";

    }
    return (size /1024).toFixed(2) + "MB";
}
/*========== Auto Initialize========= */
document.addEventListener("DOMContentLoaded",()=>{
  App.UI.init();

})