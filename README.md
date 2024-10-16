# Rolling Rivals - Carrera de Canicas (Entrega 2 / html)

## Descripción

**Rolling Rivals** es un proyecto de carrera de canicas donde los usuarios pueden seguir en "tiempo real" las actividades de los equipos, ligas, campeonatos, y estadios. Este proyecto integra diversas tecnologías HTML5 y APIs para mejorar la experiencia interactiva y dinámica del usuario, permitiendo actualizaciones en "tiempo real" (sse) y geolocalización.

---

## Estructura del Proyecto

El proyecto está compuesto por:
- **index.html**: landing page, donde se encuentra diferentes secciones como header, body(banner,ligas, galeria imagenes y download) y el footer.
- **actividades.html**: Información sobre las actividades de la carrera.
- **liga.html**: Información sobre las ligas de canicas. En esta página y las relacionadas se usará sse con php para actualizar los datos.
- **campeonatos.html**: Detalles sobre los campeonatos en curso.
- **estiadios.html**: Información sobre los estadios donde se realizan las carreras.
- **download.html**: Página de descarga el juego de carreras canicas.
- **gallery.html**: galería de vídeo e imagenes.
- **nosotros.html**: infomarción esencial sobre la web y el equipo que lo compone.
- **shop.html**: tienda de la web, se intentará implementar sse para actualizar los productos además de una pasarela sencilla de pago(a modo demo, es decir, no funcional al 100%).

### Etiquetas HTML Usadas

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

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/antoniocalvopi/RollingRivals
   ```

2. Asegúrate de tener un servidor local (Apache, XAMPP, etc.) corriendo para servir el archivo `sse.php`, necesario para las actualizaciones en tiempo real.

3. Accede al proyecto desde tu navegador.

---

## Uso

1. **Explora las actividades y carreras**: Sigue en tiempo real los eventos de Rolling Rivals.
2. **Interactúa con el mapa**: Observa tu ubicación actual y encuentra el Centro Universitario de Mérida.
3. **Administra contenido** (solo para administradores): Agrega o edita equipos, campeonatos y eventos. (feature / futurible)

---

## Créditos

- **Font Awesome** para la iconografía.
- **Leaflet** para la creación del mapa interactivo.
- **HTML5 LocalStorage** para el almacenamiento persistente de los datos de visitas.
- **Server-Sent Events (SSE)** para la actualización en tiempo real de los eventos de carreras.

---


¡Gracias por usar **Rolling Rivals**! Este proyecto ha sido creado con mucho cariño y dedicación por **Antonio Calvo**. Espero que disfrutes de la experiencia tanto como yo disfruté desarrollándolo.

---
