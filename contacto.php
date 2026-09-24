<?php
/**
 * contacto.php
 * Backend del formulario de contacto del portfolio de Agustín Linares.
 * Recibe los datos por POST, valida, y envía el mensaje por email vía SMTP
 * (Gmail) usando PHPMailer, porque el mail() nativo de PHP no funciona en
 * este hosting de IONOS al no existir un buzón real para el dominio.
 *
 * Requiere, en la MISMA carpeta que este archivo:
 *   - La carpeta PHPMailer/ (PHPMailer.php, SMTP.php, Exception.php)
 *   - smtp-config.php  (NO se sube al repositorio de Git; contiene la
 *     contraseña de aplicación de Gmail; ver smtp-config.example.php)
 *
 * Subir a la misma carpeta que index.html (p. ej. /agustinlinaresdev/contacto.php).
 */

header('Content-Type: application/json; charset=utf-8');

// Solo permitir peticiones desde el propio dominio.
$allowedOrigins = ['https://agustinlinares.dev', 'http://agustinlinares.dev'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'origin']);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// Honeypot anti-spam: campo oculto que un humano nunca rellena.
// Si viene relleno, respondemos "ok" sin enviar nada, para no delatar el filtro a los bots.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

// Límites de longitud sensatos.
$name    = mb_substr($name, 0, 150);
$subject = mb_substr($subject, 0, 200);
$message = mb_substr($message, 0, 5000);
if ($subject === '') {
    $subject = 'Contacto desde el portfolio';
}

$to = 'agustinlc88@gmail.com';
$mailSubject = '[Portfolio] ' . $subject;

$body  = "Nombre / Empresa: $name\n";
$body .= "Email de contacto: $email\n\n";
$body .= "Mensaje:\n$message\n";

// --- Configuración SMTP (credenciales fuera del repositorio Git) ---
$configPath = __DIR__ . '/smtp-config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config_missing']);
    exit;
}
require $configPath; // define SMTP_USERNAME, SMTP_APP_PASSWORD y, opcionalmente, DEBUG_MODE

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

$debugMode = defined('DEBUG_MODE') && DEBUG_MODE === true;

$mail = new PHPMailer(true);
try {
    // Servidor SMTP de Gmail.
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_APP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // El remitente técnico es la propia cuenta de Gmail autenticada; "Reply-To"
    // apunta al email real del visitante, para poder responderle directamente.
    $mail->setFrom(SMTP_USERNAME, 'Portfolio Agustín Linares');
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name);

    $mail->Subject = $mailSubject;
    $mail->Body    = $body;
    $mail->isHTML(false);

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    error_log('contacto.php PHPMailer error: ' . $mail->ErrorInfo);
    http_response_code(500);
    $response = ['ok' => false, 'error' => 'send_failed'];
    if ($debugMode) {
        $response['debug'] = $mail->ErrorInfo;
    }
    echo json_encode($response);
}
