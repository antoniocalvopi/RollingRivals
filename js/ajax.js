document.addEventListener('DOMContentLoaded', () => {
    // URL del servidor PHP
    const serverUrl = 'http://localhost:3000/json_xml.php';

    let allData = [];

    fetchData(); 

    function fetchData(format = '') {
        const xhr = new XMLHttpRequest();
        const url = format ? `${serverUrl}?format=${format}` : serverUrl;
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const contentType = xhr.getResponseHeader('Content-Type');
                const teamInfoElement = document.getElementById('team-info');
                teamInfoElement.innerHTML = ''; // Limpiar la tabla

                try {
                    if (contentType.includes('application/json')) {
                        // Procesar datos JSON
                        const data = JSON.parse(xhr.responseText);
                        allData = data; // Almacenar los datos
                        addToTable(data); // Llamar a la función para rellenar la tabla
                    } else if (contentType.includes('application/xml')) {
                        // Procesar datos XML
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xhr.responseText, 'application/xml');
                        const teams = xmlDoc.getElementsByTagName('team');
                        const data = [];

                        // Convertir los datos XML a formato objeto
                        for (let i = 0; i < teams.length; i++) {
                            data.push({
                                position: teams[i].getElementsByTagName('position')[0]?.textContent || '',
                                team: teams[i].getElementsByTagName('name')[0]?.textContent || '',
                                played: teams[i].getElementsByTagName('played')[0]?.textContent || '',
                                wins: teams[i].getElementsByTagName('wins')[0]?.textContent || '',
                                losses: teams[i].getElementsByTagName('losses')[0]?.textContent || '',
                            });
                        }

                        allData = data;
                        addToTable(data);
                    } else {
                        document.getElementById('output').textContent = 'Formato desconocido.';
                    }
                } catch (error) {
                    document.getElementById('output').textContent = 'Error procesando los datos: ' + error.message;
                }
            } else {
                document.getElementById('output').textContent = `Error: ${xhr.status}`;
            }
        };

        xhr.onerror = function () {
            document.getElementById('output').textContent = 'Error en la conexión.';
        };

        xhr.send();
    }

    function addToTable(data) {
        const teamInfoElement = document.getElementById('team-info');
        teamInfoElement.innerHTML = ''; // Limpiar la tabla

        data.forEach((team, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${team.team}</td>
                <td>${team.wins + team.losses}</td> 
                <td>${team.wins}</td>
                <td>${team.losses}</td>
            `;
            teamInfoElement.appendChild(row);
        });
    }
    
    // Función para filtrar datos según el valor ingresado
    function filterData(filterValue) {
        const filteredData = allData.filter((team) => 
            team.team.toLowerCase().includes(filterValue.toLowerCase()) || 
            team.position == filterValue
        );

        // Mostrar los datos filtrados
        addToTable(filteredData);

        if (filteredData.length === 0) {
            document.getElementById('output').textContent = 'No se encontraron resultados para el filtro aplicado.';
        } else {
            document.getElementById('output').textContent = '';
        }
    }

    document.getElementById('filter-btn').addEventListener('click', () => {
        const filterValue = document.getElementById('filter-value').value;

        if (filterValue.trim() === '') {
            addToTable(allData);
            document.getElementById('output').textContent = '';
        } else {
            filterData(filterValue); // Aplicar el filtro
        }
    });

    document.getElementById('filter-value').addEventListener('keyup', () => {
        const filterValue = document.getElementById('filter-value').value;

        if (filterValue.trim() === '') {
            addToTable(allData);
            document.getElementById('output').textContent = '';
        } else {
            filterData(filterValue); // Aplicar el filtro
        }
    });
});
