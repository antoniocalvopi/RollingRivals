document.addEventListener('DOMContentLoaded', () => {
    // loadHtml('/modules/header.html', 'header');
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
