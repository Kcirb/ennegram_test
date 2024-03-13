function selectLimit(limit){
    if (!limit) limit = 20;
    const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');

    if (checkedCheckboxes.length < limit) {
        document.getElementById("popupMessage").innerHTML = "您至少需選擇20張卡牌！";
        document.getElementById("popupBackground").style.display = "flex";
        return false;
    }else if (checkedCheckboxes.length == limit){
        document.getElementById('mainForm').action = "../result/result.html";
    }else if (checkedCheckboxes.length > limit){
        if(window.location.href.includes('?')){
            document.getElementById("popupMessage").innerHTML = "您最多只能選擇20張卡牌！";
            document.getElementById("popupBackground").style.display = "flex";
            return false;
        }
        document.getElementById('mainForm').action = window.location.href;
    }
}