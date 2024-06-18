document.addEventListener("DOMContentLoaded", function() {

  fetch('../cards/cards.json')
    .then(response => response.json())
    .then(data => {
      // 檢查URL，如有卡片的id則顯示
      let urlParams = new URLSearchParams(window.location.search);

      // 打亂選項(順序為 2a、3a、4a...2b、3b、4b...)
      let rearrangedData = []
      for (let remainder = 0; remainder < 9; remainder++) {
        for (let i = 0; i < data.length; i+=10) {
          rearrangedData.push(data[i+remainder]);
        }
      }

      let cards = rearrangedData.filter(card => urlParams.has(card.id));
      // 如無query則顯示全部
      if (cards.length == 0) cards = rearrangedData;
      

      for (let i = 0; i < cards.length; i ++){
        let card = cards[i];

        const checkboxContainer = document.getElementById('checkboxContainer');
        const div = document.createElement('div');
        div.className = 'checkboxShell';
        checkboxContainer.appendChild(div);
        const checkboxShell = checkboxContainer.lastChild;
        
        // 生成checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className ='checkbox';
        checkbox.id = `${card.id}`;
        checkbox.name = card.id;
        
        checkbox.onchange = () => {
          let checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
          document.getElementById('selectCounter').innerHTML = `您目前選擇的卡片張數為：${checkedCheckboxes.length} 張`;
        }
        
        // 生成label
        const label = document.createElement('label');
        label.htmlFor = `${card.id}`;
        label.appendChild(document.createTextNode(card.adj));
        
        // 將checkbox和label添加到容器中
        checkboxShell.appendChild(checkbox);
        checkboxShell.appendChild(label);
      }
    })
    .catch(error => console.error('Error loading JSON:', error));
});