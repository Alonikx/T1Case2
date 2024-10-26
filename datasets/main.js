
function addRow() {
    const tbody = document.getElementById('tbody');
    const newRow = document.createElement('tr');

    const cell1 = document.createElement('td');
    cell1.innerHTML = '<button onclick="deleteRow(this)">Удалить строку</button>';
    newRow.appendChild(cell1);

    const headerCells = document.getElementById('header-row').children;
    for (let i = 1; i < headerCells.length; i++) {
        const cell = document.createElement('td');
        cell.innerHTML = '<input type="text" placeholder="Введите данные">';
        newRow.appendChild(cell);
    }

    tbody.appendChild(newRow);
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addColumn() {
    const headerRow = document.getElementById('header-row');
    const newHeaderCell = document.createElement('th');
    newHeaderCell.innerHTML = `<button style="background:none;border:none" onclick="deleteColumn(this)"><img src="./close.svg" width="16px" heigth="16px"/></button>`;
    headerRow.appendChild(newHeaderCell);
    const input = document.createElement('input');
    input.type = 'text';
    input.value= "Новый столбец";
    newHeaderCell.appendChild(input);

    const rows = document.getElementById('tbody').children;
    for (let i = 0; i < rows.length; i++) {
        const newCell = document.createElement('td');
        newCell.innerHTML = '<input type="text" placeholder="Введите данные">';
        rows[i].appendChild(newCell);
    }
}

function deleteColumn(btn) {
    const headerRow = document.getElementById('header-row');
    const cellIndex = Array.prototype.indexOf.call(headerRow.children, btn.parentNode);
    headerRow.removeChild(headerRow.children[cellIndex]);

    const rows = document.getElementById('tbody').children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].removeChild(rows[i].children[cellIndex]);
    }
}

