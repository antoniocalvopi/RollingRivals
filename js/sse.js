// Crear conexión con el servidor usando SSE
const eventSource = new EventSource('http://localhost:3000/json_xml.php');

// Escuchar eventos enviados desde el servidor
eventSource.onmessage = function (event) {
    const equipos = JSON.parse(event.data);

    // Generar el HTML para actualizar la tabla
    let html = '';
    equipos.forEach((equipo, index) => {
        const partidosJugados = equipo.wins + equipo.losses;
        html += `
    <tr>
        <td>${index + 1}</td>
        <td>${equipo.team}</td>
        <td>${partidosJugados}</td>
        <td>${equipo.wins}</td>
        <td>${equipo.losses}</td>
    </tr>
`;
    });

    // Insertar el HTML en el tbody de la tabla
    document.getElementById('team-info').innerHTML = html;
};

// Manejar errores
eventSource.onerror = function (event) {
    console.error('Error en la conexión SSE:', event);
};