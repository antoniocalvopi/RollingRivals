document.addEventListener('DOMContentLoaded', function () {
    const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current_weather=true'; // Coordenadas de Madrid
    const jokeApiUrl = 'https://official-joke-api.appspot.com/random_joke';

    // Obtener datos del tiempo
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            if(document.getElementById('weather-container')){
                const weatherContainer = document.getElementById('weather-container');
                const weatherInfo = `
                    <p>Tiempo actual en Madrid:</p>
                    <p>Temperatura: ${data.current_weather.temperature}°C</p>
                    <p>Viento: ${data.current_weather.windspeed} km/h</p>
                `;
                weatherContainer.innerHTML = weatherInfo;
                console.log(data);
            }
        })
        .catch(error => console.error('Error al obtener el tiempo:', error));

    // Obtener una broma aleatoria
    fetch(jokeApiUrl)
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById('joke-container');
            const jokeHtml = `
                <p>${data.setup} <strong>${data.punchline}</strong></p>
            `;
            jokeContainer.innerHTML = jokeHtml;
        })
        .catch(error => console.error('Error al obtener la broma:', error));
});