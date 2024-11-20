// Evento para buscar al presionar 'Enter' en el campo de búsqueda
document.querySelector('.search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const searchText = this.value.toLowerCase();
        filterTable(searchText);
    }
});

// Evento para buscar al hacer clic en el botón de búsqueda
document.querySelector('.search-btn').addEventListener('click', function () {
    const searchText = document.querySelector('.search-input').value.toLowerCase();
    filterTable(searchText);
});

// Función para filtrar la tabla según el texto de búsqueda
function filterTable(searchText) {
    const rows = document.querySelectorAll('#team-info tr');
    const modalContent = document.getElementById('modal-team-info');
    const noResultsMessage = document.getElementById('no-results-message');
    const resultsTable = document.getElementById('results-table');

    // Limpiar resultados anteriores
    modalContent.innerHTML = '';
    let hasResults = false;

    // Filtrar filas que coincidan con el texto de búsqueda
    rows.forEach(row => {
        const teamName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (teamName.includes(searchText)) {
            // Clonar la fila coincidente y añadirla al modal
            modalContent.appendChild(row.cloneNode(true));
            hasResults = true;
        }
    });

    // Mostrar u ocultar elementos en el modal según haya resultados o no
    if (hasResults) {
        noResultsMessage.style.display = 'none'; // Ocultar mensaje de "sin resultados"
        resultsTable.style.display = 'table'; // Mostrar la tabla de resultados
    } else {
        noResultsMessage.style.display = 'block'; // Mostrar mensaje de "sin resultados"
        resultsTable.style.display = 'none'; // Ocultar la tabla de resultados
    }

    // Mostrar el modal en ambos casos
    document.getElementById('searchResultsModal').style.display = 'block';
}

// Cerrar el modal al hacer clic en la 'x'
document.querySelector('.close-btn').onclick = function () {
    closeModal();
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('searchResultsModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Cerrar el modal al presionar la tecla Escape
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Función para cerrar el modal y limpiar el campo de búsqueda
function closeModal() {
    document.getElementById('searchResultsModal').style.display = 'none';
    document.querySelector('.search-input').value = ''; // Limpiar el campo de búsqueda
}
