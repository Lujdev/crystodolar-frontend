# 💎 CrystoDolar - Plataforma de Cotizaciones USDT/Bs

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Plataforma gratuita para consultar cotizaciones de USDT en bolívares venezolanos en tiempo real**

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [API y Servicios](#-api-y-servicios)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción del Proyecto

CrystoDolar es una aplicación web moderna desarrollada en Next.js que proporciona información actualizada sobre las cotizaciones de USDT (Tether) en bolívares venezolanos. La plataforma integra datos de múltiples fuentes:

- **BCV (Banco Central de Venezuela)**: Tasa oficial fiat
- **Binance P2P**: Mercado crypto peer-to-peer
- **Mercado Paralelo**: Cotizaciones del mercado informal

### 🎨 Diseño y UX

- **Interfaz moderna** con tema oscuro optimizado para la experiencia del usuario
- **Diseño responsivo** que funciona perfectamente en dispositivos móviles y desktop
- **Componentes interactivos** con tooltips informativos y modales
- **Gráficas históricas** para visualizar la evolución de las cotizaciones

## ✨ Características Principales

### 🔄 Cotizaciones en Tiempo Real
- Actualización automática de tasas BCV y Binance P2P
- Cálculo automático de brechas entre mercados
- Indicadores de variación con iconografía intuitiva

### 📊 Dashboard Interactivo
- **Tarjetas de cotización** con información detallada
- **Estadísticas comparativas** entre fiat y crypto
- **Gráficas históricas** de las últimas 24 horas
- **Calculadora integrada** para conversiones

### 🎯 Funcionalidades Avanzadas
- **Sistema de notificaciones** con Sonner
- **Navegación por pestañas** para diferentes tipos de cotización
- **Búsqueda y filtrado** de cotizaciones
- **Enlaces directos** a sitios oficiales

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **Next.js 15.4.6** - Framework React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.9.2** - Tipado estático para JavaScript

### Estilos y UI
- **Tailwind CSS 4.0** - Framework CSS utility-first
- **shadcn/ui** - Componentes de interfaz reutilizables
- **Lucide React** - Iconografía moderna y consistente

### Gestión de Estado
- **React Context API** - Estado global de la aplicación
- **React Hooks** - Gestión de estado local y efectos

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **pnpm** - Gestor de paquetes rápido y eficiente

## 🏗️ Arquitectura del Sistema

### Patrón de Arquitectura
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │    Hooks    │        │
│  │   (App)     │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Context   │  │   Utils     │  │   Types     │        │
│  │  (Global)   │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Principios de Diseño
- **Single Responsibility**: Cada componente tiene una responsabilidad única
- **Component Composition**: Reutilización de componentes pequeños
- **Type Safety**: Tipado completo con TypeScript
- **Performance**: Optimización con Next.js App Router

## 🚀 Instalación y Configuración

### Opción 1: Instalación Local (Tradicional)

#### Prerrequisitos
- **Node.js** 18.17 o superior
- **pnpm** (recomendado) o npm
- **Git** para clonar el repositorio

#### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/crystodolar-frontend.git
cd crystodolar-frontend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en modo desarrollo
pnpm dev
```

### Opción 2: Docker (Recomendado)

#### Prerrequisitos
- **Docker** 20.10+ ([Instalar Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** 2.0+ ([Instalar Docker Compose](https://docs.docker.com/compose/install/))
- **Git** para clonar el repositorio

#### Instalación con Docker

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/crystodolar-frontend.git
cd crystodolar-frontend

# Configurar variables de entorno
cp .env.example .env.local

# Desarrollo rápido con Docker
make -f docker/Makefile quick-dev

# O usar scripts directamente
docker/scripts/docker-dev.bat start    # Windows
docker/scripts/docker-dev.sh start     # Linux/macOS
```

**¡Listo!** Tu aplicación estará disponible en http://localhost:3000

#### Comandos Docker Rápidos

```bash
# Ver todos los comandos disponibles
make help

# Desarrollo (desde la raíz)
make -f docker/Makefile build          # Construir imagen
make -f docker/Makefile start          # Iniciar servicios
make -f docker/Makefile stop           # Detener servicios
make -f docker/Makefile logs           # Ver logs

# O entrar a la carpeta docker
cd docker
make build          # Construir imagen
make start          # Iniciar servicios
make stop           # Detener servicios
make logs           # Ver logs

# Producción
make -f docker/Makefile prod-deploy    # Despliegue completo
make -f docker/Makefile prod-monitor   # Monitorear servicios
```

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/crystodolar-frontend.git
cd crystodolar-frontend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en modo desarrollo
pnpm dev
```

### Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_API_URL=https://crystodolar-api-production.up.railway.app/
NEXT_PUBLIC_BCV_API_KEY=tu_api_key_bcv (opcional)
NEXT_PUBLIC_BINANCE_API_KEY=tu_api_key_binance (opcional)
```

### Scripts Disponibles

```json
{
  "dev": "next dev --turbopack",     // Desarrollo con Turbopack
  "build": "next build",              // Build de producción
  "start": "next start",              // Servidor de producción
  "lint": "next lint"                 // Linting del código
}
```

## 📁 Estructura del Proyecto

```
crystodolar-frontend/
├── src/
│   ├── app/                          # App Router (Next.js 13+)
│   │   ├── layout.tsx               # Layout principal
│   │   ├── page.tsx                 # Página principal
│   │   ├── historica/               # Página histórica
│   │   │   └── page.tsx
│   │   ├── globals.css              # Estilos globales
│   │   └── favicon.ico
│   ├── components/                   # Componentes reutilizables
│   │   ├── ui/                      # Componentes base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── currency-card.tsx        # Tarjeta de cotización
│   │   ├── currency-grid.tsx        # Grid de cotizaciones
│   │   ├── currency-tabs.tsx        # Pestañas de navegación
│   │   ├── historical-chart.tsx     # Gráfica histórica
│   │   ├── stats-overview.tsx       # Resumen de estadísticas
│   │   ├── calculator-modal.tsx     # Modal de calculadora
│   │   ├── header.tsx               # Encabezado
│   │   ├── footer.tsx               # Pie de página
│   │   └── loading-spinner.tsx      # Indicador de carga
│   ├── lib/                         # Utilidades y servicios
│   │   ├── crypto-context.tsx       # Contexto global
│   │   ├── crypto-data.ts           # Lógica de datos
│   │   └── utils.ts                 # Funciones utilitarias
│   └── types/                       # Definiciones de tipos
│       └── currency.ts              # Tipos de cotización
├── public/                          # Archivos estáticos
├── package.json                     # Dependencias y scripts
├── tailwind.config.js               # Configuración de Tailwind
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Esta documentación
```

## 🧩 Componentes Principales

### 1. CurrencyCard
**Responsabilidad**: Renderizar una cotización individual USDT/Bs

```typescript
interface CurrencyCardProps {
  rate: CryptoRate;  // Datos de la cotización
}
```

**Características**:
- Muestra precios de compra/venta
- Indicador de variación con iconografía
- Tooltip informativo sobre la fuente
- Botones de acción (calculadora, histórico, sitio oficial)

### 2. HistoricalChart
**Responsabilidad**: Visualizar evolución temporal de cotizaciones

**Funcionalidades**:
- Gráfica SVG personalizada
- Datos de las últimas 24 horas
- Comparación BCV vs Binance P2P
- Etiquetas de precio y tiempo

### 3. StatsOverview
**Responsabilidad**: Resumen estadístico del mercado

**Métricas mostradas**:
- USDT BCV (tasa oficial)
- Brecha Fiat/Crypto
- Variación promedio del mercado
- Última actualización

### 4. CryptoContext
**Responsabilidad**: Estado global de la aplicación

```typescript
interface CryptoContextType {
  rates: CryptoRate[];
  fiatRate: CryptoRate | null;
  cryptoRate: CryptoRate | null;
  lastUpdate: Date | null;
  loading: boolean;
  error: string | null;
}
```

## 🔌 API y Servicios

### Estructura de Datos

```typescript
interface CryptoRate {
  id: string;
  name: string;
  type: 'fiat' | 'crypto';
  category: 'dolar' | 'euro' | 'usdt';
  buy: number;        // Precio de compra
  sell: number;       // Precio de venta
  variation: number;  // Variación porcentual
  lastUpdate: Date;   // Última actualización
}
```

### Servicios de Datos

- **BCV Service**: Integración con API del Banco Central
- **Binance P2P Service**: Datos del mercado peer-to-peer
- **Data Aggregation**: Consolidación y normalización de datos

### Endpoints Principales

```typescript
// Obtener todas las cotizaciones
GET /api/rates

// Obtener cotización específica
GET /api/rates/:id

// Obtener datos históricos
GET /api/rates/:id/history

// Actualizar cotizaciones
POST /api/rates/update
```

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Configuración de Vercel

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

### Variables de Entorno en Vercel

```env
NEXT_PUBLIC_API_URL=https://api.crystodolar.com
NEXT_PUBLIC_BCV_API_KEY=tu_api_key_bcv
NEXT_PUBLIC_BINANCE_API_KEY=tu_api_key_binance
```

### Otros Proveedores

- **Netlify**: Compatible con Next.js
- **AWS Amplify**: Despliegue serverless
- **Docker**: Containerización para cualquier servidor

## 🤝 Contribución

### Guías de Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código

- **TypeScript**: Tipado completo y estricto
- **ESLint**: Reglas de linting configuradas
- **Prettier**: Formateo automático de código
- **Conventional Commits**: Estándar de mensajes de commit

### Estructura de Commits

```
feat: agregar nueva funcionalidad de gráficas
fix: corregir error en cálculo de variación
docs: actualizar documentación de API
style: mejorar diseño de tarjetas de cotización
refactor: refactorizar lógica de contexto crypto
test: agregar tests para componente CurrencyCard
```

## 🐳 Docker

### Configuración Completa y Organizada

CrystoDolar incluye configuración completa de Docker organizada en la carpeta `docker/`:

- **`docker/Dockerfile.prod`** - Multi-stage build optimizado para producción
- **`docker/Dockerfile.dev`** - Configuración simple para desarrollo
- **`docker/docker-compose.dev.yml`** - Servicios de desarrollo con hot reload
- **`docker/docker-compose.prod.yml`** - Servicios de producción con Nginx
- **`docker/scripts/`** - Scripts automatizados para Windows (.bat) y Unix (.sh)
- **`docker/Makefile`** - Comandos simplificados para Docker
- **`docker/configs/`** - Configuraciones de Nginx y otros servicios

### Características Docker

- ✅ **Multi-stage builds** para imágenes optimizadas
- ✅ **Hot reload** en desarrollo
- ✅ **Nginx reverse proxy** para producción
- ✅ **Health checks** automáticos
- ✅ **Volúmenes persistentes** para desarrollo
- ✅ **Scripts cross-platform** (Windows/Linux/macOS)
- ✅ **Configuración de seguridad** integrada
- ✅ **Organización modular** en carpeta dedicada

### Uso de Docker

```bash
# Desde la raíz del proyecto
make help                    # Ver comandos disponibles
make -f docker/Makefile help # Ayuda de Docker

# Desde la carpeta docker
cd docker
make help                    # Ver todos los comandos Docker
make build                   # Construir imagen de desarrollo
make start                   # Iniciar servicios
```

### Documentación Docker

Para información detallada sobre Docker, consulta:
- [docker/README.md](docker/README.md) - Guía específica de Docker
- [DOCKER.md](DOCKER.md) - Guía completa de Docker
- [docker/scripts/](docker/scripts/) - Scripts automatizados
- [docker/Makefile](docker/Makefile) - Comandos simplificados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Next.js Team** por el framework increíble
- **Vercel** por la plataforma de despliegue
- **Tailwind CSS** por el sistema de utilidades
- **shadcn/ui** por los componentes base
- **Comunidad Venezolana** por el feedback y sugerencias

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: [tu-email@ejemplo.com]
- **GitHub**: [@tu-usuario]
- **LinkedIn**: [Tu Perfil]

---

**CrystoDolar** - Hecho con ❤️ para Venezuela 🇻🇪

*Última actualización: ${new Date().toLocaleDateString('es-ES')}*