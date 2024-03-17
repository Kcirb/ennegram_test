function selectLimit(limit){
    console.log(window.location.href.includes('ver'));
    // 預設要選20個
    if (!limit) limit = 20;

    // 取得有勾選的checkbox
    const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
    const verInp = document.getElementById('verInp');

    // 根據勾選數量判斷
    if (checkedCheckboxes.length < limit) {
        // 少於20個，取消submit，並顯示彈出畫面
        document.getElementById("popupMessage").innerHTML = "您至少需選擇20張卡牌！";
        document.getElementById("popupBackground").style.display = "flex";
        return false;

    }else if (checkedCheckboxes.length > limit){
        // 如果超過選擇數量，判斷此頁面是否有query
        if(window.location.href.includes('v1')){
            // 若有query，代表目前是第二頁，拒絕送出並顯示彈窗
            document.getElementById("popupMessage").innerHTML = "您最多只能選擇20張卡牌！";
            document.getElementById("popupBackground").style.display = "flex";
            return false;
        }
        // 若無query代表是第一頁，可以直接跳轉到第二頁。]
        verInp.value = 'v1';
        document.getElementById('mainForm').action = location.href;

    }else if (checkedCheckboxes.length == limit){
        // 如果勾選數量剛好為limit的值，直接跳到結果。
        verInp.value = 'v2';
        document.getElementById('mainForm').action = "../result/result.html";
    }
}