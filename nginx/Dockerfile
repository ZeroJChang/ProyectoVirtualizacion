# Usar la imagen oficial de NGINX como base
FROM nginx:latest

# Copiar el archivo HTML principal al directorio de contenido estático de NGINX
COPY index.html /usr/share/nginx/html

# Copiar recursos estáticos adicionales, si es necesario
COPY images /usr/share/nginx/html/images

# Copiar archivo de configuración personalizado de NGINX, si es necesario
#COPY nginx.conf /etc/nginx/conf.d/

# Exponer el puerto 80 para que NGINX sea accesible desde fuera del contenedor
EXPOSE 80
