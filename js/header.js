// Selección de elementos necesarios
const CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
const csUL = document.querySelector('#cs-expanded');

// Función para alternar el menú móvil y cambiar el estado de aria-expanded
CShamburgerMenu.addEventListener('click', () => {
    const isActive = CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    csUL.setAttribute('aria-expanded', isActive ? 'true' : 'false');
});

// Código para manejar el dropdown en dispositivos móviles
const dropDowns = document.querySelectorAll('#cs-navigation .cs-dropdown');

dropDowns.forEach(item => {
    item.addEventListener('click', (event) => {
        // Evita que el enlace redireccione cuando se hace clic
        event.preventDefault();
        // Alterna la clase activa en el dropdown actual
        item.classList.toggle('cs-active');
    });

    // Permite la apertura del dropdown con teclado
    item.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            item.classList.toggle('cs-active');
        }
    });
});
