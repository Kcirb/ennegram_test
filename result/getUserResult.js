(async ()=>{
    // 取得各個人格描述
    let response_des = await fetch('../cards/descriptions.json');
    let descriptions = await response_des.json();

    // 取得卡片資料並根據URL篩選
    let response = await fetch('../cards/cards.json');
    let data = await response.json();

    // 檢查URL，計算選擇的卡片以及性別。
    let urlParams = new URLSearchParams(window.location.search);
    let cards = data.filter(card => urlParams.has(card.id));
    let gender = urlParams.get('gender');
    
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
    let pTRole = document.createElement("p");
    pTRole.innerHTML = `${descriptions[primaryType].type} ${descriptions[primaryType].role}`;
    document.getElementById("primaryTypeRole").appendChild(pTRole);
    
    let pTDescription = document.createElement("p");
    pTDescription.innerHTML = descriptions[primaryType].description;
    document.getElementById("primaryTypeDescr").appendChild(pTDescription);
    
    // 次高分者為次要人格
    arr.splice(primaryType,1,0); // 將最高分項歸零，方便找出次高分項
    let secondaryType = typeScore.indexOf(Math.max(...arr));
    let secondaryTypeScore = Math.max(...arr);

    // 生成敘述次要人格描述
    let sTRole = document.createElement("p");
    sTRole.innerHTML = `${descriptions[secondaryType].type} ${descriptions[secondaryType].role}`;
    document.getElementById("secondaryTypeRole").appendChild(sTRole);
    
    let sTDescription = document.createElement("p");
    sTDescription.innerHTML = descriptions[secondaryType].description;
    document.getElementById("secondaryTypeDescr").appendChild(sTDescription);

    // 解釋同分情形
    if (primaryTypeScore == secondaryTypeScore){
        let lowDiscriExplain = document.createElement('p');
        lowDiscriExplain.innerHTML = '您的兩個高分人格類型的分數相同。由於本測驗為簡易版測驗，區辨人格類型的能力有限；建議您使用我們的<a href="https://meetype.com/enneagram-test">深度版九型人格測驗</a>。';
        document.getElementById('lowDiscriExplain').appendChild(lowDiscriExplain);
    }

    // 根據分數、卡片顯示主要人物圖
    let primaryTypeImg = document.createElement('img');
    primaryTypeImg.className = "typeImg";
    primaryTypeImg.src = `../img/types/type${primaryType+1}_${gender.charAt(0)}.png`;
    document.getElementById('primaryTypeImgContainer').append(primaryTypeImg);
    
    // 根據分數、卡片顯示次要人物圖
    let secondaryTypeImg = document.createElement('img');
    secondaryTypeImg.className = "typeImg";
    secondaryTypeImg.src = `../img/types/type${secondaryType+1}_${gender.charAt(0)}.png`;
    document.getElementById('secondaryTypeImgContainer').append(secondaryTypeImg);
    
    // 根據人格提供文章編號
    let articleLinks = ["42751", "42752", "17", "20", "26", "34", "39", "41", "43"];

    document.getElementById("primaryTypeArticle").innerHTML = `<a href=https://meetype.com/${articleLinks[primaryType]}>${descriptions[primaryType].type} 性格簡介</a>`;
    document.getElementById("secondaryTypeArticle").innerHTML = `<a href=https://meetype.com/${articleLinks[secondaryType]}>${descriptions[secondaryType].type} 性格簡介</a>`;

})();