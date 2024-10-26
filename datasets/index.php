<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интерактивная Таблица</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }

        button {
            margin-top: 10px;
        }

        body {
            min-height: 95%;
            margin: 0;
            display: flex;
            justify-content: center;
            margin-top: 10px;
            overflow: hidden;
        }
        .input {
          width: 100%;
        } 
        .content {
            position: absolute;
            display: flex;
            width: 1300px;
            height: 95%;
            flex-direction: column;
            border: 2px solid#ddd;
            border-radius: 10px;
            min-width: 1000px;
            margin-bottom: 10px;
            background-color: #fcfcfc;
            overflow-y: auto;
        }

        .table-scroll {
            overflow-x: auto;
        }
    </style>
</head>

<body>
    <div class="content">
        <h1>Интерактивная таблица</h1>
        <div id="id">
            <? include 'ajax.php' ?>
        </div>
        <div>
            <button onclick="addRow()">Добавить строку</button>
            <button onclick="addColumn()">Добавить столбец</button>
            <button onclick="ajax()">Получить данные</button>
            <button onclick="getDataFromInputs()">Получить инпуты</button>
        </div>

    </div>
</body>

<script type="text/javascript" src="main.js"></script>
<script>
function loadLog() {
        $.ajax({
            url: "ajax.php",
            cache: false,
            success: function(html) {
                $("#id").html(html);
                ajax();
            },
        });
    }
    function getDataFromInputs() {
        const tbody = document.getElementById('tbody');
        const rows = tbody.children;
        const dataList = [];

        for (let i = 0; i < rows.length; i++) {
            const inputs = rows[i].getElementsByTagName('input');
            const rowData = [];

            for (let j = 0; j < inputs.length; j++) {
                rowData.push(inputs[j].value); // Получаем значения из инпутов
            }

            dataList.push(rowData); // Добавляем данные строки в общий список
        }
        const thead = document.getElementById('thead');
        const row = thead.children;
        const rowDat = [];

        for (let i = 0; i < row.length; i++) {
            const input = row[i].getElementsByTagName('input');

            for (let j = 0; j < input.length; j++) {
                rowDat.push(input[j].value); // Получаем значения из инпутов
            }
        }
        $.ajax({
            type: "POST",
            url: 'https://zzzzz.serveo.net/submit',
            contentType: 'application/json',
            data: JSON.stringify({
                'columns': rowDat,
                'values': dataList
            }),
            success: function(data) {
            },
            error: function(xhr, status, error) {
                console.log(xhr, status, error);
            }
        });
    }
</script>

</html>