<?php
require_once("vendor/autoload.php");
require_once("config.php");

//switch ($option)
$lifx = new LIFX\Client(LIFX_KEY);

$lifx->pulseEffect(LIFX_GROUP, "#FF0000", array('period' => 1, 'cycles' => 5));

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