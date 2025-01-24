const currentPath = window.location.pathname; 

const menuLinks = document.querySelectorAll('.cs-li-link'); 
menuLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // console.log(currentPath)
    // console.log(linkHref)

    // Compara la ruta actual con el href del enlace
    if (currentPath === linkHref) {
        const listItem = link.closest('.cs-li-link'); 
        if (listItem) {
            listItem.classList.add('cs-selected'); 
            console.log(`Se ha agregado la clase 'cs-selected' al <li> que contiene el enlace: ${link.href}`); 
        }
    }
});