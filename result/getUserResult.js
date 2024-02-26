document.addEventListener("DOMContentLoaded", function() {
    fetch('../cards/cards.json')
    .then(response => response.json())
    .then(data => {
        let cards = data.filter(card => isInURL(card.id, window.location.href));
        let typeScore = [0,0,0,0,0,0,0,0,0];
        cards.forEach(card => {
            typeScore[card.type-1]++;
        });
        let arr = typeScore;
        const primaryType = typeScore.indexOf(Math.max(...arr))+1
        
        arr.splice(primaryType-1,1,0);
        let secondaryType = typeScore.indexOf(Math.max(...arr))+1;
        
        let pT = document.getElementById("primaryType");
        let p = document.createElement("p");
        p.innerHTML = "您的主要人格類型為：" + primaryType;
        pT.appendChild(p);

        let sT = document.getElementById("secondaryType");
        p = document.createElement("p");
        p.innerHTML = "您的次要人格類型為：" + secondaryType;
        sT.appendChild(p);
    })
    .catch(error => console.error('Error loading JSON:', error));
});

function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
}