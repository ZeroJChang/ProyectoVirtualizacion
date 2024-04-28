FROM python:3.8-slim
WORKDIR /app

# Copia el contenido del directorio actual en el contenedor en /app
COPY . /app

# Instalar paquetes necesarios
RUN pip install flask pytz
EXPOSE 5000
ENV NAME World
CMD ["python", "main.py"]
