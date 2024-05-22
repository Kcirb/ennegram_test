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
    
    // 找出最高分者為主要人格。
    let arr = typeScore;
    let primaryTypeScore = Math.max(...arr);
    let primaryType = typeScore.indexOf(Math.max(...arr));
    
    // 生成主要人格描述
    let pT = document.getElementById("primaryType");
    let pTRole = document.createElement("p");
    pTRole.innerHTML = `您的主要人格類型為： ${descriptions[primaryType].type}(${descriptions[primaryType].role})`;
    pT.appendChild(pTRole);
    
    let pTDescription = document.createElement("p");
    pTDescription.innerHTML = descriptions[primaryType].description;
    pT.appendChild(pTDescription);
    
    // 次高分者為次要人格
    arr.splice(primaryType,1,0); // 將最高分項歸零，方便找出次高分項
    let secondaryType = typeScore.indexOf(Math.max(...arr));
    let secondaryTypeScore = Math.max(...arr);

    // 生成敘述次要人格描述
    let sT = document.getElementById("secondaryType");
    let sTRole = document.createElement("p");
    sTRole = document.createElement("p");
    sTRole.innerHTML = `您的次要人格類型為： ${descriptions[secondaryType].type}(${descriptions[secondaryType].role})`;
    sT.appendChild(sTRole);
    
    let sTDescription = document.createElement("p");
    sTDescription.innerHTML = descriptions[secondaryType].description;
    sT.appendChild(sTDescription);

    // 解釋同分情形
    if (primaryTypeScore == secondaryTypeScore){
        let lowDiscriExplain = document.createElement('p');
        lowDiscriExplain.innerHTML = '您的兩個高分人格類型的分數相同。由於本測驗為簡易版測驗，區辨人格類型的能力有限；建議您使用我們的<a href="https://meetype.com/enneagram-test">深度版九型人格測驗</a>。';
        document.getElementById('lowDiscriExplain').appendChild(lowDiscriExplain);
    }

    // 根據人格顯示圖像
    let primaryTypeImg = document.createElement('img');
    primaryTypeImg.className = "typeImg";
    primaryTypeImg.src = `../img/type${primaryType+1}.jpg`;
    document.getElementById('primaryTypeImgContainer').append(primaryTypeImg);
    
    // 根據人格顯示圖像
    let secondaryTypeImg = document.createElement('img');
    secondaryTypeImg.className = "typeImg";
    secondaryTypeImg.src = `../img/type${secondaryType+1}.jpg`;
    document.getElementById('secondaryTypeImgContainer').append(secondaryTypeImg);
    
    // 根據人格提供性格簡介連結
    let articleLinks = [
        "https://meetype.com/42751/type1-basic$0",
        "https://meetype.com/42752/type2-basic$0",
        "https://meetype.com/17/type3-basic$0",
        "https://meetype.com/20/type4-basic$0",
        "https://meetype.com/26/type5-basic$0",
        "https://meetype.com/34/type6-basic$0",
        "https://meetype.com/39/type7-basic$0",
        "https://meetype.com/41/type8-basic$0",
        "https://meetype.com/43/type9-basic$0"
    ];

    document.getElementById("primaryTypeArticle").innerHTML = `<a href=${articleLinks[primaryType]}>${descriptions[primaryType].type} 性格簡介</a>`;
    document.getElementById("secondaryTypeArticle").innerHTML = `<a href=${articleLinks[secondaryType]}>${descriptions[secondaryType].type} 性格簡介</a>`;

})();

function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
}