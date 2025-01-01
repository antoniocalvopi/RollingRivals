<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$query = $_GET['q'];
$results = [];

$ligas = [
    ["id" => 1, "name" => "Liga Nacional", "year" => 2024],
    ["id" => 2, "name" => "Liga Regional", "year" => 2024],
    ["id" => 3, "name" => "Liga Internacional", "year" => 2024],
    ["id" => 4, "name" => "Liga Juvenil", "year" => 2024],
];

$campeonatos = [
    ["id" => 1, "name" => "Campeonato Nacional", "year" => 2024],
    ["id" => 2, "name" => "Campeonato Regional", "year" => 2024],
    ["id" => 3, "name" => "Campeonato Internacional", "year" => 2024],
];

foreach ($ligas as $liga) {
    if (stripos($liga['name'], $query) !== false) {
        $results[] = $liga;
    }
}

foreach ($campeonatos as $campeonato) {
    if (stripos($campeonato['name'], $query) !== false) {
        $results[] = $campeonato;
    }
}

echo json_encode($results);
?>