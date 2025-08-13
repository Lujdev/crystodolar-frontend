# 🐳 Docker - CrystoDolar

> **Configuración Docker completa y organizada para CrystoDolar**

## 📁 Estructura de la Carpeta

```
docker/
├── README.md                 # Este archivo
├── Makefile                  # Comandos principales de Docker
├── .dockerignore            # Archivos a ignorar en builds
├── Dockerfile.dev           # Imagen de desarrollo
├── Dockerfile.prod          # Imagen de producción
├── docker-compose.dev.yml   # Servicios de desarrollo
├── docker-compose.prod.yml  # Servicios de producción
├── scripts/                 # Scripts automatizados
│   ├── docker-dev.sh        # Script Unix para desarrollo
│   ├── docker-dev.bat       # Script Windows para desarrollo
│   ├── docker-prod.sh       # Script Unix para producción
│   └── docker-prod.bat      # Script Windows para producción
├── configs/                 # Configuraciones
│   └── nginx.conf          # Configuración de Nginx
└── nginx/                   # Archivos de Nginx
```

## 🚀 Uso Rápido

### Desde la Raíz del Proyecto
```bash
# Ver ayuda
make help

# Usar comandos Docker
make -f docker/Makefile help
make -f docker/Makefile build
make -f docker/Makefile start
```

### Desde la Carpeta Docker
```bash
# Entrar a la carpeta
cd docker

# Ver ayuda
make help

# Desarrollo
make build
make start
make logs

# Producción
make prod-build
make prod-start
make prod-deploy
```

## 🔧 Comandos Disponibles

### Desarrollo
- `make build` - Construir imagen de desarrollo
- `make start` - Iniciar servicios de desarrollo
- `make stop` - Detener servicios
- `make restart` - Reiniciar servicios
- `make logs` - Ver logs
- `make shell` - Abrir shell en contenedor

### Producción
- `make prod-build` - Construir imagen de producción
- `make prod-start` - Iniciar servicios de producción
- `make prod-deploy` - Despliegue completo
- `make prod-monitor` - Monitorear servicios

### Utilidades
- `make clean` - Limpiar contenedores e imágenes
- `make status` - Ver estado de servicios
- `make health` - Verificar salud de servicios
- `make scripts` - Mostrar scripts disponibles
- `make nginx` - Mostrar configuración Nginx

## 📜 Scripts Disponibles

### Scripts de Desarrollo
```bash
# Unix/Linux/macOS
./scripts/docker-dev.sh build
./scripts/docker-dev.sh start
./scripts/docker-dev.sh logs

# Windows
scripts/docker-dev.bat build
scripts/docker-dev.bat start
scripts/docker-dev.bat logs
```

### Scripts de Producción
```bash
# Unix/Linux/macOS
./scripts/docker-prod.sh deploy
./scripts/docker-prod.sh monitor
./scripts/docker-prod.sh backup

# Windows
scripts/docker-prod.bat deploy
scripts/docker-prod.bat monitor
scripts/docker-prod.bat backup
```

## 🌐 Nginx (Opcional)

Para usar Nginx como reverse proxy:

```bash
# Iniciar con Nginx
docker-compose -f docker-compose.prod.yml --profile nginx up -d

# Verificar
curl -I http://localhost:80
curl -I https://localhost:443
```

## 🔄 Compatibilidad

### Vercel
- ✅ **Totalmente compatible**
- ✅ No afecta el despliegue en Vercel
- ✅ Variables de entorno funcionan igual
- ✅ Build y runtime idénticos

### Docker
- ✅ **Configuración completa**
- ✅ Multi-stage builds optimizados
- ✅ Hot reload en desarrollo
- ✅ Producción con Nginx opcional

### Desarrollo Local
- ✅ **pnpm dev** funciona normalmente
- ✅ **pnpm build** para producción
- ✅ **pnpm start** para testing

## 📋 Variables de Entorno

### Desarrollo (.env.local)
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NEXT_TELEMETRY_DISABLED=1
```

### Producción (.env.production)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Flujos de Trabajo

### Desarrollo con Docker
```bash
cd docker
make build
make start
make logs
```

### Producción con Docker
```bash
cd docker
make prod-deploy
make prod-monitor
```

### Desarrollo Local (sin Docker)
```bash
# Desde la raíz
pnpm dev
pnpm build
pnpm start
```

### Despliegue en Vercel
```bash
# Desde la raíz
vercel
vercel --prod
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Puerto 3000 Ocupado
```bash
# Cambiar puerto en docker-compose.dev.yml
ports:
  - "3001:3000"
```

#### 2. Permisos de Scripts
```bash
# Unix/Linux/macOS
chmod +x scripts/*.sh

# Windows
# Los scripts .bat no requieren permisos especiales
```

#### 3. Problemas de Build
```bash
make clean
make build
```

## 📚 Documentación Adicional

- [DOCKER.md](../DOCKER.md) - Guía completa de Docker
- [README.md](../README.md) - Documentación principal del proyecto
- [next.config.ts](../next.config.ts) - Configuración de Next.js

## 🆘 ¿Necesitas Ayuda?

```bash
# Ayuda general
make help

# Ayuda de scripts
./scripts/docker-dev.sh help
./scripts/docker-prod.sh help

# Información de Nginx
make nginx
```

---

**🐳 Docker hace que CrystoDolar sea fácil de desplegar en cualquier entorno!**
