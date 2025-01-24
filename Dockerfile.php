FROM php:8.2-cli

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY py_server/ /app/

# Exponer el puerto 3000 para el servidor PHP
EXPOSE 3000

# Comando para iniciar el servidor PHP
CMD ["php", "-S", "0.0.0.0:3000"]
