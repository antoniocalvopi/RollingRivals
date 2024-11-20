### Instrucciones para levantar el servidor PHP y Web

#### 1. Levantar el servidor PHP:
   El servidor PHP es necesario para manejar las solicitudes en tiempo real mediante el archivo `sse.php`.

   - **Requisitos previos**:
     - Asegúrate de tener PHP instalado en tu máquina.
     - PHP debe ser accesible desde la línea de comandos.

   - **Pasos**:
     - Ve al directorio `/py_server` y ejecuta el script `php_server.py` para iniciar el servidor PHP.

     ```bash
     cd /py_server
     python run_php_server.py
     ```

     - Este script detectará automáticamente el sistema operativo y ejecutará el servidor PHP en el puerto `3000`.

     - **Notas**:
       - En **Windows**, el script ejecutará el comando `php -S localhost:3000`.
       - En **macOS** o **Linux**, intentará ejecutar `/usr/local/bin/php` (asegúrate de tener la ruta correcta de PHP en tu máquina).

     - El servidor PHP estará disponible en: [http://localhost:3000](http://localhost:3000).

#### 2. Levantar el servidor Web (Python):
   Este servidor sirve el contenido estático del proyecto en el puerto 8000.

   - **Requisitos previos**:
     - Asegúrate de tener Python 3 instalado.

   - **Pasos**:
     - Ve al directorio `/py_server` y ejecuta el script `web_server.php` para levantar el servidor Web.

     ```bash
     cd /py_server
     python web_server.py
     ```

     - Este script detectará automáticamente el sistema operativo y ejecutará el servidor Web en el puerto `8000`.

     - **Notas**:
       - En **Windows**, el script ejecutará el comando `python -m http.server`.
       - En **macOS** o **Linux**, ejecutará el comando `python3 -m http.server`.

     - El servidor Web estará disponible en: [http://localhost:8000](http://localhost:8000).

---

### Estructura de los archivos:

- **run_php_server.py**: Script para levantar el servidor PHP en el puerto `3000`.
- **web_server.py**: Script para levantar un servidor Web en el puerto `8000`.
- **/py_server**: Directorio que contiene ambos scripts para iniciar los servidores locales y sse.php.

---

### Requisitos:

- **PHP**: Necesario para ejecutar el servidor PHP y servir el archivo `sse.php`.
    - Si necesita una guía para instalarlo consulte la [documentación de instalación](/doc/instalacion-php.MD)
- **Python 3**: Necesario para ejecutar el servidor Web y servir contenido estático.

---