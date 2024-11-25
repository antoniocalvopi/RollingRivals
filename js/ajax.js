
// URL del servidor PHP
const serverUrl = 'http://localhost:3000/json_xml.php'; // Cambia a tu URL real

document.getElementById('getJSON').addEventListener('click', () => {
    fetchData('json');
});

document.getElementById('getXML').addEventListener('click', () => {
    fetchData('xml');
});

function fetchData(format) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${serverUrl}?format=${format}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            if (format === 'json') {
                const data = JSON.parse(xhr.responseText);
                document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            } else if (format === 'xml') {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xhr.responseText, 'application/xml');
                const teams = xmlDoc.getElementsByTagName('team');
                let result = '';
                for (let i = 0; i < teams.length; i++) {
                    const name = teams[i].getElementsByTagName('name')[0].textContent;
                    const wins = teams[i].getElementsByTagName('wins')[0].textContent;
                    const losses = teams[i].getElementsByTagName('losses')[0].textContent;
                    result += `Equipo: ${name}, Victorias: ${wins}, Derrotas: ${losses}\n`;
                }
                document.getElementById('output').textContent = result;
            }
        } else {
            document.getElementById('output').textContent = `Error: ${xhr.status}`;
        }
    };

    xhr.send();
}
