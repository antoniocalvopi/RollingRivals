export function loadHtml(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            highlightActivePage(); //actualizar menu
        })
        .catch(error => console.error(`Error al cargar ${elementId}:`, error));
}

function highlightActivePage() {
    const currentPath = window.location.pathname;  // Obtiene la ruta actual
    const menuLinks = document.querySelectorAll('nav ul li a');  // Selecciona todos los enlaces del menú

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            // Agrega la clase 'selected' al elemento padre <li> del enlace activo
            link.parentElement.classList.add('selected');
        }
    });
}