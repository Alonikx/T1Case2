function stolb() {
    const table = document.getElementById('myTable');
    const tbody = table.tBodies[0];
    const rows = tbody.rows;
    const columns = [];

    for (let i = 0; i < rows[0].cells.length - 1; i++) {
        columns.push([]);
    }

    for (let i = 0; i < rows.length; i++) {
        const input = rows[i].getElementsByTagName('input');
        for (let j = 0; j < input.length; j++) {
            columns[j].push(input[j].value); // Получаем значения из инпутов
        }
    }

    const columnSelect = document.getElementById('column-select');
    const selectedColumn = columnSelect.value;

    // Удаляем предыдущую диаграмму
    const ctx = document.getElementById('myChartstolb').getContext('2d');
    // if (window.chart) {
    //     window.chart.destroy();
    // }

    // Создаем диаграмму
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...new Set(columns[selectedColumn - 1])],
            datasets: [{
                label: 'Столбчатая диаграмма',
                data: [...new Set(columns[selectedColumn - 1])].map((value) => {
                    return columns[selectedColumn - 1].filter((item) => item === value).length;
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        maxRotation: 70,
                        minRotation: 70
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




function krug() {
    const table = document.getElementById('myTable');
    const tbody = table.tBodies[0];
    const rows = tbody.rows;
    const columns = [];

    for (let i = 0; i < rows[0].cells.length - 1; i++) {
        columns.push([]);
    }

    for (let i = 0; i < rows.length; i++) {
        const input = rows[i].getElementsByTagName('input');
        for (let j = 0; j < input.length; j++) {
            columns[j].push(input[j].value); // Получаем значения из инпутов
        }
    }

    const columnSelect = document.getElementById('column-select');
    const selectedColumn = columnSelect.value;

    // Удаляем предыдущую диаграмму
    const ctx = document.getElementById('myChartkrug').getContext('2d');
    // if (window.chart) {
    //     window.chart.destroy();
    // }

    // Создаем диаграмму
    window.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [...new Set(columns[selectedColumn - 1])],
            datasets: [{
                label: 'Круговая диаграмма',
                data: [...new Set(columns[selectedColumn - 1])].map((value) => {
                    return columns[selectedColumn - 1].filter((item) => item === value).length;
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function gisto() {
    const table = document.getElementById('myTable');
    const tbody = table.tBodies[0];
    const rows = tbody.rows;
    const columns = [];

    for (let i = 0; i < rows[0].cells.length - 1; i++) {
        columns.push([]);
    }

    for (let i = 0; i < rows.length; i++) {
        const input = rows[i].getElementsByTagName('input');
        for (let j = 0; j < input.length; j++) {
            columns[j].push(input[j].value); // Получаем значения из инпутов
        }
    }

    const columnSelect = document.getElementById('column-select');
    const selectedColumn = columnSelect.value;

    // Удаляем предыдущую гистограмму
    const ctx = document.getElementById('myChart').getContext('2d');
    // if (window.chart) {
    //     window.chart.destroy();
    // }

    // Создаем гистограмму
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...new Set(columns[selectedColumn - 1])],
            datasets: [{
                label: 'Гистограмма',
                data: [...new Set(columns[selectedColumn - 1])].map((value) => {
                    return columns[selectedColumn - 1].filter((item) => item === value).length;
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        maxRotation: 70,
                        minRotation: 70
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}