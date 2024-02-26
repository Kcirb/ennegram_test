document.addEventListener("DOMContentLoaded", function() {

fetch('../cards/cards.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i ++){
      console.log(data[i]);
      writeCheckbox(data[i])
    }

  })
  .catch(error => console.error('Error loading JSON:', error));
});

function writeCheckbox(card){
  // console.log(job);
  const checkboxContainer = document.getElementById('checkboxContainer');
  const div = document.createElement('div');
  div.className = 'checkboxShell';
  checkboxContainer.appendChild(div);
  const checkboxShell = checkboxContainer.lastChild;
  
  // 生成checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className ='checkbox';
  checkbox.id = `${card.adj}`;
  checkbox.name = card.adj;
  
  // 生成label
  const label = document.createElement('label');
  label.htmlFor = `${card.adj}`;
  label.appendChild(document.createTextNode(card.adj));
  
  // 将checkbox和label添加到容器中
  checkboxShell.appendChild(checkbox);
  checkboxShell.appendChild(label);
}