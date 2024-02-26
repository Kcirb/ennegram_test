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
    let score = userScore.slice();
    let userCodes = [];
    let codes = ['R','I','A','S','E','C'];

    for(let i = 0; i < userScore.length; i++){
        // 當前的值是score裡的最大值。
        let cur = Math.max(...score);
        // 如果codes中已經有當前分數，代表有重複，因此向下尋找。
        if (userCodes.includes(codes[userScore.indexOf(cur)])){
            userCodes.push(codes[userScore.indexOf(cur, userScore.indexOf(cur)+1)]);
        }else userCodes.push(codes[userScore.indexOf(cur)]);
        score.splice(score.indexOf(cur),1);
    }

    return userCodes;
}

export default getUserResult;