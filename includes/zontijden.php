<?php
/**
 * Zontijden Module
 * Live zonsopgang en zonsondergang informatie via Open-Meteo API
 */

// Controleer voor API request
if (isset($_GET['api']) && $_GET['api'] === 'zontijden') {
    header('Content-Type: application/json; charset=utf-8');
    
    try {
        // Amsterdam coördinaten
        $latitude = 52.37;
        $longitude = 4.90;
        $today = date('Y-m-d');
        
        // Bouw API URL
        $url = sprintf(
            'https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&timezone=Europe%%2FAmsterdam&daily=sunrise,sunset&date=%s',
            $latitude,
            $longitude,
            $today
        );
        
        // Haal data op
        $response = @file_get_contents($url);
        if (!$response) {
            throw new Exception('Kan API niet bereiken');
        }
        
        $data = json_decode($response, true);
        if (!$data || !isset($data['daily']['sunrise'])) {
            throw new Exception('Ongeldig API response');
        }
        
        // Parse zonsopgang en zonsondergang (format: 2024-06-19T05:30)
        $sunrise = $data['daily']['sunrise'][0];
        $sunset = $data['daily']['sunset'][0];
        
        $sunrise_time = substr($sunrise, 11, 5);  // 05:30
        $sunset_time = substr($sunset, 11, 5);    // 21:45
        
        // Bereken daglengte
        $sunrise_obj = DateTime::createFromFormat('H:i', $sunrise_time);
        $sunset_obj = DateTime::createFromFormat('H:i', $sunset_time);
        
        if ($sunrise_obj && $sunset_obj) {
            $interval = $sunrise_obj->diff($sunset_obj);
            $daylight_hours = $interval->format('%H');
            $daylight_minutes = $interval->format('%I');
            $daylight = sprintf('%s:%s', $daylight_hours, $daylight_minutes);
        } else {
            $daylight = '12:00';
        }
        
        // Stuur response
        echo json_encode([
            'status' => 'success',
            'current_time' => date('H:i:s'),
            'sunrise' => $sunrise_time,
            'sunset' => $sunset_time,
            'daylight' => $daylight,
            'timestamp' => time()
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    
    exit;
}
?>

<h2>Zon op / onder tijden</h2>
<<<<<<< HEAD
<div class="zontijden-info">
    <div class="zontijden-tijd">Huidige tijd: <span id="zontijden-nu">--:--:--</span></div>
    <div class="zontijden-opgang">Zonsopgang: <span id="zontijden-opgang">--:--</span></div>
    <div class="zontijden-ondergang">Zonsondergang: <span id="zontijden-ondergang">--:--</span></div>
    <div class="zontijden-lengte">Daglengte: <span id="zontijden-lengte">--:--</span></div>
</div>
    <div class="zontijden-lengte">Daglengte: <span id="zontijden-lengte">--:--</span></div>
=======
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
>>>>>>> 37ee189708b8e8858da3c10638007e335f38e814
</div>