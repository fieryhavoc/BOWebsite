<?php
if (isset($_GET['json']) && $_GET['json'] === '1') {
    header('Content-Type: application/json; charset=utf-8');
    
    try {
        $tz = new DateTimeZone('Europe/Amsterdam');
        $now = new DateTime('now', $tz);
        
        echo json_encode([
            'status' => 'success',
            'now' => $now->format('d-m-Y H:i:s')
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

<h2>Datum / Tijd</h2>
<div class="tijd-info"></div>

/* anouar en mazin /