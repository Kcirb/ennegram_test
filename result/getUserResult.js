(async ()=>{
    // 取得各個人格描述
    let response_des = await fetch('../cards/descriptions.json');
    let descriptions = await response_des.json();

    // 取得卡片資料並根據URL篩選
    let response = await fetch('../cards/cards.json');
    let data = await response.json();
    let cards = data.filter(card => isInURL(card.id, window.location.href));

    // 計算分數
    let typeScore = [0,0,0,0,0,0,0,0,0];

    cards.forEach(card => {
        typeScore[card.type-1]++;
    });
    
    // 最高分者為主要人格，並生成敘述
    let arr = typeScore;
    const primaryType = typeScore.indexOf(Math.max(...arr));

    let pT = document.getElementById("primaryType");
    let pTRole = document.createElement("p");
    pTRole.innerHTML = `您的主要人格類型為： ${descriptions[primaryType].type}(${descriptions[primaryType].role})`;
    pT.appendChild(pTRole);
    
    let pTDescription = document.createElement("p");
    pTDescription.innerHTML = descriptions[primaryType].description;
    pT.appendChild(pTDescription);

    // 次高分者為次要人格，並生成敘述
    // 將最高分項歸零，方便找出次高分項
    arr.splice(primaryType,1,0);
    let secondaryType = typeScore.indexOf(Math.max(...arr));

    let sT = document.getElementById("secondaryType");
    let sTRole = document.createElement("p");
    sTRole = document.createElement("p");
    sTRole.innerHTML = `您的主要人格類型為： ${descriptions[secondaryType].type}(${descriptions[secondaryType].role})`;
    sT.appendChild(sTRole);
    
    let sTDescription = document.createElement("p");
    sTDescription.innerHTML = descriptions[secondaryType].description;
    sT.appendChild(sTDescription);


})();

function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
}