(async () => {
    // 取得卡片資料並根據URL篩選
    let response = await fetch('../cards/cards.json');
    let data = await response.json();

    // 透過get取得卡片
    let urlParams = new URLSearchParams(window.location.search);
    let cards = data.filter(card => urlParams.get(card.id));

    // 計算分數
    let typeScore = [0,0,0,0,0,0,0,0,0];

    cards.forEach(card => {
        typeScore[card.type-1]++;
    });
    
    typeScore.push(typeScore[0]);
    typeScore.shift(typeScore[0]);

    // 長條圖資料和設定
    let typeBarChartData = {
    labels: ['二','三','四','五','六','七','八','九','一'],
    datasets: [
      {
        label: "心中心",
        data: typeScore,
        backgroundColor: [
          'rgba(188, 233, 172)',
          'rgba(188, 233, 172)',
          'rgba(188, 233, 172)',
          'rgba(206, 230, 230)',
          'rgba(206, 230, 230)',
          'rgba(206, 230, 230)',
          'rgba(248, 171, 135)',
          'rgba(248, 171, 135)',
          'rgba(248, 171, 135)'
        ],
        borderColor: [
          'rgba(188, 233, 172)',
          'rgba(188, 233, 172)',
          'rgba(188, 233, 172)',
          'rgba(206, 230, 230)',
          'rgba(206, 230, 230)',
          'rgba(206, 230, 230)',
          'rgba(248, 171, 135)',
          'rgba(248, 171, 135)',
          'rgba(248, 171, 135)'
        ],
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false
      }],
    };

    // // 長條圖資料和設定
    // let centralBarChartData = {
    // labels: ['心中心', '腦中心', '腹中心'],
    // datasets: [{
    //     label: "您的九型人格中心分數",
    //     data: [
    //       typeScore.slice(1,4).reduce((a,b)=>a+b),
    //       typeScore.slice(4,7).reduce((a,b)=>a+b),
    //       typeScore.slice(7,8).reduce((a,b)=>a+b)+typeScore[0]
    //     ],
    //     backgroundColor: [
    //         'rgba(188, 233, 172, 0.4)',
    //         'rgba(206, 230, 230, 0.4)',
    //         'rgba(235, 64, 52, 0.4)',
    //       ],
    //       borderColor: [
    //         'rgba(188, 233, 172)',
    //         'rgba(206, 230, 230)',
    //         'rgba(235, 64, 52)',
    //       ],
    //     borderWidth: 1
    //   }],
    // };

  let options = {
    scales: {
      y: {
        max: 20,
        beginAtZero: true
      },

    },
    plugins: {
      legend: false
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

// 中心長條圖
//   const centralBarChartContainer = document.getElementById('centralBarChartCanvas');
  
//   // 創建各中心長條圖
//   const centralBarChart = new Chart(centralBarChartContainer, {
//     type: 'bar',
//     data: centralBarChartData,
//     options: options
//   });
})();