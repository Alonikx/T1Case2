
function addRow() {
    const tbody = document.getElementById('tbody');
    const newRow = document.createElement('tr');

    const cell1 = document.createElement('td');
    cell1.innerHTML = '<button onclick="deleteRow(this)">Удалить строку</button>';
    newRow.appendChild(cell1);

    const headerCells = document.getElementById('header-row').children;
    for (let i = 1; i < headerCells.length; i++) {
        const cell = document.createElement('td');
        cell.innerHTML = '<input type="text" value="-" form="form" placeholder="Введите данные">';
        newRow.appendChild(cell);
    }

    tbody.appendChild(newRow);
}

window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'к'||event.key === 'r')) {
        event.preventDefault();
        addRow();
    }
});
function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addColumn() {
    const headerRow = document.getElementById('header-row');
    const newHeaderCell = document.createElement('th');
    const headerCells = document.getElementById('header-row').children;
    var int=0;
    for (let i = 1; i < headerCells.length; i++) {
        int++;
    }
    newHeaderCell.innerHTML = `<button style="background:none;border:none" onclick="deleteColumn(this)"><img src="./close.svg" width="16px" heigth="16px"/></button><input type="text" class="${int}" placeholder="Поиск имен.." form="false">`;
    headerRow.appendChild(newHeaderCell);
    const input = document.createElement('input');
    input.type = 'text';
    input.className = `input`;
    input.value= "Новый столбец";
    newHeaderCell.appendChild(input);

    const rows = document.getElementById('tbody').children;
    for (let i = 0; i < rows.length; i++) {
        const newCell = document.createElement('td');
        newCell.innerHTML = '<input type="text" form="form" value="-" placeholder="Введите данные">';
        rows[i].appendChild(newCell);
    }
}
window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'c'||event.key === 'с')) {
        event.preventDefault();
        addColumn();
    }
});

function deleteColumn(btn) {
    const headerRow = document.getElementById('header-row');
    const cellIndex = Array.prototype.indexOf.call(headerRow.children, btn.parentNode);
    headerRow.removeChild(headerRow.children[cellIndex]);

    const rows = document.getElementById('tbody').children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].removeChild(rows[i].children[cellIndex]);
    }
}

