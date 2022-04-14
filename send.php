<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Файлы phpmailer
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail ->CharSet = 'UTF-8'; 

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$style $_POST['style'];
$message = $_POST['message'];
$age = $_POST['age'];
$file = $_FILES['myfile'];

// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2><br>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Телефон:</b> $phone<br><br>
<b>Стиль:</b> $style<br><br>
<b>Сообщение:</b><br>$message
<b>Возраст:</b><br>$age
";
$theme = "[Заявка с формы]";

// Получатель письма, если нужен ещё один, ввести отдельной строкой
$mail->addAddress('romanchik4261@mail.ru');

// Отправка сообщения
$mail->Subject = $theme;
$mail->Body = $body;
// $mail->isHTML(true);

$mail->send();



// Настройки PHPMailer
// $mail = new PHPMailer\PHPMailer\PHPMailer();
// try {
//     $mail->isSMTP();   
//     $mail->CharSet = "UTF-8";
//     $mail->SMTPAuth   = true;
//     $mail->SMTPDebug = 2;
//     $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    // $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    // $mail->Username   = 'romanchik4261'; // Логин на почте
    // $mail->Password   = 'vB5DiedbpFSwVX1fZ5zw'; // Пароль на почте
    // $mail->SMTPSecure = 'ssl';
    // $mail->Port       = 465;
    // $mail->setFrom('mail@yandex.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);