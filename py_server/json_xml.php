<?php
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET');

// Datos aleatorios
$data = [
    ['team' => 'Equipo 1', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 2', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 3', 'wins' => rand(50, 100), 'losses' => rand(0, 50)],
    ['team' => 'Equipo 4', 'wins' => rand(50, 100), 'losses' => rand(0, 50)]
];

// Detectar si es una conexión SSE
if (isset($_GET['sse']) && $_GET['sse'] === 'true') {
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');

    while (true) {
        echo "data: " . json_encode($data) . "\n\n";
        flush();
        sleep(2); // Simula un retraso de 2 segundos entre envíos
    }
} else {
    // Obtener formato según petición (json o xml)
    $format = isset($_GET['format']) ? $_GET['format'] : 'json';

    if ($format === 'xml') {
        // Devolver datos en XML
        header('Content-Type: application/xml');
        $xml = new SimpleXMLElement('<teams/>');
        foreach ($data as $team) {
            $teamNode = $xml->addChild('team');
            $teamNode->addChild('name', $team['team']);
            $teamNode->addChild('wins', $team['wins']);
            $teamNode->addChild('losses', $team['losses']);
        }
        echo $xml->asXML();
    } else {
        // Devolver datos en JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}