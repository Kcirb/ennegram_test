document.addEventListener("DOMContentLoaded", function() {

  function isInURL(id, url) {
    // 如沒有指定url則使用網頁網址
    if(!url) url = window.location.href;
    var regex = new RegExp(id + '='),
        results = regex.exec(url);
    if (!results) return false;
    return true;
  }

  fetch('../data/occupations.json')
    .then(response => response.json())
    .then(data => {
      // 获取包含checkbox的容器
      const checkboxContainer = document.getElementById('checkboxContainer');

      // 針對json檔案的每個物件執行
      data.forEach(occupation => {
        if(isInURL(`${occupation.ID}`)){
          // 生成div
          const div = document.createElement('div');
          div.className = 'checkboxShell';
          checkboxContainer.appendChild(div);
          const checkboxShell = checkboxContainer.lastChild;
          
          // 生成checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className ='checkbox';
          checkbox.id = `${occupation.ID}`;
          checkbox.name = occupation.ID;

          // 為chekcbox 新增改變時的檢查
          checkbox.onchange = function() {
            var maxAllowed = 6;
            const checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
            
            if (checkedCheckboxes.length > maxAllowed) {
              document.getElementById("popupBackground").style.display = "flex";
              this.checked = false; // 取消當前被選中的 checkbox
            }
          }
          // 生成label
          const label = document.createElement('label');
          label.htmlFor = `${occupation.ID}`;
          label.appendChild(document.createTextNode(occupation.JOB));

          // 将checkbox和label添加到容器中
          checkboxShell.appendChild(checkbox);
          checkboxShell.appendChild(label);
        }
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});

