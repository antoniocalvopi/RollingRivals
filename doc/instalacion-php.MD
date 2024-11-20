# Instalación de PHP para RollingRivals

Este archivo proporciona las instrucciones necesarias para instalar y configurar PHP en tu sistema para levantar el servidor PHP en el proyecto **RollingRivals** según la [documentación](/doc/instrucciones-levantar-servidor.MD) para levantar servidor php.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes elementos instalados:

- **Sistema operativo**: Windows, macOS o Linux.
- **PHP**: Debes tener PHP instalado en tu sistema.

### 1. **Instalar PHP**

#### En **Windows**:

1. **Descargar PHP**:
   - Ve al sitio oficial de PHP: [https://windows.php.net/download/](https://windows.php.net/download/).
   - Descarga la versión más reciente de PHP que sea adecuada para tu sistema (elige "Thread Safe" si no estás seguro).

2. **Configurar PHP**:
   - Extrae el archivo descargado en una carpeta de tu elección, por ejemplo: `C:\php`.
   - Agrega la ruta de PHP a las variables de entorno:
     1. Haz clic derecho en "Este PC" y selecciona "Propiedades".
     2. Haz clic en "Configuración avanzada del sistema".
     3. En la ventana de "Propiedades del sistema", haz clic en "Variables de entorno".
     4. En la sección "Variables del sistema", busca la variable `Path`, selecciona y haz clic en "Editar".
     5. Agrega la ruta donde extrajiste PHP, por ejemplo: `C:\php`.
     6. Haz clic en "Aceptar" para guardar los cambios.

3. **Verificar la instalación**:
   - Abre una terminal de comandos (CMD) y escribe:
     ```bash
     php -v
     ```
   - Deberías ver la versión de PHP que acabas de instalar.

#### En **macOS**:

1. **Instalar PHP mediante Homebrew**:
   - Si no tienes Homebrew instalado, puedes instalarlo desde [https://brew.sh](https://brew.sh).
   - Luego, instala PHP con el siguiente comando:
     ```bash
     brew install php
     ```

2. **Verificar la instalación**:
   - Abre una terminal y ejecuta el siguiente comando para verificar que PHP esté instalado correctamente:
     ```bash
     php -v
     ```
   - Deberías ver la versión de PHP que se instaló.

#### En **Linux** (Ubuntu/Debian):

1. **Instalar PHP**:
   - Abre una terminal y ejecuta los siguientes comandos:
     ```bash
     sudo apt update
     sudo apt install php
     ```

2. **Verificar la instalación**:
   - Una vez completada la instalación, ejecuta el siguiente comando para verificar la versión de PHP:
     ```bash
     php -v
     ```
   - Deberías ver la versión de PHP instalada.

---

## Levantar el Servidor PHP para RollingRivals

Con PHP instalado, puedes ahora levantar el servidor PHP que es necesario para el funcionamiento de **RollingRivals**. Sigue los pasos indicados en la [documentación](/doc/instrucciones-levantar-servidor.MD)

---

## Notas Importantes

- Asegúrate de tener PHP correctamente instalado y accesible desde la línea de comandos antes de ejecutar el servidor PHP.
- Si PHP no está en tu PATH o si tienes problemas para ejecutar el comando `php`, revisa que la ruta de instalación esté correctamente configurada en las variables de entorno.
- El servidor PHP levantará el archivo `sse.php` en el puerto **3000**, que es necesario para las actualizaciones en tiempo real del proyecto.

---

## Recursos Adicionales

- [Documentación Oficial de PHP](https://www.php.net/docs.php)
- [Guía de instalación de PHP en Windows](https://www.php.net/manual/en/install.windows.php)
- [Guía de instalación de PHP en macOS](https://www.php.net/manual/en/install.macosx.php)
- [Guía de instalación de PHP en Linux](https://www.php.net/manual/en/install.unix.php)

Con estos pasos, deberías ser capaz de instalar PHP en tu sistema y levantar el servidor necesario para el funcionamiento del proyecto **RollingRivals**. ¡Disfruta del proyecto!

---