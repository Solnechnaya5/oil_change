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

// Підготовка повідомлення для Telegram
$telegram_message = "
🔔 *Нова заявка з форми* 🔔

👤 *Ім'я*: $name
📞 *Телефон*: $phone
🚗 *Марка авто*: $car_make
🚘 *Модель авто*: $car_model
📋 *Послуги*: $services_list
💰 *Загальна сума*: $total_price
";

// Відправка в Telegram
$telegram_token = "YOUR_TELEGRAM_BOT_TOKEN"; // Замініть на ваш токен
$telegram_chat_id = "YOUR_CHAT_ID"; // Замініть на ваш chat_id
$telegram_url = "https://api.telegram.org/bot$telegram_token/sendMessage";

$telegram_response = file_get_contents($telegram_url . "?" . http_build_query([
    "chat_id" => $telegram_chat_id,
    "text" => $telegram_message,
    "parse_mode" => "Markdown"
]));

// Завантаження шаблону листа для Email
$email_template = "template_telegram.html";
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
    $email_status = "Дані успішно відправлені на Email!";
} catch (Exception $e) {
    $email_status = "Помилка відправки Email: {$mail->ErrorInfo}";
}

// Перевірка статусу Telegram
$telegram_status = json_decode($telegram_response, true)["ok"] ? "Дані успішно відправлені в Telegram!" : "Помилка відправки в Telegram.";

// Повернення відповіді
$response = [
    "email_status" => $email_status,
    "telegram_status" => $telegram_status
];
header('Content-type: application/json');
echo json_encode($response);

?>
