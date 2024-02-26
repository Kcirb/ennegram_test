function selectLimit(limit){
    if (!limit) limit = 20;
    const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');

    if (checkedCheckboxes.length < limit) {
        // alert(`至少需選擇 ${limit} 項`);
        document.getElementById("popupBackground").style.display = "flex";
        return false;
    }else if (checkedCheckboxes.length == limit){
        document.getElementById('mainForm').action = "../result/result.html";
    }else if (checkedCheckboxes.length > limit){
        document.getElementById('mainForm').action = window.location.href;
    }
}

function closePopup(){
    document.getElementById("popupBackground").style.display = "none";
}