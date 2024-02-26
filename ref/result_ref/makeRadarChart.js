import getUserResult from "./getUserResult.js";

(async () => {
  // 計算分數
  let userResult = await getUserResult();
  // console.log(userResult);

  let radarChartData = {
    labels: ['R（實用型）', 'I（研究型）', 'A（藝術型）', 'S（社會型）', 'E（企業型）', 'C（規律型）'],
    datasets: [{
        label: '您的各向度分數',
        data: userResult.score,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
    }],
  };

  // 獲取雷達圖的容器
  const radarChartContainer = document.getElementById('radarChartCanvas');
  
  // 創建雷達圖
  const radarChart = new Chart(radarChartContainer, {
    type: 'radar',
    data: radarChartData,
    options: {
      maintainAspectRatio: false,
      scale: {
        ticks: {
          beginAtZero: true,
          max: 18,
          stepSize: 3,
        }
      }
    },
  });
})();