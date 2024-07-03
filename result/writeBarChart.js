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
      typeScore = typeScore.map((score, type) => {return score + card.typeScore[type]});
    });
    
    typeScore.push(typeScore[0]);
    typeScore.shift(typeScore[0]);

    // 長條圖資料和設定
    let typeBarChartData = {
    labels: ['二','三','四','五','六','七','八','九','一'],
    datasets: [
      {
        label: "人格分數",
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
        borderRadius: 5
      }],
    };


  let options = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        max: 10,
        beginAtZero: true,
        grid: {
          display: false
        },
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

})();