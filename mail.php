<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Получаем данные из формы
  $phone = $_POST["phone"];
  //Получаем url адрес хостинга и создаем переменную from со значением from@URL
  $from = "form@" . $_SERVER['HTTP_HOST'];

  
  // Формируем сообщение
  $message = "Телефон: " . $phone;

  // Отправляем сообщение на указанный email-адрес qweqweeqwewqewqe
  $to = "panov1337.lp@gmail.com";
  //Присваемваем значение заголовку письма
  $subject = "Запрос на обратный звонок";
  //помещаем в заголовок переменную from@URL
  $headers = "From: $from";

  if (mail($to, $subject, $message, $headers)) {
    // Если сообщение отправлено успешно, возвращаем успешный статус
    $response = array("status" => "success");
  } else {
    // Если произошла ошибка при отправке сообщения, возвращаем статус с ошибкой
    $response = array("status" => "error", "message" => "Ошибка отправки сообщения");
  }

  // Возвращаем ответ в формате JSON
  header("Content-Type: application/json");
  echo json_encode($response);
  exit;
}

?>
