<div class="table-scroll">
    <div id="myform"></div>
    <table id="myTable">
        <thead id="thead">
            <tr id="header-row">
                <th style="border: none; background-color: #ffffff;"></th>
                <th>Имя</th>
                <th>Возраст</th>
            </tr>
        </thead>
        <tbody id="tbody">
            <tr>
                <td><button onclick="deleteRow(this)">Удалить строку</button>
                </td>
                <td>

                </td>
                <td>

                </td>
            </tr>
        </tbody>
    </table>

</div>
<script>
    function ajax() {
        const coll = new XMLHttpRequest();
        coll.open('GET', 'https://zzzzz.serveo.net/indexes');
        coll.onload = function() {
            const data = JSON.parse(coll.responseText);
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';
            const headerRow = document.getElementById('header-row');
            headerRow.innerHTML = '';
            const emptyCell = document.createElement('th');
            emptyCell.style.border = 'none';
            emptyCell.style.background = '#ffffff';
            headerRow.appendChild(emptyCell);
            data.forEach(function(item) {
                const cell = document.createElement('th');
                cell.innerHTML = `<button style="background:none;border:none" onclick="deleteColumn(this)"><img src="./close.svg" width="16px" heigth="16px"/></button>`;
                headerRow.appendChild(cell);
                const input = document.createElement('input');
                input.type = 'text';
                input.value = item;
                cell.appendChild(input);
            });
        };
        const date = new XMLHttpRequest();
        date.open('GET', 'https://zzzzz.serveo.net/values');
        date.onload = function() {
            const dates = JSON.parse(date.responseText);
            const form = document.getElementById('myform');
            form.innerHTML = ` <form id='form' method='POST' action=''></form>`;
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';
            var i = 0;
            dates.forEach(function(items) {
                const row = document.createElement('tr');
                tbody.appendChild(row);
                const emptyrow = document.createElement('td');
                emptyrow.innerHTML = `<button onclick="deleteRow(this)">Удалить строку</button>`;
                row.appendChild(emptyrow);
                var r = 0;
                items.forEach(function(item) {
                    const rows = document.createElement('td');
                    rows.innerHTML = `<input class='input' type='textarea' form='form' name='${r}' value='${item}'/>`;
                    row.appendChild(rows);
                    r++;
                });
                i++;
            });
        };
        try {
            coll.send();
            date.send();
        } catch (e) {
            console.log(e);
        }
    }
</script>