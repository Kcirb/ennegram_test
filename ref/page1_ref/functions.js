function selectLimit(limit){
    if (!limit) limit = 6;
    const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');

    if (checkedCheckboxes.length < limit) {
        // alert(`至少需選擇 ${limit} 項`);
        document.getElementById("popupBackground").style.display = "flex";
        return false;
    }else if (checkedCheckboxes.length == limit){
        document.getElementById('mainForm').action = "../result_ref/result.html"
    }else if (checkedCheckboxes.length > limit){
        document.getElementById('mainForm').action = "../page2_ref/index_p2.html"
    }
}

function closePopup(){
    document.getElementById("popupBackground").style.display = "none";
}