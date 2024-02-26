document.addEventListener("DOMContentLoaded", function(){

    selectLimit = (limit) =>{
        if (!limit) limit = 6;
        const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');

        if (checkedCheckboxes.length != limit) {
            document.getElementById("popupBackground").style.display = "flex";
            return false;
    }}


})