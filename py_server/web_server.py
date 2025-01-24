import subprocess
import os
import platform

os_system = platform.system()

if os_system == 'Windows':
    command = ["python", "-m", "http.server"]  
elif os_system == 'Darwin':  
    command = ["python3", "-m", "http.server"]  
else:  
    command = ["python3", "-m", "http.server"]  

try:
    print(f"Iniciando servidor WEB en http://localhost:8000")
    subprocess.run(command)
except KeyboardInterrupt:
    print("\nServidor detenido manualmente.")
except Exception as e:
    print(f"Error al iniciar el servidor :(  [{e}]")