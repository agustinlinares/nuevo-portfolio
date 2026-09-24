<?php
/**
 * Plantilla de configuración SMTP para contacto.php.
 *
 * PASOS:
 *   1. Copia este archivo y renómbralo a "smtp-config.php".
 *   2. Rellena SMTP_APP_PASSWORD con una "contraseña de aplicación" de Gmail
 *      (se genera en https://myaccount.google.com/apppasswords, requiere
 *      tener la verificación en dos pasos activada en la cuenta de Google).
 *      NO es tu contraseña normal de Gmail.
 *   3. Sube smtp-config.php a IONOS, en la misma carpeta que contacto.php.
 *   4. NO subas smtp-config.php a GitHub / al repositorio (está en .gitignore).
 *      Este archivo de ejemplo sí es seguro de subir al repositorio, porque
 *      no contiene ninguna contraseña real.
 */

define('SMTP_USERNAME', 'agustinlc88@gmail.com');
define('SMTP_APP_PASSWORD', 'pega-aqui-tu-contraseña-de-aplicacion');

// Cambia a true solo temporalmente si necesitas ver el detalle técnico del
// error en la respuesta JSON al probar el formulario; vuelve a ponerlo en
// false para el uso normal en producción (no conviene exponer detalles
// internos del servidor de correo a cualquiera que use el formulario).
define('DEBUG_MODE', false);
