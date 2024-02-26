document.addEventListener("DOMContentLoaded", function() {

  fetch('../cards/cards.json')
    .then(response => response.json())
    .then(data => {
      let cards = data.filter(card => isInURL(card.id, window.location.href));
      if (cards.length == 0) cards = data.sort(() => Math.random() - 0.5);

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
        
        // 生成label
        const label = document.createElement('label');
        label.htmlFor = `${card.id}`;
        label.appendChild(document.createTextNode(card.adj));
        
        // 将checkbox和label添加到容器中
        checkboxShell.appendChild(checkbox);
        checkboxShell.appendChild(label);
      }
    })
    .catch(error => console.error('Error loading JSON:', error));
});

function isInURL(id, url) {
  // 如沒有指定url則使用網頁網址
  if(!url) url = window.location.href;
  var regex = new RegExp(id + '='),
      results = regex.exec(url);
  if (!results) return false;
  return true;
}
