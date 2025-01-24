<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$ligas = [
    ["id" => 1, "name" => "Liga Nacional", "year" => 2024],
    ["id" => 2, "name" => "Liga Regional", "year" => 2024],
    ["id" => 3, "name" => "Liga Internacional", "year" => 2024],
    ["id" => 4, "name" => "Liga Juvenil", "year" => 2024],
];

echo json_encode($ligas);
?>