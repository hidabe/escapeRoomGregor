<?php
require_once("vendor/autoload.php");
require_once("config.php");

$lifx = new LIFX\Client(LIFX_KEY);

$option = $_GET['option'];
switch ($option) {
    case 'off':
    break;
    case 'on':
    break;
    case 'pulseError':
        $lifx->pulseEffect(LIFX_GROUP, "#FF0000", array('period' => 1, 'cycles' => 5));
    break;
    case 'win':
    break;
    case 'lost':
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