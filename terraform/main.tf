terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    docker = {  # Explicitly specify the provider source
      source = "kreuzwerker/docker"
      version = "~> 2.7"
    }
  }
}

# ... rest of your configuration ...


provider "docker" {
  host = "tcp://localhost:2375"  # Specify the Docker daemon host (optional)
}

# Recurso para crear la red de Docker si es necesario
resource "docker_network" "api_network" {
  name = "api-network"
}

# Resource for creating the API container with Docker login
resource "docker_container" "api_container" {
  name = "api-container"
  image = "api:latest"  # Name of the image and tag to use
  network_mode = docker_network.api_network.name
  restart = "unless-stopped"
  ports {
    internal = 3000
    external = 3000
  }
  depends_on = [docker_network.api_network]
}

# Resource for creating the NGINX container with Docker login
resource "docker_container" "nginx_container" {
  name = "nginx-container"
  image = "nginx:latest"  # Name of the image and tag to use
  network_mode = docker_network.api_network.name
  restart = "unless-stopped"
  ports {
    internal = 80
    external = 80
  }
  depends_on = [docker_network.api_network]
}