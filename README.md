# Rolling Rivals - Carrera de Canicas (Parte práctica PyWD - Unex)
[![Ver Demo](https://img.shields.io/badge/Ver_Demo-Click_Here-brightgreen)](https://antoniocalvopi.github.io/RollingRivals/)
[![Instalar](https://img.shields.io/badge/Instalar-Click_Here-blue)](/doc/instrucciones-levantar-servidor.MD)
[![Star](https://img.shields.io/github/stars/usuario/repositorio?style=social)](https://github.com/antoniocalvopi/RollingRivals)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Tabla de Contenidos
- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Etiquetas HTML Usadas](#etiquetas-html-usadas)
- [Iconografía](#iconografía)
- [APIs HTML5 Usadas](#apis-html5-usadas)
- [Instalación](#instalación)
- [PHP](#php)
- [Uso](#uso)
- [FAQ](#faq---preguntas-frecuentes)
- [Créditos](#créditos)

## Descripción

**Rolling Rivals** es un proyecto de carrera de canicas donde los usuarios pueden seguir en "tiempo real" las actividades de los equipos, ligas, campeonatos, y estadios. Este proyecto integra diversas tecnologías HTML5 y APIs para mejorar la experiencia interactiva y dinámica del usuario, permitiendo actualizaciones en "tiempo real" (sse) y geolocalización. Este proyecto se ha creado con el objetivo de completar la parte práctica de la Asignatura de Diseño y Programación Web (DyPW) del grado de Ingeniería Informática de la Unex.

---

## Estructura del Proyecto

```plaintext
├── CSS/             # Contiene los css del proyecto
├── img/             # Contiene las imagenes del proyecto
├── js/              # Contiene los scripts del proyecto
├── pages/           # Contiene las páginas del proyecto
├── py_server/       # Contiene recursos necesarios para levantar servidor php y web.
├── index.html       # Página principal del proyecto
├── doc/             # Toda la documentación "necesaria" para entender y continuar el desarrollo del proyecto.
├── LICENSE          # Licencia del proyecto
├── CODE_OF_CONDUCT.md # Código de conducta del proyecto
├── CONTRIBUTING.md  # Contribución del proyecto
└── README.md        # Readme del proyecto
```

## Etiquetas HTML Usadas

- **`<section>`**: Para organizar el contenido de actividades, ligas, campeonatos, estadios..etc.
- **`<h1>, <h2>, <h3>`**: Para los títulos de las secciones.
- **`<div>`**: Para organizar los contenedores de contenido.
- **`<img>`**: Para mostrar imágenes y miniaturas de los videos.
- **`<button>`**: Para los botones interactivos en las páginas.
- **`<ul>, <li>`**: Listas usadas en los navbar, header y footer.
- **`<form>, <input>, <button>`**: usado principalmente en formulario de contacto.
- **`<iframe>`**: usado para embeber videos en la web.

---

## Iconografía

Se usa **Font Awesome** para añadir iconografía a la página y mejorar la visualización de los iconos de redes sociales entre otros.

### Cómo agregar Font Awesome al proyecto

Para integrar **Font Awesome**, simplemente incluye el siguiente enlace en el `<head>` de tu archivo HTML:

```html
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
```

Este enlace permite el uso de los íconos de Font Awesome sin necesidad de descargar nada adicional. A partir de ahí, podrás utilizar los iconos en el proyecto de la siguiente manera:

```html
<i class="fab fa-facebook-f"></i> <!-- Icono de Facebook -->
<i class="fab fa-twitter"></i>    <!-- Icono de Twitter -->
<i class="fab fa-instagram"></i>  <!-- Icono de Instagram -->
```

---

## APIs HTML5 Usadas

### 1. **Geolocalización y Mapa con Leaflet**

En la de contacto, se incluye un mapa interactivo utilizando la biblioteca **Leaflet**. Las características del mapa incluyen:

- **Marcador de la ubicación actual del usuario**: Se obtiene la posición actual del cliente usando la API de **Geolocalización** de HTML5.
- **Marcador del Centro Universitario de Mérida**: La ubicación del Centro Universitario se muestra en el mapa como un punto de referencia.
- **Ruta para llegar al centro**: Se traza una ruta entre la ubicación actual del usuario y el Centro Universitario de Mérida.

### 2. **Contador de Visitas con LocalStorage**

Cada usuario tiene un **contador de visitas** persistente, almacenado localmente en su navegador usando **LocalStorage**. Este contador:

- Guarda el número de veces que un usuario ha visitado la página.
- Se actualiza cada vez que el usuario vuelve a la página, permitiendo un seguimiento individual.

### 3. **Server-Sent Events (SSE) para Actualizaciones en Tiempo Real**

La información sobre las actividades, ligas, campeonatos y estadios se actualiza en tiempo real desde un servidor PHP utilizando **Server-Sent Events (SSE)**. Esto permite que los usuarios reciban:

- **Actualizaciones automáticas** de los eventos sin necesidad de recargar la página.
- Información sobre los equipos y resultados de las carreras en "vivo".

---

## Instalación
#### Opción 1:
1. **Clona el repositorio en tu máquina local**:
   ```bash
   git clone https://github.com/antoniocalvopi/RollingRivals
   ```

2. **Asegúrate de tener un servidor local (Apache, XAMPP, etc.) corriendo para servir el archivo `sse.php`**, necesario para las actualizaciones en tiempo real.

3. **Accede al proyecto desde tu navegador**.

#### Opción 2:
1. **Uso de recursos proporcionados en el directorio `/py_server`**:
   Para ejecutar los servidores de PHP y Web localmente, puedes usar los scripts proporcionados en el directorio `/py_server`. Los pasos para iniciarlos se describen en la [documentación](/doc/).

---

## PHP

### Explicación del código PHP

Este archivo PHP actúa como un servidor de *Server-Sent Events* (SSE) que envía datos dinámicamente a los clientes conectados.

1. **Encabezados HTTP**:
   - `header('Content-Type: text/event-stream')`: Establece el tipo de contenido a "event-stream", lo que indica que se enviarán eventos a través de SSE.
   - `header('Cache-Control: no-cache')`: Deshabilita la caché del navegador para asegurar que los clientes siempre reciban los datos.

2. **Generación de datos simulados**:
   - Se crea un array `$data` con información de varios equipos, donde cada equipo tiene un número aleatorio de victorias (`wins`) y derrotas (`losses`) generadas por la función `rand()`.

3. **Envío de los datos al cliente**:
   - `echo "data: " . json_encode($data) . "\n\n";`: Convierte el array de datos en un formato JSON y lo envía al cliente precedido de la etiqueta `data:`. El formato SSE requiere que los eventos se envíen en esta estructura específica.

4. **Flush de datos**:
   - `flush();`: Envía todos los datos del buffer de salida al cliente, asegurando que este reciba la información inmediatamente.

Este script se ejecuta en un servidor privado, en caso de fallo en el src del proyecto se encuenta el .php para poder alojarlo.

### **Errores Comunes**:

1. **Conexión a través de Eduroam**:
   - Al utilizar la red Eduroam, es posible que se produzcan errores de conexión, ya que dicha red puede bloquear el acceso a servidores no reconocidos o dominios desconocidos. Esto puede impedir el correcto funcionamiento del acceso al archivo PHP necesario para Server-Sent Events (SSE). Esto solo sucede en caso de tener desplegado los ficheros php en un servidor de "terceros" privado(accesible desde una ip "estática" y un puerto configurado).

2. **Errores de Conexión con SSE**:
   - En algunas ocasiones, la página puede mostrar un mensaje de "Error de conexión con SSE", aunque el contenido generado por el archivo PHP se muestre correctamente. Esto puede deberse a problemas temporales en la comunicación o en la configuración de SSE.

---

## Uso

1. **Explora las actividades y carreras**: Sigue en "tiempo real" los eventos de Rolling Rivals.
2. **Interactúa con el mapa**: Observa tu ubicación actual y encuentra el Centro Universitario de Mérida.
3. **Administra contenido** (solo para administradores): Agrega o edita equipos, campeonatos y eventos. (feature / futurible) - Para este futurible sería adecuado implementar un backend y agregar opción de login, pero esto perdería la esencia de Single Web Aplication (SPA).

---

## Créditos

- **Font Awesome** para la iconografía.
- **Leaflet** para la creación del mapa interactivo.
- **HTML5 LocalStorage** para el almacenamiento persistente de los datos de visitas.
- **Server-Sent Events (SSE)** para la actualización en tiempo real de los eventos de carreras.
- ...

---

## FAQ - Preguntas Frecuentes

1. ¿Cómo probar el proyecto?

    Para probar el proyecto sigue los pasos de la sección de este README [instalación](#instalación)

2. ¿Qué hacer si encuentro un error de SSE en la consola de desarrollador del navegador?
    Es común olvidar levantar el servidor php para consumir los php disponibles en el directorio [py_server](py_server/).
    Para solucionar este problema solo es necesario seguir los pasos en la sección de este README [instalación](#instalación).

    Si surge otro problema no relacionado con la instalación de php y servir los ficheros .php consulta los [errores comunes](#errores-comunes) o puedes abrir una [discusión](https://github.com/antoniocalvopi/RollingRivals/discussions) o crear una [issue](https://github.com/antoniocalvopi/RollingRivals/issues) en el repositorio.

3. ¿Cómo puedo contribuir con le  proyecto?

    Para contribuir al proyecto sigue los pasos de [contribución](CONTRIBUTING.md)

4. ¿Cómo puedo usar el proyecto?

    - *Contribución*: para usar el proyecto puedes [contribuir](CONTRIBUTING.md).
    - Uso *personal* o *comercial*: para uso personal o incluso comercial lee en detalle la [licencia](LICENSE) que acoje el proyecto.

5. ¿Cómo puedo desplegar el proyecto?

    Para desplegar el proyecto dispones de documentación relacionada.
    - Para despleguer localmente aquí te proporciono una guía con recursos disponibles en este proyecto para servir los recursos estáticos y php. [levantar servidor](doc/instrucciones-levantar-servidor.MD)
    - Si deseas desplegarlo para acceder fuera de tu red local [aquí](doc/despliegueRemoto.MD) te proporciono instrucciones de como desplegarlo de diversas formas de forma "gratuita".

6. ¿Se puede dockerizar la aplicación web?

    Para dockerizar la web, los ficheros para levantar los recursos estáticos disponibles en [py_server](py_server/) facilitan mucho el proceso.

    En la documentación [docker](doc/dockerizar.MD) se explica en detalle como relizarlo.

    En la rama de [producción](https://github.com/antoniocalvopi/RollingRivals/tree/production) dispones de ejemplos funcionales de los Dockerfiles y docker-compose.

---

¡Gracias por usar **Rolling Rivals**! Este proyecto ha sido creado con mucho 💖 y dedicación por [**Antonio Calvo**](https://github.com/antoniocalvopi). Espero que disfrutes de la experiencia tanto como yo disfruté desarrollándolo 🧑‍💻.

Si este proyecto te resulta útil o simplemente te gusta, considera apoyarlo dejando una ⭐ en el repositorio de GitHub.
¡Tu apoyo ayuda a que siga creciendo y mejorando! 🚀

👉 [Deja tu estrella aquí](https://github.com/antoniocalvopi/RollingRivals)
