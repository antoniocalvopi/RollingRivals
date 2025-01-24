import subprocess
import os
import platform

def run_php_server():
    php_root = "./py_server" 
    php_port = 3000  

    # Detectar el sistema operativo
    os_type = platform.system()
    if os_type == "Windows":
        php_command = "php"
    elif os_type == "Darwin":  # macOS
        php_command = "/opt/homebrew/bin/php"  # ruta de php en macOS
    elif os_type == "Linux":  # Linux/Ubuntu
        php_command = "/usr/bin/php"  # ruta de php en Linux/Ubuntu
    else:
        print(f"Sistema operativo no soportado: {os_type}")
        return

    if not os.path.exists(php_root):
        print(f"Error: No se encontró el directorio {php_root}")
        return

    os.chdir(php_root)

    command = [php_command, "-S", f"localhost:{php_port}"]

    try:
        print(f"Iniciando servidor PHP en http://localhost:{php_port}")
        print(f"Directorio raíz del servidor: {os.getcwd()}")
        subprocess.run(command)
    except KeyboardInterrupt:
        print("\nServidor detenido manualmente.")
    except FileNotFoundError:
        print(f"PHP no está instalado o no es accesible desde la línea de comandos.")
    except Exception as e:
        print(f"Error al iniciar el servidor :(  [{e}]")

if __name__ == "__main__":
    run_php_server()
