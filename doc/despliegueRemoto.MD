# Guía para Desplegar una Web con Opciones de Back-End y Front-End

## Opcion 1: Desplegar Front-End en Firebase y Back-End en un Nodo Privado

### Paso 1: Desplegar la parte estática en Firebase Hosting

1. **Instala Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```
2. **Inicia un nuevo proyecto**:
   ```bash
   firebase login
   firebase init
   ```
   - Elige **Hosting**.
   - Selecciona o crea un proyecto en Firebase.
   - Define el directorio público (generalmente `dist` o `build`).
3. **Despliega el proyecto**:
   ```bash
   firebase deploy
   ```
   Esto hará tu contenido estático accesible en una URL de Firebase Hosting.

### Paso 2: Configurar el Nodo Privado para el Back-End (PHP)

1. **Preparar un servidor Ubuntu con Apache**:

   - Instala Apache y PHP:
     ```bash
     sudo apt update
     sudo apt install apache2 php libapache2-mod-php -y
     ```
   - Verifica que Apache esté funcionando accediendo a `http://<IP_DEL_SERVIDOR>`.

2. **Subir tu código PHP**:

   - Coloca los archivos PHP en `/var/www/html/`.
   - Asegúrate de configurar los permisos:
     ```bash
     sudo chown -R www-data:www-data /var/www/html/
     sudo chmod -R 755 /var/www/html/
     ```

3. **Configurar la seguridad y puertos**:

   - Abre el puerto 80 para HTTP (o 443 para HTTPS) en el firewall:
     ```bash
     sudo ufw allow 80
     sudo ufw allow 443
     ```
   - Usa una IP estática o un dominio asociado a tu servidor. Puedes configurar un dominio en tu proveedor DNS apuntando a la IP del servidor.

4. **Asegúrate de que la parte estática en Firebase apunte al servidor PHP**:

   - Modifica los endpoints AJAX o las llamadas en tu código para apuntar a la IP estática o dominio de tu nodo privado.

---

## Opcion 2: Usar Google Cloud para Desplegar Ambos Componentes

### Paso 1: Desplegar el Front-End

1. **Crea una instancia de Google App Engine**:
   - Ve a la consola de Google Cloud y habilita App Engine.
   - Subir tu proyecto estático:
     ```bash
     gcloud app deploy
     ```

### Paso 2: Desplegar el Back-End

1. **Crea una máquina virtual (VM)**:
   - Ve a Compute Engine y crea una nueva instancia con Ubuntu Server.
   - Sigue los mismos pasos para instalar Apache y PHP que en la **Opcion 1**.
2. **Configurar comunicación entre el Front-End y Back-End**:
   - En el código de tu Front-End, apunta a la IP pública de la VM que ejecuta tu Back-End.

Nota: Asegúrate de configurar las reglas del firewall en Google Cloud para permitir acceso a los puertos 80 y 443.

---

## Opcion 3: Dockerizar la SPA y Desplegarla en un Servidor Remoto

### Paso 1: Dockerizar el Proyecto

1. *Crea los Dockerfiles* para el Servidor PHP y el Servidor Web siguiendo las instrucciones de tu documentación [dockerizar proyecto](dockerizar.MD).

   **Dockerfile para el Servidor PHP**:

   ```dockerfile
   FROM php:8.2-cli
   WORKDIR /app
   COPY /py_server/ /app/
   EXPOSE 3000
   CMD ["php", "-S", "0.0.0.0:3000"]
   ```

   **Dockerfile para el Servidor Web**:

   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY index.html /app/
   COPY pages/ /app/pages
   COPY css/ /app/css/
   COPY js/ /app/js/
   COPY img/ /app/img/
   EXPOSE 8000
   CMD ["python3", "-m", "http.server", "8000"]
   ```

2. **Configura Docker Compose para manejar ambos servicios:
   **`docker-compose.yml`**:

   ```yaml
   version: '3.9'

   services:
     php-server:
       build:
         context: .
         dockerfile: Dockerfile.php
       ports:
         - "3000:3000"

     web-server:
       build:
         context: .
         dockerfile: Dockerfile.web
       ports:
         - "8000:8000"
   ```

### Paso 2: Construir y Ejecutar los Contenedores

1. Construye los contenedores:

   ```bash
   docker-compose build
   ```

2. Inicia los contenedores:

   ```bash
   docker-compose up
   ```

   - El servidor PHP es[tará disponible en: ](http://localhost:3000)
   - El servidor Web es[tará disponible en: ](http://localhost:8000)

### Paso 3: Desplegar en un Entorno Remoto

1. Instala Docker y Docker Compose en el servidor remoto.
2. Copia los archivos del proyecto al servidor.
3. Sigue los mismos pasos para construir y ejecutar los contenedores.

---

## Opcion 4: Usar Google Drive para "Hostear" (solo para pruebas)

1. **Sube los archivos estáticos a Google Drive**.
2. **Configura el acceso público**:
   - Comparte los archivos con enlace público.
3. **Obtén el enlace directo**:
   - Usa herramientas como [DriveToWeb](https://drv.tw/) para generar enlaces directos a los archivos.

> ⚠️ Nota: Este método no es recomendado para producción, solo para pruebas rápidas.

---

## Opcion 5: Usar GitHub Pages

1. **Sube tu proyecto a GitHub**.
2. **Habilita GitHub Pages**:
   - Ve a la configuración del repositorio.
   - Activa Pages y selecciona la rama donde está el código estático.
3. **Accede al enlace generado por GitHub**.

> ℹ️ Nota: recomiendo crear una rama específica para usar github pages, ya que es posible que se deban modificar los links de los head para poder acceder en caso de usar rutas absolutas.
