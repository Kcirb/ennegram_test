document.addEventListener("DOMContentLoaded", function() {
    let instruction = "";
    
    if (window.location.href.indexOf('?') == -1) {
        instruction = "請選擇所有符合您個人特質的卡牌。至少選擇20張。";
    }else{
        instruction = "請從您選擇的卡牌中，挑選出與您最相符的20張。";
    }

    document.getElementById('instruction').innerHTML = instruction;
});