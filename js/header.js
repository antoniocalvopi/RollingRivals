const CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
const csUL = document.querySelector('#cs-expanded');

// alternar el menú móvil y cambiar el estado de aria-expanded
CShamburgerMenu.addEventListener('click', () => {
    const isActive = CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    csUL.setAttribute('aria-expanded', isActive ? 'true' : 'false');
});

// dropdown

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const dropdown = document.querySelector('.cs-dropdown');
const dropdownLink = dropdown.querySelector('.cs-li-link');
const dropdownMenu = dropdown.querySelector('.cs-drop-ul'); 
// Abrir o cerrar el dropdown al hacer clic en el enlace ("Actividades")
dropdownLink.addEventListener('click', function (event) {
    if (isMobile) {
        event.preventDefault();
        dropdown.classList.toggle('cs-active'); 
        dropdownMenu.classList.toggle('show'); 
    }
});
// Cerrar el dropdown si se hace clic fuera del menú
document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('cs-active');
        dropdownMenu.classList.remove('show');
    }
});
// Permitir la redirección cuando se haga clic en los enlaces dentro del dropdown
const dropdownItems = dropdown.querySelectorAll('.cs-drop-link');
dropdownItems.forEach(function (item) {
    item.addEventListener('click', function (event) {});
});
