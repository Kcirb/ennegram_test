import getUserResult from "./getUserResult.js";

(async () => {
    let userResult = await getUserResult();
    let response = await fetch('../data/occupations.json');
    let jobs = await response.json();
    
    let fittingJobs = getFittingJobs(jobs, userResult.interestCode.slice(0,3).join(''), 10);

    let top10_jobs_list = document.createElement('ol');
    top10_jobs_list.id = 'top10_jobs_list';
    document.getElementById("top10_jobs").appendChild(top10_jobs_list);
    
    for (let i = 0; i < fittingJobs.length; i ++){
        let li = document.createElement('li');
        li.innerHTML = fittingJobs[i].JOB + `（${fittingJobs[i].CODE}）`;
        top10_jobs_list.appendChild(li)
    }
    
    let last10_jobs = getFittingJobs(jobs, userResult.interestCode.slice(3).reverse().join(''), 10);

    let last10_jobs_list = document.createElement('ol');
    last10_jobs_list.id = 'last10_jobs_list';
    document.getElementById("theme_code_last").appendChild(last10_jobs_list);
    
    for (let i = 0; i < last10_jobs.length; i ++){
        let li = document.createElement('li');
        li.innerHTML = last10_jobs[i].JOB + `（${last10_jobs[i].CODE}）`;
        last10_jobs_list.appendChild(li)
    }

})();

function getFittingJobs(jobs, code, jobCount){
    let fittingJobs = [];
    let targetCode = code;
    // console.log(userResult.interestCode)
    for (let i = 0; i < jobs.length && fittingJobs.length < jobCount; i++) {
        let job = jobs[i];
    
        if (job.CODE === targetCode) {
            fittingJobs.push(job);
        }
    }
    
    // 如果還沒找到足夠數量的項目，則尋找兩碼相同的項目
    if (fittingJobs.length < jobCount) {
        for (let i = 0; i < jobs.length && fittingJobs.length < 10; i++) {
            let job = jobs[i];
    
            if (job.CODE.slice(0, 2) === targetCode.slice(0, 2) && !fittingJobs.includes(job)) {
                fittingJobs.push(job);
            }
        }
    }
    
    if (fittingJobs.length < jobCount) {
        for (let i = 0; i < jobs.length && fittingJobs.length < 10; i++) {
            let job = jobs[i];
    
            if (job.CODE.charAt(0) === targetCode.charAt(0) && !fittingJobs.includes(job)) {
                fittingJobs.push(job);
            }
        }
    }

    return fittingJobs;
}