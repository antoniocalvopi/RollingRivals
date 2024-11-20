<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET'); 

$data = [
    ['team' => 'Equipo 1', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 2', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 3', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 4', 'wins' => rand(50, 100), 'losses' => rand(0, 50)]
];

echo "data: " . json_encode($data) . "\n\n";

flush();
?>
