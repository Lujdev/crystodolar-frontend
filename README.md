# 💎 CrystoDolar - Cotizaciones USDT/VES

Sistema completo para cotizaciones de USDT en bolívares venezolanos en tiempo real.

## 📁 Estructura del Proyecto

```
📁 Desktop/
├── 📁 crystodolar/              # 🎯 Frontend Next.js (cambiar a crystodolar-frontend)
│   ├── src/app/                 # App Router de Next.js 14
│   ├── src/components/          # Componentes React + shadcn/ui
│   ├── src/lib/                 # Lógica de negocio y estado (CryptoContext)
│   ├── src/types/               # Tipos TypeScript
│   ├── tailwind.config.js       # Configuración TailwindCSS
│   └── package.json             # Dependencias frontend
│
└── 📁 crystodolar-backend/      # ⚡ Backend FastAPI + Neon.tech
    ├── app/                     # Aplicación FastAPI
    │   ├── core/                # Configuración y base de datos
    │   ├── api/                 # Endpoints REST
    │   ├── models/              # Modelos SQLAlchemy (TODO)
    │   ├── schemas/             # Schemas Pydantic (TODO)
    │   └── services/            # Lógica de negocio (TODO)
    ├── database/                # Schema SQL para Neon.tech
    ├── main.py                  # Punto de entrada FastAPI
    ├── requirements.txt         # Dependencias Python
    └── env.example              # Variables de entorno
```

## 🚀 Quick Start

### **1. Frontend (Next.js)**
```bash
cd crystodolar                    # (cambiar a crystodolar-frontend después)
npm install
npm run dev                       # http://localhost:3000
```

### **2. Backend (FastAPI)**
```bash
cd crystodolar-backend
pip install -r requirements.txt
cp env.example .env              # Configurar variables
python main.py                   # http://localhost:8000
```

### **3. Base de Datos (Neon.tech)**
1. Crear proyecto en [neon.tech](https://neon.tech)
2. Ejecutar `database/crystodolar_schema.sql`
3. Configurar `DATABASE_URL` en `.env`

## 🔧 Stack Tecnológico

### **Frontend:**
- **Next.js 14** con App Router
- **React 18** + TypeScript
- **TailwindCSS** para estilos
- **shadcn/ui** para componentes
- **Lucide React** para iconos
- **CryptoContext** para estado global

### **Backend:**
- **FastAPI** con AsyncPG
- **SQLAlchemy** async para ORM
- **Neon.tech** PostgreSQL serverless
- **APScheduler** para tareas automáticas
- **Loguru** para logging estructurado

### **Datos:**
- **BCV** - Tasa oficial venezolana
- **Binance P2P** - Mercado crypto P2P

## 📊 Funcionalidades

### ✅ **Implementado:**
- 🎨 Interfaz moderna con tarjetas de cotizaciones
- 📱 Diseño responsive y tema oscuro
- 💹 Tooltips informativos por exchange
- 📈 Página de histórico con gráficas mock
- 🔄 Sistema de estado global con CryptoContext
- 🗄️ Schema completo de base de datos
- ⚙️ Backend FastAPI con endpoints REST

### 🔄 **En desarrollo:**
- 🌐 Scrapers para BCV y Binance P2P
- 📊 Integración real de datos históricos
- 🔌 WebSockets para tiempo real
- 🧪 Tests unitarios
- 🚀 CI/CD y deploy automático

## 🛠️ Comandos Útiles

### **Desarrollo Frontend:**
```bash
npm run dev          # Servidor desarrollo
npm run build        # Build producción
npm run lint         # Linting
npm run type-check   # Verificar tipos
```

### **Desarrollo Backend:**
```bash
python main.py       # Servidor desarrollo
uvicorn main:app --reload  # Alternativo
pytest              # Tests (TODO)
black .              # Format código
```

### **Base de Datos:**
```bash
# Conectar a Neon.tech
psql "postgresql://[connection_string]"

# Ejecutar migrations (TODO)
alembic upgrade head
```

## 🌍 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 Próximos Pasos

### **Renombrar carpetas** (hacer después de parar procesos):
```bash
# Parar servidor Next.js (Ctrl+C)
# Cerrar Cursor si está abierto
Rename-Item crystodolar crystodolar-frontend
```

### **Completar backend:**
1. Implementar modelos SQLAlchemy
2. Crear scrapers para BCV y Binance
3. Desarrollar servicios de datos
4. Configurar WebSockets
5. Agregar autenticación (opcional)

### **Deploy:**
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Render/Fly.io
- **Base de datos**: Neon.tech (ya configurado)

## 🔐 Variables de Entorno

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

### **Backend (.env):**
```env
DATABASE_URL=postgresql://[neon-connection-string]
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=["http://localhost:3000"]
```

## 📞 APIs Disponibles

### **Cotizaciones:**
- `GET /api/v1/rates/` - Todas las cotizaciones
- `GET /api/v1/rates/bcv` - Solo BCV
- `GET /api/v1/rates/binance` - Solo Binance P2P
- `GET /api/v1/rates/history` - Histórico para gráficas

### **Monitoreo:**
- `GET /health` - Health check
- `GET /api/v1/admin/scheduler` - Estado de tareas

---

**Desarrollado con ❤️ para el mercado crypto venezolano**  
🇻🇪 **Venezuela** | 💎 **CrystoDolar** | ⚡ **Tiempo Real**