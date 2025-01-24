# Dockerizar Proyecto: Servidor PHP y Servidor Web

Este documento explica cómo dockerizar el proyecto, integrando tanto el servidor PHP como el servidor Web en contenedores Docker. El objetivo es simplificar el despliegue y hacer que la aplicación sea más fácil de configurar y ejecutar en cualquier entorno.

---

## 1. **Requisitos Previos**
Antes de empezar, asegúrate de tener instalados los siguientes elementos en tu máquina:

- [Docker](https://www.docker.com/get-started): Para construir y ejecutar contenedores.
- Opcional: [Docker Compose](https://docs.docker.com/compose/): Para manejar varios contenedores con facilidad.

---

## 2. **Estructura del Proyecto para Docker**
Para dockerizar el proyecto, vamos a añadir algunos archivos al directorio raíz:

```
/
├── css/
├── js/
├── img/
├── py_server/
│   ├── run_php_server.py
│   ├── web_server.py
│   ├── sse.php
│   └── ...php
├──index.html
├── docker-compose.yml
├── Dockerfile.php
└── Dockerfile.web
```

---

## 3. **Crear los Dockerfiles**

### **3.1. Dockerfile para el Servidor PHP**
Este archivo define cómo construir el contenedor que ejecutará el servidor PHP para manejar `sse.php`.

**`Dockerfile.php`**:
```dockerfile
# Usa una imagen oficial de PHP como base
FROM php:8.2-cli

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY /py_server/ /app/

# Exponer el puerto 3000 para el servidor PHP
EXPOSE 3000

# Comando para iniciar el servidor PHP
CMD ["php", "-S", "0.0.0.0:3000"]
```

---

### **3.2. Dockerfile para el Servidor Web (Python)**
Este archivo define cómo construir el contenedor que servirá los archivos estáticos del proyecto.

**`Dockerfile.web`**:
```dockerfile
# Usa una imagen oficial de Python como base
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos estáticos al contenedor
COPY index.html /app/static/
COPY css/ /app/static/
COPY js/ /app/static/
COPY img/ /app/static/
# Exponer el puerto 8000 para el servidor Web
EXPOSE 8000

# Comando para iniciar el servidor web
CMD ["python3", "-m", "http.server", "8000"]
```

---

## 4. **Configurar Docker Compose**
Docker Compose permite definir y ejecutar múltiples contenedores en conjunto. Creamos un archivo `docker-compose.yml` para orquestar ambos servicios (PHP y Web).

**`docker-compose.yml`**:
```yaml
version: '3.9'

services:
  php-server:
    build:
      context: ./py_server
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

---

## 5. **Construir y Ejecutar los Contenedores**

### **Paso 1: Construir los Contenedores**
Ejecuta el siguiente comando en la raíz del proyecto (donde se encuentra el archivo `docker-compose.yml`):

```bash
docker-compose build
```

Esto construirá las imágenes Docker para el servidor PHP y el servidor Web.

---

### **Paso 2: Iniciar los Contenedores**
Inicia ambos contenedores usando:

```bash
docker-compose up
```

- El servidor PHP estará disponible en: [http://localhost:3000](http://localhost:3000)
- El servidor Web estará disponible en: [http://localhost:8000](http://localhost:8000)

---

## 6. **Opcional: Desplegar en un Entorno Remoto**

Si deseas desplegar el proyecto en un entorno remoto (como AWS, DigitalOcean o cualquier VPS):

1. Asegúrate de instalar Docker y Docker Compose en el servidor remoto.
2. Copia todos los archivos del proyecto al servidor remoto.
3. Sigue los mismos pasos de construcción y ejecución indicados arriba.

---

## 7. **Notas Finales**
- Si necesitas agregar variables de entorno para personalizar los servidores, puedes usar un archivo `.env` y configurar `docker-compose.yml` para leerlo.
- Puedes personalizar los puertos o rutas según tus necesidades.
- Para detener los contenedores, utiliza:
  ```bash
  docker-compose down
  ```

Con estos pasos, tu proyecto estará completamente dockerizado y listo para desplegarse en cualquier entorno con Docker.
