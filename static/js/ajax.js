import { Config } from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    fetchLigas();
    fetchCampeonatos();
});

$(document).ready(() => {
    $('#filter-value').on('keyup', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            search(searchValue);
        } else {
            console.log('No search value');
        }
    });

    $('#filter-btn').on('click', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            search(searchValue);
        } else {
            console.log('No search value');
        }
    });

    $('#reset-btn').on('click', () => {
        $('#filter-value').val('');
        resetTablesVisibility();
        fetchLigas();
        fetchCampeonatos();
    });
});

function fetchLigas() {
    fetch( Config.url + '/ligas.php')
        .then(response => response.json())
        .then(data => {
            const ligasTable = document.getElementById('ligasTable').getElementsByTagName('tbody')[0];
            ligasTable.innerHTML = '';
            data.forEach(liga => {
                const row = ligasTable.insertRow();
                row.insertCell(0).textContent = liga.id;
                row.insertCell(1).textContent = liga.name;
                row.insertCell(2).textContent = liga.year;
            });
        });
}

function fetchCampeonatos() {
    fetch(Config.url + '/campeonatos.php')
        .then(response => response.json())
        .then(data => {
            const campeonatosTable = document.getElementById('campeonatosTable').getElementsByTagName('tbody')[0];
            campeonatosTable.innerHTML = '';
            data.forEach(campeonato => {
                const row = campeonatosTable.insertRow();
                row.insertCell(0).textContent = campeonato.id;
                row.insertCell(1).textContent = campeonato.name;
                row.insertCell(2).textContent = campeonato.year;
            });
        });
}

function search(query) {
    fetch(Config.url + `/search.php?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
            resultsTable.innerHTML = '';
            document.querySelector('#resulttb').style.display = 'block';
            document.querySelector('#ligastb').style.display = 'none';
            document.querySelector('#campeonatostb').style.display = 'none';
            data.forEach(item => {
                const row = resultsTable.insertRow();
                row.insertCell(0).textContent = item.id;
                row.insertCell(1).textContent = item.name;
                row.insertCell(2).textContent = item.year;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function resetTablesVisibility() {
    document.querySelector('#resulttb').style.display = 'none';
    document.querySelector('#ligastb').style.display = 'block';
    document.querySelector('#campeonatostb').style.display = 'block';
}
