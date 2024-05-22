(async () => {
    // 取得卡片資料並根據URL篩選
    let response = await fetch('../cards/cards.json');
    let data = await response.json();
    let cards = data.filter(card => isInURL(card.id, window.location.href));

    // 計算分數
    let typeScore = [0,0,0,0,0,0,0,0,0];

    cards.forEach(card => {
        typeScore[card.type-1]++;
    });
    
    // 長條圖資料和設定
    let typeBarChartData = {
    labels: ['一型人','二型人','三型人','四型人','五型人','六型人','七型人','八型人','九型人'],
    datasets: [{
        label: "您的九型人格分數",
        data: typeScore,
        backgroundColor: [
            'rgba(45, 45, 45, 0.4)',
            'rgba(208, 229, 232, 0.4)',
            'rgba(208, 229, 232, 0.4)',
            'rgba(208, 229, 232, 0.4)',
            'rgba(248, 171, 135, 0.4)',
            'rgba(248, 171, 135, 0.4)',
            'rgba(248, 171, 135, 0.4)',
            'rgba(45, 45, 45, 0.4)',
            'rgba(45, 45, 45, 0.4)'
          ],
          borderColor: [
            'rgba(45, 45, 45)',
            'rgba(208, 229, 232)',
            'rgba(208, 229, 232)',
            'rgba(208, 229, 232)',
            'rgba(248, 171, 135)',
            'rgba(248, 171, 135)',
            'rgba(248, 171, 135)',
            'rgba(45, 45, 45)',
            'rgba(45, 45, 45)'
          ],
        borderWidth: 1
      }],
    };
    // 長條圖資料和設定
    let centralBarChartData = {
    labels: ['心中心', '腦中心', '腹中心'],
    datasets: [{
        label: "您的九型人格中心分數",
        data: [
          typeScore.slice(1,4).reduce((a,b)=>a+b),
          typeScore.slice(4,7).reduce((a,b)=>a+b),
          typeScore.slice(7,8).reduce((a,b)=>a+b)+typeScore[0],
        ],
        backgroundColor: [
            'rgba(208, 229, 232, 0.4)',
            'rgba(248, 171, 135, 0.4)',
            'rgba(45, 45, 45, 0.4)',
          ],
          borderColor: [
            'rgba(208, 229, 232)',
            'rgba(248, 171, 135)',
            'rgba(45, 45, 45)',
          ],
        borderWidth: 1
      }],
    };

  let options = {
    scales: {
        y: {
          beginAtZero: true
        }
    }
  }

  // 獲取長條圖的容器
  const typeBarChartContainer = document.getElementById('typeBarChartCanvas');
  
  // 創建各個人格長條圖
  const typeBarChart = new Chart(typeBarChartContainer, {
    type: 'bar',
    data: typeBarChartData,
    options: options
  });
  
  const centralBarChartContainer = document.getElementById('centralBarChartCanvas');
  
  // 創建各中心長條圖
  const centralBarChart = new Chart(centralBarChartContainer, {
    type: 'bar',
    data: centralBarChartData,
    options: options
  });
})();

function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
}