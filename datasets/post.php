<?php
// Получаем данные из запроса
$data = $_POST;

// Обрабатываем данные
foreach ($data as $key => $value) {
    // Здесь вы можете обработать данные как вам нужно
    echo "Ключ: $key, Значение: $value\n";
}

// Отправляем ответ обратно клиенту
echo "Данные успешно получены и обработаны";
?>