<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h2>Zon op / onder tijden</h2>
<?php
date_default_timezone_set('Europe/Amsterdam');
$date = '2026-05-19';
$timestamp = strtotime($date);
// Default coordinates (Amsterdam). Change $lat/$lon as needed.
$lat = 52.370216;
$lon = 4.895168;
$suninfo = date_sun_info($timestamp, $lat, $lon);
$sunrise = date('H:i', $suninfo['sunrise']);
$sunset = date('H:i', $suninfo['sunset']);
?>

<div class="zontijden-info">
    <p>Zonsopgang: <?php echo htmlspecialchars($sunrise, ENT_QUOTES, 'UTF-8'); ?></p>
    <p>Zonsondergang: <?php echo htmlspecialchars($sunset, ENT_QUOTES, 'UTF-8'); ?></p>
</div>