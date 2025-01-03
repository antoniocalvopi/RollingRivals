# Mejoras Implementadas / Defensa Enero

Este documento detalla las mejoras implementadas en el proyecto **Rolling Rivals**.

## Mejoras Realizadas

### Favicon
- **Descripción**: Se ha añadido un favicon para mejorar la identificación visual del sitio web.
- **Fragmento de Código**:
  ```html
  <!-- filepath: /index.html -->
  <link rel="icon" href="/img/logo.png" type="image/x-icon">
  ```

### Theme Toggle (Dark and Light Mode)
- **Descripción**: Se ha implementado un button con función "toggle" que permite a los usuarios cambiar entre el modo oscuro y claro.
- **Fragmento de Código**:
  ```html
  <!-- filepath: /index.html -->
  <button id="theme-toggle">Toggle Theme</button>
  <link id="theme-stylesheet" rel="stylesheet" href="css/light.css">
  ```
  ```javascript
  // filepath: /js/themes.js
  document.getElementById('theme-toggle').addEventListener('click', function() {
      const themeStylesheet = document.getElementById('theme-stylesheet');
      const newTheme = themeStylesheet.getAttribute('href') === 'css/light.css' ? 'css/dark.css' : 'css/light.css';
      themeStylesheet.setAttribute('href', newTheme);
  });
  ```

### Usar APIs Externas (Tiempo y Jokes)
- **Descripción**: Se han integrado dos APIs externas para mostrar información del tiempo y chistes.
- **Fragmento de Código**:
  ```javascript
  // filepath: /js/api.js
  async function fetchWeather() {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current_weather=true');
      const data = await response.json();
      console.log(data);
  }

  async function fetchJoke() {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      console.log(data);
  }

  fetchWeather();
  fetchJoke();
  ```

### Librerías Externas Importadas (CSS y JS)
- **Leaflet JS**: 
  - **Fragmento de Código**:
    ```html
    <!-- filepath: /contact.html -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    ```
- **Leaflet CSS**: 
  - **Fragmento de Código**:
    ```html
    <!-- filepath: /contact.html -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    ```
- **Font Awesome**: 
  - **Fragmento de Código**:
    ```html
    <!-- filepath: /index.html -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    ```
- **Bootstrap**: 
  - **Fragmento de Código**:
    ```html
    <!-- filepath: /index.html -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    ```
- **JQuery**: 
  - **Fragmento de Código**:
    ```html
    <!-- filepath: /index.html -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    ```

### Mis Propias Librerías CSS
- **assets.css**: 
  - **Fragmento de Código**:
    ```css
    /* filepath: /css/assets.css */
    .container {
      display: flex;
    }

    .center {
        align-items: center;
    }
    ```
- **colors.css**: 
  - **Fragmento de Código**:
    ```css
    /* filepath: /css/colors.css */
    :root {
      --primary: #0E1015;
      --primaryLight: #a72e38;
      --secondary: #ff4757;
      --secondaryLight: #a72e38;
      --headerColor: #fff;
      --bodyTextColor: #fff;
      --bodyTextColorWhite: #fff;
    }
    ```
- **modal.css**: 
  - **Fragmento de Código**:
    ```css
    /* filepath: /css/modal.css */
    .cart-modal {
      color: var(--primary);
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      overflow: auto;
      padding-top: 50px;
    }
    ```

### Mis Propias Librerías JS
- **header.js**: 
  - **Fragmento de Código**:
    ```javascript
    // filepath: /js/header.js
    // alternar el menú móvil y cambiar el estado de aria-expanded
    CShamburgerMenu.addEventListener('click', () => {
        const isActive = CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        csUL.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    ```
- **theme.js**: 
  - **Fragmento de Código**:
    ```javascript
    // filepath: /js/themes.js
    document.getElementById('theme-toggle').addEventListener('click', function() {
        const themeStylesheet = document.getElementById('theme-stylesheet');
        const newTheme = themeStylesheet.getAttribute('href') === 'css/light.css' ? 'css/dark.css' : 'css/light.css';
        themeStylesheet.setAttribute('href', newTheme);
    });
    ```
- **highlight.js**: 
  - **Fragmento de Código**:
    ```javascript
    // filepath: /js/highlight.js
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
    ```

### CSS Agregados
- **light.css**: 
  - **Fragmento de Código**:
    ```css
    /* filepath: /css/light.css */
    * {
        transition: background-color 0.5s ease, box-shadow 0.5s ease;
    }

    body {
        background-color: #ffffff;
        color: #000000 !important;
    }

    header {
        background-color: #f8f9fa;
        color: #000000 !important;
    }
    ```
- **header-right.css**: 
  - **Fragmento de Código**:
    ```css
    /* filepath: /css/header-right.css */
    .cs-ul {
      margin-left: 250px !important;
    }
    ```

### Web Desplegada en Firebase
- **Descripción**: La web ha sido desplegada en Firebase.
- **ENLACE 1**: https://rollingrivals-58e23.firebaseapp.com/
- **ENLACE 2**: https://rollingrivals-58e23.web.app/

### PHP Desplegado en Servidor privado
- **Descripción**: El servidor PHP ha sido desplegado en un laboratorio casero.
- **ENLACE**: http://88.3.219.252:3000/api/

