table = document.getElementById('myTable');
// Делегирование обработчика для полей ввода
table.addEventListener('input', fResultFilter);
// Назначение обработчиков для кнопок очистки
[...table.querySelectorAll('.header input + span')].forEach(function(el) {
  el.addEventListener('click', function(ev) {
    ev.target.previousElementSibling.value = '';
    ev.target.previousElementSibling.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

function fResultFilter(ev) {
  // Скрытие/показ кнопок очистки
  ev.target.nextElementSibling.style.transform = (ev.target.value != '') ? 'scaleX(1)' : '';
  // Получаем все строки, кроме заголовка
  let aTRs = [...table.querySelectorAll('tr:not(.header)')];
  // Получаем значения всех полей поиска
  let aSearch = [...table.querySelectorAll('th > input')];
  // Прогоняем строки через цепочку фильтров
  aTRs.filter(function(el) {
    if (el.children[0].textContent.search(new RegExp(`${aSearch[0].value}`, 'i')) < 0) {
      el.style.display = 'none';
      return false;
    } else {
      return true;
    }
  }).filter(function(el) {
    if (el.children[1].textContent.search(new RegExp(`${aSearch[1].value}`, 'i')) < 0) {
      el.style.display = 'none';
      return false;
    } else {
      return true;
    }
  }).filter(function(el) {
    if (el.children[2].textContent.search(new RegExp(`${aSearch[2].value}`, 'i')) < 0) {
      el.style.display = 'none';
      return false;
    } else {
      // Показываем только нужные строки
      el.style.display = '';
      return true;
    }
  });
}