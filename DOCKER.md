# 🐳 Docker - CrystoDolar

> **Guía completa para ejecutar CrystoDolar con Docker**

## 📋 Índice

- [Prerrequisitos](#-prerrequisitos)
- [Configuración Rápida](#-configuración-rápida)
- [Desarrollo con Docker](#-desarrollo-con-docker)
- [Producción con Docker](#-producción-con-docker)
- [Scripts de Docker](#-scripts-de-docker)
- [Makefile](#-makefile)
- [Configuración Avanzada](#-configuración-avanzada)
- [Troubleshooting](#-troubleshooting)
- [CI/CD](#-cicd)

## 🚀 Prerrequisitos

### Software Requerido
- **Docker** 20.10+ ([Instalar Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** 2.0+ ([Instalar Docker Compose](https://docs.docker.com/compose/install/))
- **Git** para clonar el repositorio

### Verificar Instalación
```bash
# Verificar Docker
docker --version
docker-compose --version

# Verificar que Docker esté funcionando
docker run hello-world
```

## ⚡ Configuración Rápida

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/crystodolar-frontend.git
cd crystodolar-frontend
```

### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar variables de entorno
nano .env.local
```

**Variables mínimas requeridas:**
```env
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NODE_ENV=development
```

### 3. Ejecutar con Docker
```bash
# Desarrollo rápido
make quick-dev

# O manualmente
docker-compose up -d
```

**¡Listo!** Tu aplicación estará disponible en http://localhost:3000

## 🛠️ Desarrollo con Docker

### Comandos Básicos

```bash
# Construir imagen de desarrollo
make build

# Iniciar servicios
make start

# Ver logs
make logs

# Detener servicios
make stop

# Reiniciar servicios
make restart

# Abrir shell en contenedor
make shell
```

### Desarrollo con Hot Reload

```bash
# Modo desarrollo interactivo
make dev

# O usar docker-compose directamente
docker-compose up
```

### Verificar Estado

```bash
# Ver estado de servicios
make status

# Verificar salud
make health

# Información del proyecto
make info
```

## 🚀 Producción con Docker

### Despliegue Completo

```bash
# Despliegue completo (build + start)
make prod-deploy

# O paso a paso
make prod-build
make prod-start
```

### Comandos de Producción

```bash
# Construir imagen de producción
make prod-build

# Iniciar servicios de producción
make prod-start

# Detener servicios
make prod-stop

# Reiniciar servicios
make prod-restart

# Ver logs de producción
make prod-logs

# Monitorear servicios
make prod-monitor
```

### Nginx Reverse Proxy (Opcional)

```bash
# Iniciar con Nginx
docker-compose -f docker-compose.prod.yml --profile nginx up -d

# Verificar Nginx
curl -I http://localhost:80
curl -I https://localhost:443
```

## 📜 Scripts de Docker

### Script de Desarrollo

```bash
# Dar permisos de ejecución
chmod +x scripts/docker-dev.sh

# Usar script
./scripts/docker-dev.sh build
./scripts/docker-dev.sh start
./scripts/docker-dev.sh logs
./scripts/docker-dev.sh help
```

### Script de Producción

```bash
# Dar permisos de ejecución
chmod +x scripts/docker-prod.sh

# Usar script
./scripts/docker-prod.sh deploy
./scripts/docker-prod.sh monitor
./scripts/docker-prod.sh backup
./scripts/docker-prod.sh help
```

## 🔧 Makefile

### Comandos Principales

```bash
# Ayuda
make help

# Desarrollo
make build          # Construir imagen
make start          # Iniciar servicios
make stop           # Detener servicios
make logs           # Ver logs
make shell          # Abrir shell

# Producción
make prod-build     # Construir imagen de producción
make prod-start     # Iniciar producción
make prod-deploy    # Despliegue completo
make prod-monitor   # Monitorear

# Utilidades
make clean          # Limpiar Docker
make status         # Estado de servicios
make health         # Verificar salud
make info           # Información del proyecto
```

### Comandos de Desarrollo Rápido

```bash
# Desarrollo rápido (build + start)
make quick-dev

# Producción rápida (build + start)
make quick-prod

# Debug
make debug
make debug-prod
```

## ⚙️ Configuración Avanzada

### Variables de Entorno

**Desarrollo (.env.local):**
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NEXT_TELEMETRY_DISABLED=1
```

**Producción (.env.production):**
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_ASSET_PREFIX=
```

### Configuración de Next.js

El archivo `next.config.ts` está configurado para Docker con:

- `output: 'standalone'` - Para contenedores Docker
- Headers de seguridad
- Rewrites para API
- Configuración de webpack optimizada

### Configuración de Nginx

**nginx.conf** incluye:
- SSL/TLS con HTTP/2
- Gzip compression
- Rate limiting
- Headers de seguridad
- Proxy reverso a Next.js

### Volúmenes y Persistencia

```yaml
volumes:
  # Hot reload para desarrollo
  - .:/app
  - /app/node_modules
  - /app/.next
  
  # Cache de Docker
  node_modules:
  next_cache:
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Puerto 3000 Ocupado
```bash
# Ver qué está usando el puerto
lsof -i :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"
```

#### 2. Permisos de Archivos
```bash
# Dar permisos a scripts
chmod +x scripts/*.sh

# Verificar permisos de Docker
sudo usermod -aG docker $USER
```

#### 3. Problemas de Build
```bash
# Limpiar cache de Docker
make clean

# Reconstruir sin cache
docker-compose build --no-cache
```

#### 4. Problemas de Memoria
```bash
# Ver uso de recursos
docker stats

# Limpiar recursos no utilizados
docker system prune -f
```

### Logs y Debug

```bash
# Ver logs detallados
make logs

# Debug de desarrollo
make debug

# Debug de producción
make debug-prod

# Shell en contenedor
make shell
```

### Verificar Salud

```bash
# Health check manual
curl -f http://localhost:3000/health

# Verificar contenedores
docker ps

# Verificar redes
docker network ls
```

## 🚀 CI/CD

### GitHub Actions

```yaml
# .github/workflows/docker.yml
name: Docker Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: make prod-build
      - name: Test Docker image
        run: make health
```

### Docker Hub

```bash
# Construir y etiquetar
docker build -t tu-usuario/crystodolar:latest .

# Subir a Docker Hub
docker push tu-usuario/crystodolar:latest
```

### Despliegue Automático

```bash
# Script de despliegue
#!/bin/bash
git pull origin main
make prod-deploy
make health
```

## 📊 Monitoreo

### Métricas de Docker

```bash
# Estadísticas en tiempo real
docker stats

# Uso de recursos
docker system df

# Información del sistema
docker info
```

### Logs Estructurados

```bash
# Logs con timestamps
docker-compose logs -f --timestamps

# Logs de un servicio específico
docker-compose logs -f crystodolar-frontend

# Logs con formato JSON
docker-compose logs -f --format json
```

### Health Checks

```bash
# Verificar salud
make health

# Health check manual
curl -f http://localhost:3000/health

# Verificar contenedores
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

## 🔒 Seguridad

### Buenas Prácticas

1. **Usuario no-root**: Los contenedores ejecutan como usuario `nextjs`
2. **Imágenes Alpine**: Imágenes base ligeras y seguras
3. **Headers de seguridad**: Configurados en Next.js y Nginx
4. **Rate limiting**: Implementado en Nginx
5. **SSL/TLS**: Configurado para producción

### Escaneo de Vulnerabilidades

```bash
# Escanear imagen con Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image crystodolar-frontend:latest

# Escanear con Docker Scout
docker scout cves crystodolar-frontend:latest
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)

### Herramientas Útiles
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Portainer](https://www.portainer.io/) - UI para Docker
- [Docker Compose UI](https://github.com/francescou/docker-compose-ui)

### Comunidad
- [Docker Community](https://community.docker.com/)
- [Next.js Discord](https://discord.gg/nextjs)

---

## 🆘 ¿Necesitas Ayuda?

### Canales de Soporte
- **Issues**: [GitHub Issues](https://github.com/crystodolar/crystodolar-frontend/issues)
- **Discord**: [CrystoDolar Community](https://discord.gg/crystodolar)
- **Telegram**: [@CrystoDolar](https://t.me/CrystoDolar)

### Comandos de Ayuda
```bash
# Ayuda general
make help

# Ayuda de scripts
./scripts/docker-dev.sh help
./scripts/docker-prod.sh help

# Información del proyecto
make info
```

---

**🐳 Docker hace que CrystoDolar sea fácil de desplegar en cualquier entorno!**
