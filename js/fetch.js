document.addEventListener('DOMContentLoaded', () => {
    loadHtml('/modules/header_2.html', 'header');
    //loadHtml('/modules/header.html', 'header');
    loadHtml('/modules/footer.html','footer');
    highlightActivePage();
});

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
        })
        .catch(error => console.error(`Error al cargar ${elementId}:`, error));
}

function highlightActivePage() {
    const currentPath = window.location.pathname;  // Obtiene la ruta actual
    const menuLinks = document.querySelectorAll('.cs-li-link');  // Selecciona todos los enlaces del menú usando la nueva clase

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            // Verifica si el enlace está dentro de una sublista o no
            const listItem = link.closest('.cs-li');  // Encuentra el <li> más cercano

            if (listItem) {
                listItem.classList.add('cs-active');  // Agrega la clase al <li> que contiene el enlace
            }
        }
    });
}