<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";

// Перевірка, чи запит здійснений методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримуємо дані з форми
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $carMake = $_POST['car_make'];
    $carModel = $_POST['car_model'];
    $services = $_POST['services'];
    $totalPrice = $_POST['total_price'];
    $utmData = $_POST['utm_data'];

    // Створюємо об'єкт PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Налаштування SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Замініть на ваш SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'yuliasolnechnaya@gmail.com';  // Ваш email
        $mail->Password = 'Solnechnaya23';  // Ваш пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Відправник і отримувач
        $mail->setFrom('your_email@example.com', 'Shell Auto');
        $mail->addAddress('recipient@example.com');  // Замість recipient@example.com ваш email для отримання листів

        // Контент листа
        $mail->isHTML(true);
        $mail->Subject = 'Нова заявка з сайту';
        $mail->Body = "<h1>Нова заявка</h1>
                        <p>Ім'я: $name</p>
                        <p>Телефон: $phone</p>
                        <p>Марка авто: $carMake</p>
                        <p>Модель авто: $carModel</p>
                        <p>Послуги: $services</p>
                        <p>Сума: $totalPrice</p>
                        <p>UTM-мітки: $utmData</p>";

        // Відправка листа
        if ($mail->send()) {
            echo 'Лист успішно відправлений';
        } else {
            echo 'Помилка при відправці листа';
        }
    } catch (Exception $e) {
        echo "Помилка: {$mail->ErrorInfo}";
    }
}
?>
