import getUserResult from "./getUserResult.js";
import getDescription from "./getDescriptions.js";

(async () => {
    let userResult = await getUserResult();
    let descriptions = await getDescription();

    let interestCodesList = document.createElement('dl');
    interestCodesList.id = "interest_codes_list";
    document.getElementById('theme_code_top3').append(interestCodesList);
    
    for (let i = 0; i<3; i++){

        // let codeDescirption = descriptions[userCodesIndex[i]];
        let codeDescirption = descriptions.find((d) => d.Code == userResult.interestCode[i]);
        
        // 呈現此代碼的清單項目
        // console.log(userCodesIndex[i]);  
        let dt = document.createElement('dt');
        interestCodesList.appendChild(dt);
        dt.id = 'interest_code'+i;
        dt.innerHTML = (i+1)+ `. `+ codeDescirption.Code + `（${codeDescirption.Theme}）`;

        // 呈現此代碼描述
        let dlPersonality = document.createElement('dl');
        interestCodesList.appendChild(dlPersonality);
        dlPersonality.innerHTML = "個性優勢："+ codeDescirption.Personality;

        let dlPreference = document.createElement('dl');
        interestCodesList.appendChild(dlPreference);
        dlPreference.innerHTML = "風格偏好："+ codeDescirption.Preference;
        
        let dlAdvantage = document.createElement('dl');
        interestCodesList.appendChild(dlAdvantage);
        dlAdvantage.innerHTML = codeDescirption.Advantage;

        interestCodesList.appendChild(document.createElement('br'));
    }

    let leastInterestCode = userResult.interestCode[userResult.interestCode.length-1];
    let leastInterestCodeDescirption = descriptions.find((d) => d.Code == userResult.interestCode[userResult.interestCode.length-1]);

    let leastInterest = document.createElement('li');
    document.getElementById('theme_code_last')
        .appendChild(document.createElement('ul'))
        .appendChild(leastInterest);

    leastInterest.id = "least_interest_code";
    leastInterest.innerHTML = leastInterestCode + `（${leastInterestCodeDescirption.Theme}）`;

    
})();