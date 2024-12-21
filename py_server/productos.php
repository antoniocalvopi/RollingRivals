<?php
// Permitir solicitudes desde cualquier origen (puedes especificar un dominio en lugar de '*')
header('Access-Control-Allow-Origin: *');

// Si estás enviando datos POST o similares, añade estos encabezados para permitir métodos y cabeceras adicionales
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Si el método es OPTIONS, solo devolvemos una respuesta vacía con el código de estado 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
$products = [
    [
        'id' => 1,
        'name' => 'Marble Racer 1',
        'price' => 1271,
        'discount' => 1635,
        'rating' => 3.9,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 2,
        'name' => 'Marble Racer 2',
        'price' => 1057,
        'discount' => 1260,
        'rating' => 4.2,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 3,
        'name' => 'Marble Racer 3',
        'price' => 696,
        'discount' => 893,
        'rating' => 4.9,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 4,
        'name' => 'Marble Racer 4',
        'price' => 955,
        'discount' => 1306,
        'rating' => 4.1,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 5,
        'name' => 'Marble Racer 5',
        'price' => 605,
        'discount' => 742,
        'rating' => 4.6,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 6,
        'name' => 'Speed Marble 6',
        'price' => 1200,
        'discount' => 1450,
        'rating' => 4.3,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 7,
        'name' => 'Speed Marble 7',
        'price' => 1350,
        'discount' => 1600,
        'rating' => 4.5,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 8,
        'name' => 'Marble Racer 8',
        'price' => 890,
        'discount' => 1100,
        'rating' => 4.7,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 9,
        'name' => 'Marble Racer 9',
        'price' => 1050,
        'discount' => 1280,
        'rating' => 4.0,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 10,
        'name' => 'Extreme Marble 10',
        'price' => 999,
        'discount' => 1200,
        'rating' => 4.1,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 11,
        'name' => 'Marble Racer 11',
        'price' => 1130,
        'discount' => 1350,
        'rating' => 4.6,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 12,
        'name' => 'Marble Racer 12',
        'price' => 960,
        'discount' => 1150,
        'rating' => 4.8,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 13,
        'name' => 'Marble Racer 13',
        'price' => 1450,
        'discount' => 1700,
        'rating' => 4.2,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 14,
        'name' => 'Turbo Marble 14',
        'price' => 1100,
        'discount' => 1300,
        'rating' => 4.3,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 15,
        'name' => 'Turbo Marble 15',
        'price' => 1220,
        'discount' => 1450,
        'rating' => 4.5,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 16,
        'name' => 'Race Marble 16',
        'price' => 700,
        'discount' => 800,
        'rating' => 4.6,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 17,
        'name' => 'Race Marble 17',
        'price' => 850,
        'discount' => 1050,
        'rating' => 4.4,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 18,
        'name' => 'Speed Marble 18',
        'price' => 1180,
        'discount' => 1390,
        'rating' => 4.2,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 19,
        'name' => 'Speed Marble 19',
        'price' => 1340,
        'discount' => 1580,
        'rating' => 4.3,
        'image' => '../img/marble.webp'
    ],
    [
        'id' => 20,
        'name' => 'Speed Marble 20',
        'price' => 900,
        'discount' => 1150,
        'rating' => 4.8,
        'image' => '../img/marble.webp'
    ]
];

echo json_encode($products);
?>