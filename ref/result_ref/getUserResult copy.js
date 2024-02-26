async function getUserResult() {
    try {
        let response = await fetch('../data/occupations.json');
        let data = await response.json();
        // 在這裡處理獲取到的資料
        
        let userResult = {
            score: [0,0,0,0,0,0],
            interestCode: [],
            occupations: [],
        };

        data.forEach(occupation => {
            if(isInURL(`${occupation.ID}`)){
                userResult.score[0] += occupation.R;
                userResult.score[1] += occupation.I;
                userResult.score[2] += occupation.A;
                userResult.score[3] += occupation.S;
                userResult.score[4] += occupation.E;
                userResult.score[5] += occupation.C;

                userResult.occupations.push(occupation.JOB);
            }
        });

        userResult.interestCode = getInterestCode(userResult.score);
        return userResult;
    } catch (error) {
        // 處理錯誤
        console.error('Error in getUserResult:', error);
    }
}

function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
}

function getInterestCode(userScore){
    let score = userScore;
    let userCodesIndex = [];
    let codes = ['R','I','A','S','E','C'];
    for(let i = 0; i<userScore.length; i++){
        let maxIndex = userScore.indexOf(Math.max(...score));
        userCodesIndex.push(maxIndex);
        score = score.filter(s => s<Math.max(...score));
    }
    console.log(userCodesIndex);
    return [codes[userCodesIndex[0]],codes[userCodesIndex[1]],codes[userCodesIndex[2]]];
}

export default getUserResult;