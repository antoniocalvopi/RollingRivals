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
                teamInfoElement.innerHTML = ''; // Limpiar la tabla antes de rellenar

                try {
                    if (contentType.includes('application/json')) {
                        // Procesar datos JSON
                        const data = JSON.parse(xhr.responseText);
                        allData = data; // Almacenar los datos globalmente
                        populateTable(data); // Llamar a la función para llenar la tabla
                    } else if (contentType.includes('application/xml')) {
                        // Procesar datos XML
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xhr.responseText, 'application/xml');
                        const teams = xmlDoc.getElementsByTagName('team');
                        const data = [];

                        // Convertir los datos XML a un formato de objeto para la tabla
                        for (let i = 0; i < teams.length; i++) {
                            data.push({
                                position: teams[i].getElementsByTagName('position')[0]?.textContent || '',
                                team: teams[i].getElementsByTagName('name')[0]?.textContent || '',
                                played: teams[i].getElementsByTagName('played')[0]?.textContent || '',
                                wins: teams[i].getElementsByTagName('wins')[0]?.textContent || '',
                                losses: teams[i].getElementsByTagName('losses')[0]?.textContent || '',
                            });
                        }

                        allData = data; // Almacenar los datos globalmente
                        populateTable(data); // Llamar a la función para llenar la tabla
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

    // Función para llenar la tabla con los datos
    function populateTable(data) {
        const teamInfoElement = document.getElementById('team-info');
        teamInfoElement.innerHTML = ''; // Limpiar la tabla antes de llenarla

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
    
    // Función para filtrar por equipo o posición
    function filterData(filterType, filterValue) {
        let filteredData = [];

        if (filterType === 'team') {
            // Filtrar por nombre del equipo
            filteredData = allData.filter((team) => team.team.toLowerCase().includes(filterValue.toLowerCase()));
        } else if (filterType === 'position') {
            // Filtrar por posición
            filteredData = allData.filter((team) => team.position == filterValue); // Comparar como número
        }

        // Mostrar los datos filtrados
        populateTable(filteredData);

        // Mensaje si no se encontraron resultados
        if (filteredData.length === 0) {
            document.getElementById('output').textContent = 'No se encontraron resultados para el filtro aplicado.';
        } else {
            document.getElementById('output').textContent = '';
        }
    }

    // Manejar el evento de filtrado
    document.getElementById('filter-btn').addEventListener('click', () => {
        const filterType = document.getElementById('filter-type').value;
        const filterValue = document.getElementById('filter-value').value; 


        if (filterValue.trim() === '') {
            // Si el campo está vacío, mostrar todos los datos
            populateTable(allData);
            document.getElementById('output').textContent = '';
        } else {
            filterData(filterType, filterValue); // Aplicar el filtro
        }
    });

    document.getElementById('filter-value').addEventListener('keyup', () => 
    {
        const filterType = document.getElementById('filter-type').value;
        const filterValue = document.getElementById('filter-value').value; 


        if (filterValue.trim() === '') {
            // Si el campo está vacío, mostrar todos los datos
            populateTable(allData);
            document.getElementById('output').textContent = '';
        } else {
            filterData(filterType, filterValue); // Aplicar el filtro
        }
    });

    // Escuchar por eventos SSE (actualizaciones en tiempo real)
    if (window.EventSource) {
        const eventSource = new EventSource(serverUrl); // La URL sin parámetros adicionales para SSE

        eventSource.onmessage = function (event) {
            try {
                const data = JSON.parse(event.data);
                allData = data; // Almacenar los datos globalmente
                populateTable(data); // Actualizar la tabla con los nuevos datos
            } catch (error) {
                console.error("Error al procesar los datos SSE: ", error);
            }
        };

        eventSource.onerror = function (error) {
            console.error("Error en la conexión SSE: ", error);
        };
    } else {
        console.log('Tu navegador no soporta SSE.');
    }
});
