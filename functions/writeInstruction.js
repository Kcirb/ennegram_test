document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    
    // 根據頁數顯示指導
    let instruction = (urlParams.get('ver') == 'v1')? "請從您選擇的卡牌中，挑選出與您最相符的20張。":"請選擇所有符合您個人特質的卡牌。至少選擇20張。";

    document.getElementById('instruction').innerHTML = instruction;
});