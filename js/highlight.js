const currentPath = window.location.pathname;  // Obtiene la ruta actual
const menuLinks = document.querySelectorAll('.cs-li-link');  // Selecciona todos los enlaces dentro de los elementos <li> con la clase .cs-li-link
menuLinks.forEach(link => {
    const linkHref = link.getAttribute('href');  // Obtiene el href de cada enlace
    // Compara la ruta actual con el href del enlace
    if (currentPath === linkHref || currentPath === linkHref.replace('.html', '') || currentPath === linkHref.replace('.html', '/') || linkHref === '/index.html' && currentPath === '/') {
        // Verifica si el enlace está dentro de una sublista o no
        const listItem = link.closest('.cs-li-link');  // Encuentra el <li> más cercano
        if (listItem) {
            listItem.classList.add('cs-selected');  // Agrega la clase al <li> que contiene el enlace
            console.log(`Se ha agregado la clase 'cs-selected' al <li> que contiene el enlace: ${link.href}`);  // Muestra en consola lo que se está modificando
        }
    }
});

