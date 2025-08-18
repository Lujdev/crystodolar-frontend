# 🚀 Guía de Despliegue - CrystoDolar

> **Cómo desplegar CrystoDolar en Vercel y Docker**

## 📋 Índice

- [Compatibilidad](#-compatibilidad)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Despliegue con Docker](#-despliegue-con-docker)
- [Desarrollo Local](#-desarrollo-local)
- [Variables de Entorno](#-variables-de-entorno)
- [Troubleshooting](#-troubleshooting)

## 🔄 Compatibilidad

### ✅ **Vercel + Docker = Compatibles**

CrystoDolar está diseñado para funcionar **perfectamente** en ambos entornos:

- **Vercel**: Despliegue automático y hosting
- **Docker**: Contenedores locales y servidores
- **Desarrollo Local**: pnpm dev sin Docker

### 🎯 **Características de Compatibilidad**

- ✅ **Misma configuración** de Next.js
- ✅ **Mismas variables de entorno**
- ✅ **Mismo código fuente**
- ✅ **Mismos builds**
- ✅ **Misma funcionalidad**

## 🌐 Despliegue en Vercel

### Configuración Automática

Vercel detecta automáticamente que es un proyecto Next.js:

```json
// vercel.json (opcional, Vercel lo detecta automáticamente)
{
  "version": 2,
  "name": "crystodolar-frontend",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

### Pasos para Vercel

1. **Conectar Repositorio**
   ```bash
   # En Vercel Dashboard
   New Project → Import Git Repository → crystodolar-frontend
   ```

2. **Configurar Variables de Entorno**
   ```env
   NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

3. **Desplegar**
   ```bash
   # Automático en cada push a main
   # O manualmente
   vercel --prod
   ```

### Comandos Vercel

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Desplegar
vercel

# Desplegar a producción
vercel --prod

# Ver estado
vercel ls
```

## 🐳 Despliegue con Docker

### Configuración Organizada

Todo está en la carpeta `docker/`:

```
docker/
├── Dockerfile.prod          # Imagen de producción
├── docker-compose.prod.yml  # Servicios de producción
├── configs/nginx.conf       # Nginx opcional
├── scripts/                 # Scripts automatizados
└── Makefile                 # Comandos simplificados
```

### Despliegue Rápido

```bash
# Desde la raíz
make -f docker/Makefile prod-deploy

# O desde la carpeta docker
cd docker
make prod-deploy
```

### Comandos Docker

```bash
# Desarrollo
make -f docker/Makefile build
make -f docker/Makefile start
make -f docker/Makefile logs

# Producción
make -f docker/Makefile prod-build
make -f docker/Makefile prod-start
make -f docker/Makefile prod-monitor

# Limpiar
make -f docker/Makefile clean
```

## 💻 Desarrollo Local

### Sin Docker (Tradicional)

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Producción local
pnpm start
```

### Con Docker

```bash
# Desarrollo con hot reload
cd docker
make build
make start
make logs

# O usar scripts
./scripts/docker-dev.sh start
```

## 🔧 Variables de Entorno

### Archivo Principal (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/

# Entorno
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

### Vercel (Dashboard)

```env
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Docker (docker-compose)

```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  - NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. **Build Falla en Vercel**
```bash
# Verificar next.config.ts
# Asegurar que output: 'standalone' esté comentado para Vercel
# output: 'standalone'  # Solo para Docker
```

#### 2. **Docker No Inicia**
```bash
# Verificar Docker Desktop
docker --version
docker-compose --version

# Limpiar y reconstruir
cd docker
make clean
make build
```

#### 3. **Variables de Entorno No Funcionan**
```bash
# Verificar .env.local
# Verificar configuración en Vercel Dashboard
# Verificar docker-compose.yml
```

### Logs y Debug

#### Vercel
```bash
# Ver logs en Vercel Dashboard
# Functions → Logs
# Build Logs
```

#### Docker
```bash
# Ver logs
cd docker
make logs

# Debug
make debug
make debug-prod
```

## 🚀 Flujos de Trabajo

### Desarrollo Diario

```bash
# 1. Desarrollo local
pnpm dev

# 2. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 3. Vercel se despliega automáticamente
# 4. Docker local para testing
cd docker
make prod-deploy
```

### Testing

```bash
# Build local
pnpm build

# Test Docker
cd docker
make prod-build
make prod-start
make health

# Test Vercel
vercel --prod
```

### Producción

```bash
# Vercel (automático)
git push origin main

# Docker (manual)
cd docker
make prod-deploy
make prod-monitor
```

## 📊 Monitoreo

### Vercel
- **Dashboard**: Métricas en tiempo real
- **Analytics**: Performance y usuarios
- **Functions**: Logs de API routes

### Docker
```bash
# Estado de servicios
cd docker
make status

# Monitoreo en tiempo real
make prod-monitor

# Logs
make prod-logs
```

## 🔒 Seguridad

### Vercel
- ✅ **HTTPS automático**
- ✅ **Edge Network global**
- ✅ **DDoS protection**
- ✅ **SSL/TLS automático**

### Docker
- ✅ **Usuario no-root**
- ✅ **Headers de seguridad**
- ✅ **Rate limiting (Nginx)**
- ✅ **SSL/TLS configurable**

## 📚 Recursos Adicionales

### Vercel
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/nodejs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### Docker
- [docker/README.md](docker/README.md) - Guía específica de Docker
- [DOCKER.md](DOCKER.md) - Documentación completa
- [Docker Documentation](https://docs.docker.com/)

---

## 🎯 **Resumen de Compatibilidad**

| Entorno | Estado | Comando Principal |
|---------|--------|-------------------|
| **Vercel** | ✅ **Compatible** | `git push origin main` |
| **Docker** | ✅ **Compatible** | `cd docker && make prod-deploy` |
| **Local** | ✅ **Compatible** | `pnpm dev` |

**¡Tu proyecto funciona perfectamente en todos los entornos! 🎉**
