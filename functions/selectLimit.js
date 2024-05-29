window.onload = () =>{
    let urlParams = new URLSearchParams(window.location.search);
    // 如果上一頁已有選擇性別，則勾選一樣的性別
    if(urlParams.has('gender')) {
        let gender = urlParams.get('gender');
        document.getElementById(gender).checked = "checked";
    }
}

function selectLimit(limit){
    let urlParams = new URLSearchParams(window.location.search);
    // 預設要選20個
    if (!limit) limit = 20;

    // 取得有勾選的checkbox
    const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
    const verInp = urlParams.get('ver');
    let genderChecked = (document.getElementById('female').checked|document.getElementById('male').checked);

    // 根據勾選數量判斷
    if (checkedCheckboxes.length < limit) {
        // 少於20個，取消submit，並顯示彈出畫面
        document.getElementById("popupMessage").innerHTML = "您至少需選擇20張卡牌！";
        document.getElementById("popupBackground").style.display = "flex";
        return false;

    }else if (checkedCheckboxes.length > limit){
        // 若為第二頁
        if(verInp == 'v1'){
            document.getElementById("popupMessage").innerHTML = "您最多只能選擇20張卡牌！";
            document.getElementById("popupBackground").style.display = "flex";
            return false;
        }
        // 若無query代表是第一頁，可以直接跳轉到第二頁。]
        document.getElementById('version').value = 'v1';
        document.getElementById('mainForm').action = location.href;

    }else if (checkedCheckboxes.length == limit){
        // 如果勾選數量剛好為limit的值，直接跳到結果。
        document.getElementById('version').value = 'v2';
        document.getElementById('mainForm').action = "../result/result.html";
    }

    // 判斷性別選取
    if (genderChecked == false) {
        document.getElementById("popupMessage").innerHTML = "請選擇您的性別！";
        document.getElementById("popupBackground").style.display = "flex";
        return false;
    }
}