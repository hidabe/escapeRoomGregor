<?php
require_once("vendor/autoload.php");
require_once("config.php");

$lifx = new LIFX\Client(LIFX_KEY);

ini_set("display_errors", 1);

$option = $_GET['option'];
switch ($option) {
    case 'off':
        $lifx->setState(LIFX_GROUP, array('power' => 'on', 'color' => "#111111", 'brightness' => 0.01));
    break;
    case 'on':
        $lifx->setState(LIFX_GROUP, array('power' => 'on', 'color' => "#99FF99", 'brightness' => 0.9));
    break;
    case 'pulseError':
        $lifx->pulseEffect(LIFX_GROUP, "#FF0000", array('period' => 0.3, 'cycles' => 15));
    break;
    case 'win':
        $lifx->setState(LIFX_GROUP, array('power' => 'on', 'color' => "#FF9999", 'brightness' => 1));
        $lifx->pulseEffect(LIFX_GROUP, "#DDAAAA", array('period' => 2, 'cycles' => 50));
    break;
    case 'lost':
        $lifx->pulseEffect(LIFX_GROUP, "#FF0000", array('period' => 0.2, 'cycles' => 50));
    break;
}

/**
$result = $lifx->breatheEffect('group:Estudio', "#66FF66", array(
    'from_color' => "#99AA99",
    'period' => 15,
    'cycles' => 60
));

echo '<pre>';
print_r($result);
echo '</pre>';
**/


?>