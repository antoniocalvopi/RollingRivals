document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/css/light.css';

    // Verificar el estado del tema en localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.head.appendChild(linkElement);
        toggleButton.classList.remove('fa-sun');
        toggleButton.classList.add('fa-moon');
    }

    toggleButton.addEventListener('click', function () {
        if (toggleButton.classList.contains('fa-sun')) {
            document.head.appendChild(linkElement);
            toggleButton.classList.remove('fa-sun');
            toggleButton.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.head.removeChild(linkElement);
            toggleButton.classList.remove('fa-moon');
            toggleButton.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
});