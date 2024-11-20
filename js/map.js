// Inicializar el mapa
var map = L.map('map').setView([38.90716314833059, -6.3383329949405285], 13); // centrar la vista en el centro Universitario de Merida
                
// Capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Coordenadas del marcador estático (unex)
var staticLocation = [38.90716314833059, -6.3383329949405285];

// Añadir el marcador estático
var staticMarker = L.marker(staticLocation).addTo(map)
    .bindPopup("Ubicación de la empresa")
    .openPopup();

// Intentar obtener la ubicación actual del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = [position.coords.latitude, position.coords.longitude];

        // Centrar el mapa en la ubicación del usuario
        map.setView(userLocation, 13);

        // Añadir un marcador en la ubicación del usuario
        var userMarker = L.marker(userLocation).addTo(map)
            .bindPopup("Estás aquí")
            .openPopup();
    
        // Crear la ruta desde la ubicación del usuario hasta el marcador estático
        L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(staticLocation[0], staticLocation[1])
            ],
            routeWhileDragging: true
        }).addTo(map);
    }, function() {
        alert("No se pudo obtener tu ubicación.");
    });
} else {
    alert("La geolocalización no es compatible con tu navegador.");
}