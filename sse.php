<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// Simulando datos de las ligas
$data = [
    ['team' => 'Equipo 1', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 2', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 3', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 4', 'wins' => rand(50, 100), 'losses' => rand(0, 50)]
];

// Enviar datos al cliente
echo "data: " . json_encode($data) . "\n\n";

// Asegurarse de que el cliente reciba el evento
flush();
?>
