# Proyecto Rolling Rivals

## Descripción del Proyecto

Rolling Rivals es una plataforma web diseñada para gestionar y visualizar información sobre ligas y campeonatos deportivos. La plataforma permite a los usuarios buscar y filtrar información sobre diferentes ligas y campeonatos, así como ver detalles específicos de cada uno.

## Estructura del Proyecto

El proyecto está organizado en varios directorios y archivos que se describen a continuación:

### Directorios Principales

- **assets**: Contiene archivos estáticos como imágenes, fuentes y archivos JavaScript.
- **css**: Contiene archivos CSS para el estilo de la aplicación.
- **js**: Contiene archivos JavaScript para la funcionalidad de la aplicación.
- **pages**: Contiene las páginas HTML de la aplicación.

### Archivos Principales

#### `assets`

- **dist/js/bootstrap.bundle.min.js**: Archivo JavaScript de Bootstrap para funcionalidades de la interfaz de usuario.

#### `css`

- **styles.css**: Archivo CSS principal que contiene los estilos generales de la aplicación.
- **search.css**: Archivo CSS específico para los estilos de la funcionalidad de búsqueda.
- **header.css**: Archivo CSS específico para los estilos del encabezado de la aplicación.
- **footer.css**: Archivo CSS específico para los estilos del pie de página de la aplicación.
- **galeria_estadios.css**: Archivo CSS específico para los estilos de la galería de estadios.

#### `js`

- **header.js**: Archivo JavaScript para la funcionalidad del encabezado.
- **contador.js**: Archivo JavaScript para la funcionalidad del contador.
- **ajax.js**: Archivo JavaScript para las solicitudes AJAX y la manipulación del DOM.
- **highlight.js**: Archivo JavaScript para resaltar el enlace activo en la navegación.

#### `pages`

- **index.html**: Página principal de la aplicación.
- **nosotros.html**: Página de información sobre el equipo o la organización.
- **actividades.html**: Página que muestra las actividades, incluyendo ligas y campeonatos.
- **download.html**: Página para descargar la aplicación.
- **contact.html**: Página de contacto.
- **shop.html**: Página de la tienda.
- **gallery.html**: Página de la galería.

### Funcionalidades Principales

#### Búsqueda y Filtrado

La aplicación permite a los usuarios buscar y filtrar información sobre ligas y campeonatos. Esto se logra mediante el uso de AJAX para realizar solicitudes a un servidor y actualizar dinámicamente el contenido de la página.

#### Navegación

La navegación de la aplicación incluye un menú desplegable que se adapta a diferentes tamaños de pantalla, proporcionando una experiencia de usuario fluida tanto en dispositivos móviles como en escritorio.

#### Resaltado de Enlace Activo

El enlace activo en la navegación se resalta automáticamente para indicar al usuario en qué sección de la aplicación se encuentra.

### Ejemplo de Código

#### `ajax.js`

```javascript
document.addEventListener('DOMContentLoaded', function () {
    fetchLigas();
    fetchCampeonatos();
    resetTablesVisibility();
});

$(document).ready(() => {
    $('#filter-value').on('keyup', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            search(searchValue);
        } else {
            resetTablesVisibility();
            fetchLigas();
            fetchCampeonatos();
        }
    });

    $('#filter-btn').on('click', () => {
        const searchValue = $('#filter-value').val();
        if (searchValue) {
            search(searchValue);
        } else {
            resetTablesVisibility();
            fetchLigas();
            fetchCampeonatos();
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
    fetch('http://localhost:3000/ligas.php')
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function fetchCampeonatos() {
    fetch('http://localhost:3000/campeonatos.php')
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function search(query) {
    fetch(`http://localhost:3000/search.php?q=${query}`)
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
```