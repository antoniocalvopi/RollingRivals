<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$campeonato = [
    ["id" => 1, "name" => "Campeonato Nacional", "year" => 2024],
    ["id" => 2, "name" => "Campeonato Regional", "year" => 2024],
    ["id" => 3, "name" => "Campeonato Internacional", "year" => 2024],
];
echo json_encode($campeonato);
?>