### Librerías Propias Desplegadas en Servidor privado
- **Descripción**: Las librerías propias han sido desplegadas en un laboratorio casero.
- **ENLACE JS**: http://88.3.219.252:3000/assets/js
- **ENLACE CSS**: http://88.3.219.252:3000/assets/css

### Web Desplegada en Servidor privado
- **Descripción**: La web ha sido desplegada en un laboratorio casero.
- **ENLACE**: http://88.3.219.252:80

### Alinear Menú a la Derecha
- **Descripción**: Se ha alineado el menú a la derecha o al centro utilizando un botón de alternancia.
- **Fragmento de Código**:
  ```css
  /* filepath: /css/header-rigth.css */
  .cs-ul {
     margin-left: 250px !important;
  }
  ```

### Problemas enfrentados

- **Hosteo completo en Firebase y Google Cloud**:
  
  - **Desafío 1: Cuenta de Firebase y dominio**: 
    Al comenzar el proceso de despliegue de la web, me he encontrado con un problema relacionado con la cuenta de Firebase asociada al dominio de la universidad. En particular, no he podido crear un espacio "personalizado" en Firebase, en otras palabras que no he podido crear una carpeta o directorio dedicado donde alojar el proyecto de Single Page Web App (SPA) Rolling Rivals. 

    - **Solución**: Tras investigar y probar diferentes opciones, he decidido utilizar una cuenta que tengo destinada exclusivamente a desarrollo. Al usar esta cuenta, he podido crear un espacio específico para el proyecto sin las restricciones que impone tener una cuenta con dominio institucional. Esta solución ha sido rápida, efectiva y sencilla, permitiéndome continuar con el proceso de despliegue.

  - **Desafío 2: Archivos PHP y limitaciones de Firebase**: 
    Después de desplegar la web en Firebase, me he dado cuenta de que, como era de esperar, los archivos PHP no podían ser ejecutados directamente desde el entorno de Firebase para Hosting. Firebase, al ser una plataforma de hosting estático, no soporta la ejecución de scripts PHP del lado del servidor, lo que me creó un nuevo problema que no había tenido en cuenta inicialmente.

    - **Solución**: Para abordar este problema, he decidido integrar Google Cloud, que ofrece servicios de hosting para aplicaciones dinámicas y que sí permite ejecutar archivos PHP. Sin embargo, al intentar utilizar Google Cloud, me he encontrado con otro desafío: para poder usar los servicios de Google Cloud, era necesario vincular una tarjeta de crédito, lo que me ha generado cierta incomodidad (esto ya me ocurrido al intentar usar la api de google maps). No me gusta utilizar mis datos personales para estos servicios más allá de lo estrictamente necesario, por lo que he buscado una alternativa que me da mayor control y que no me obliga a vincular mis datos bancarios. Al final, he decidido desplegarlo en un nodo privado (al cual tengo acceso), de esta manera tengo más control, sin limite de peticiones y personalmente más entretenido.

  - **Desafío 3: Uso de un nodo privado para el despliegue**:
    Ante la incomodidad de los requerimientos de Google Cloud, como bien he indicado antes he optado por alojar la parte "dinámica" y estática de la web en un nodo privado que tengo en mi "home lab". Esta opción me proporciona más control sobre el tráfico web y los recursos disponibles, además de que elimina la preocupación de límites de solicitudes o posibles costos adicionales que pueden surgir al usar servicios de terceros como Firebase o Google Cloud(gastar los 300$, para pruebas es raro superar este limite, pero nunca se sabe).

    - **Solución**: utilizar Apache para gestionar tanto los archivos PHP como los recursos estáticos de la web (CSS, JS, etc.) en el nodo privado. He instalado y configurado Apache con las extensiones necesarias como `mod_php` para permitir la ejecución de los archivos PHP y `mod_rewrite` para gestionar las rutas de los recursos estáticos. Esta solución permite total libertad sobre el entorno de servidor y adaptarlo a las necesidades de la web y tráfico sin depender de plataformas de terceros.

  - **Desafío 4: Accesibilidad y puertos**:
    Mi nodo privado está accesible a través de una IP pública "estática" (88.3.219.252). Durante el proceso de configuración, me ha asegurado en la medidad de lo posible de que la web este organizada de manera que los recursos esten correctamente distribuidos y accesibles de forma segura. 

    - En este caso, he decidido dividir la carga entre dos puertos:
      - El **puerto 80** (HTTP) para el acceso a la web principal.
      - El **puerto 3000** para los archivos PHP (/api) y los recursos estáticos adicionales, organizados dentro de los directorios `/assets/js` y `/assets/css`.

  - **Solución en seguridad**: Para proteger este nodo privado y limitar el acceso solo a los puertos necesarios, he configurarado un firewall utilizando Uncomplicated Firewall (ufw) en la máquina virtual con apache. 
  
  Además, he implementado algunas reglas adicionales para proteger el acceso al nodo y asegurarme de que solo las solicitudes legítimas lleguen a los puertos habilitados.

  - **Resultado final**: Finalmente, la web está desplegada como una Single Page Web App (SPA) en Firebase, que aloja únicamente los recursos estáticos como HTML, CSS y JS. Y un segundo despliegue en un nodo privado, donde estan accesibles tanto los recursos php, como la web en si.