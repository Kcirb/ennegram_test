(async ()=>{
    // 取得各個人格描述
    let response = await fetch('../cards/descriptions.json');
    let descriptions = await response.json();
    
    // 取得卡片資料並根據URL篩選
    response = await fetch('../cards/cards.json');
    let data = await response.json();
    
    // 取得各中心描述
    response = await fetch('../cards/centreDescriptions.json');
    let centreDescriptions = await response.json();

    // 檢查URL，計算選擇的卡片以及性別。
    let urlParams = new URLSearchParams(window.location.search);
    let cards = data.filter(card => urlParams.has(card.id));
    let gender = urlParams.get('gender');
    
    // 計算各型分數
    let typeScore = [0,0,0,0,0,0,0,0,0];
    cards.forEach(card => {
        typeScore[card.type-1]++;
    });

    // 計算三中心最高分，按照心腦腹順序
    let heart = typeScore.slice(1,4).reduce((a,b)=>a+b);
    let brain = typeScore.slice(4,7).reduce((a,b)=>a+b);
    let torso = typeScore.slice(7,8).reduce((a,b)=>a+b)+typeScore[0];
    let centre = [heart, brain, torso].indexOf(Math.max(heart, brain, torso))

    document.getElementById("centreDescriptionTitle").innerHTML = `${centreDescriptions[centre].name}`
    document.getElementById("centreDescription").innerHTML += `九型的三個中心，分別是心中心、腦中心、腹中心。這些中心分別對應於不同的內在驅力、身體位置、核心價值，以及關注點。`
    document.getElementById("centreDescription").innerHTML += `這三型中，你的分數為心中心（${heart}）、腦中心（${brain}）、腹中心（${torso}）。最高分的中心為${centreDescriptions[centre].name}。<br><br>`
    document.getElementById("centreDescription").innerHTML += `${centreDescriptions[centre].description}<br>`
    
    // 找出最高分者為主要人格。
    let arr = typeScore;
    let primaryTypeScore = Math.max(...arr);
    let primaryType = typeScore.indexOf(Math.max(...arr));
    
    // 生成主要人格描述
    let pTRole = document.createElement("p");
    pTRole.innerHTML = `${descriptions[primaryType].type} ${descriptions[primaryType].role}`;
    pTRole.className = 'typeRoleText';
    document.getElementById("primaryTypeRole").appendChild(pTRole);
    
    let pTDescription = document.createElement("p");
    pTDescription.innerHTML = descriptions[primaryType].description;
    document.getElementById("primaryTypeDescr").appendChild(pTDescription);
    
    // 次高分者為輔助人格
    arr.splice(primaryType,1,0); // 將最高分項歸零，方便找出次高分項
    let secondaryType = typeScore.indexOf(Math.max(...arr));
    let secondaryTypeScore = Math.max(...arr);
    
    // 生成敘述輔助人格描述
    let sTRole = document.createElement("p");
    sTRole.innerHTML = `${descriptions[secondaryType].type} ${descriptions[secondaryType].role}`;
    sTRole.className = 'typeRoleText';
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

    // 各人格對應顏色
    let colors = [
        "#FFA78A",
        "#99f577",
        "#99f577",
        "#99f577",
        "#D0E5E8",
        "#D0E5E8",
        "#D0E5E8",
        "#FFA78A",
        "#FFA78A"
    ]


    // 根據分數、卡片顯示主要人物圖
    let primaryTypeImg = document.createElement('img');
    primaryTypeImg.className = "typeImg";
    primaryTypeImg.src = `../img/types/type${primaryType+1}_${gender.charAt(0)}.png`;
    document.getElementById('primaryTypeImgContainer').append(primaryTypeImg);
    // 根據人格調整背景顏色
    document.getElementById('primaryTypeRole').style = `box-shadow: 0px 10px ${colors[primaryType]};`
    document.getElementById('primaryTag').style = `background-color: ${colors[primaryType]};`
    
    // 根據分數、卡片顯示輔助人物圖
    let secondaryTypeImg = document.createElement('img');
    secondaryTypeImg.className = "typeImg";
    secondaryTypeImg.src = `../img/types/type${secondaryType+1}_${gender.charAt(0)}.png`;
    document.getElementById('secondaryTypeImgContainer').append(secondaryTypeImg);
    // 根據人格調整背景顏色
    document.getElementById('secondaryTypeRole').style = `box-shadow: 0px 10px ${colors[secondaryType]};`
    document.getElementById('secondaryTag').style = `background-color: ${colors[secondaryType]};`

    // 顯示延伸閱讀以及前兩句
    document.getElementById("primaryTypeArticle").innerHTML = `<p>${descriptions[primaryType].articlePreview}<a href="${descriptions[primaryType].articleLink}"> ...繼續閱讀</a><p/>`;
    document.getElementById("secondaryTypeArticle").innerHTML = `<p>${descriptions[secondaryType].articlePreview}<a href="${descriptions[secondaryType].articleLink}"> ...繼續閱讀</a><p/>`;

})();