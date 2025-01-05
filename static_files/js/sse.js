import {Config} from './config.js'

const eventSource = new EventSource(Config.url + '/sse.php');

eventSource.onmessage = function (event) {
    const equipos = JSON.parse(event.data);

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
    document.getElementById('team-info').innerHTML = html;
};

eventSource.onerror = function (event) {
    console.error('Error en la conexión SSE:', event);
};