<?php
/**
 * contacto.php
 * Backend mínimo para el formulario de contacto del portfolio de Agustín Linares.
 * Recibe los datos por POST, valida, y reenvía el mensaje por email usando mail() de PHP
 * (disponible por defecto en el hosting compartido de IONOS, sin dependencias externas).
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

// El remitente técnico ("From") debe ser del propio dominio para que los servidores
// de correo no lo rechacen; "Reply-To" apunta al email real del visitante, para
// poder responderle directamente desde el cliente de correo.
$safeEmail = str_replace(["\r", "\n"], '', $email);
$headers  = "From: Portfolio Agustín Linares <no-reply@agustinlinares.dev>\r\n";
$headers .= "Reply-To: $safeEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $mailSubject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
