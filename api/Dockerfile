# Usar la imagen oficial de Node.js como base
FROM node:14

# Establecer el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "api.js"]
