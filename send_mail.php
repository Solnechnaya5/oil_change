<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";

$mail = new PHPMailer(true); 
$mail->CharSet = "UTF-8"; 
$mail->IsHTML(true); 

// Зчитування даних із форми
$name = $_POST["name"];
$phone = $_POST["phone"];
$car_make = $_POST["car_make"];
$car_model = $_POST["car_model"];
$total_price = $_POST["total_price"];

// Обробка вибраних послуг
$services = [];
if (isset($_POST["changeoil"])) $services[] = "Заміна мастила";
if (isset($_POST["changefilter"])) $services[] = "Заміна фільтра";
if (isset($_POST["additional"])) $services[] = "Додаткові послуги";
$services_list = !empty($services) ? implode(", ", $services) : "Послуги не обрані";

// Завантаження шаблону листа
$email_template = "template_mail.html";
$body = file_get_contents($email_template);

// Підстановка даних у шаблон
$body = str_replace('%name%', htmlspecialchars($name), $body);
$body = str_replace('%phone%', htmlspecialchars($phone), $body);
$body = str_replace('%car_make%', htmlspecialchars($car_make), $body);
$body = str_replace('%car_model%', htmlspecialchars($car_model), $body);
$body = str_replace('%services%', htmlspecialchars($services_list), $body);
$body = str_replace('%total_price%', htmlspecialchars($total_price), $body);

// Налаштування адреси отримувача
$mail->addAddress("your-name@email.com"); /* Введіть Email отримувача */
$mail->setFrom("no-reply@yourdomain.com", "Ваш Сервіс"); /* Налаштування відправника */
$mail->Subject = "[Заявка з форми]";
$mail->MsgHTML($body);

// Перевірка та відправка листа
try {
    $mail->send();
    $message = "Дані успішно відправлені!";
} catch (Exception $e) {
    $message = "Помилка відправки: {$mail->ErrorInfo}";
}

// Повернення відповіді
$response = ["message" => $message];
header('Content-type: application/json');
echo json_encode($response);

?>
