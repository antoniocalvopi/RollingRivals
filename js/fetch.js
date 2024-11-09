document.addEventListener('DOMContentLoaded', () => {
    loadHtml('/modules/header.html', 'header');
    loadHtml('/modules/footer.html','footer');
});

function loadHtml(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error al cargar ${elementId}:`, error));
}

function highlightActivePage() {
    const currentPath = window.location.pathname;  // Obtiene la ruta actual
    const menuLinks = document.querySelectorAll('.cs-li-link');  // Selecciona todos los enlaces del menú usando la clase

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            // Verifica que el enlace esté dentro de un <li>
            const listItem = link.closest('.cs-li');  // Encuentra el <li> más cercano

            if (listItem) {
                // Si deseas agregar la clase al enlace directamente:
                link.classList.add('cs-selected');  // Agrega la clase 'cs-selected' al enlace (.cs-li-link)
                console.log(`Se ha agregado la clase 'cs-selected' al enlace: ${link.href}`);

                // Si también deseas agregar la clase al <li> para indicar el estado del contenedor:
                listItem.classList.add('cs-selected');  // Agrega la clase 'cs-selected' al contenedor <li>
                console.log(`Se ha agregado la clase 'cs-selected' al contenedor <li>: ${listItem}`);
            } else {
                console.warn(`No se encontró el <li> para el enlace: ${link.href}`);
            }
        }
    });
}
