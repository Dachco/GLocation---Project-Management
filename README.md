# GLocation - Project Management

Sistema de gestión de proyectos desarrollado con Node.js, Express, Prisma y PostgreSQL, containerizado con Docker.

## 📋 Descripción del Proyecto

Sistema completo de gestión de proyectos con interfaz web moderna que incluye:
- **Frontend React** con interfaz responsiva y moderna
- **Backend Node.js** con API REST completa
- **CRUD completo** de proyectos con validaciones
- **Análisis inteligente** con detección de riesgos y recomendaciones
- **Gráficos interactivos** para visualización de datos
- **Documentación automática** con Swagger
- **Base de datos PostgreSQL** con Prisma ORM
- **Containerización completa** con Docker y Docker Compose
- **Interfaz responsiva** optimizada para móvil y desktop

## 🏗️ Arquitectura del Proyecto

```
GLocation-Project_Management/
├── backend/                    # Backend Node.js
│   ├── src/
│   │   ├── controllers/        # Controladores de la API
│   │   ├── services/          # Lógica de negocio
│   │   ├── routes/            # Rutas de la API
│   │   ├── middlewares/       # Middlewares personalizados
│   │   ├── config/            # Configuración de la base de datos
│   │   └── app.js             # Punto de entrada de la aplicación
│   ├── prisma/
│   │   ├── schema.prisma      # Esquema de la base de datos
│   │   └── seed.js            # Datos de prueba
│   ├── Dockerfile             # Configuración del contenedor
│   └── package.json           # Dependencias del proyecto
├── frontend/                   # Frontend React completo
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/             # Páginas principales
│   │   ├── services/          # Servicios de API
│   │   └── App.jsx            # Aplicación principal
│   ├── Dockerfile             # Configuración del contenedor
│   ├── nginx.conf             # Configuración de Nginx
│   └── package.json           # Dependencias del frontend
├── docker-compose.yml         # Orquestación de contenedores
└── README.md                  # Documentación del proyecto
```

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js 18** - Runtime de JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para base de datos
- **PostgreSQL 15** - Base de datos relacional
- **Swagger** - Documentación de API
- **Docker** - Containerización

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **TailwindCSS** - Framework de CSS utilitario
- **Recharts** - Biblioteca de gráficos
- **Axios** - Cliente HTTP
- **Nginx** - Servidor web para producción

### Base de Datos
- **PostgreSQL 15** - Base de datos principal
- **Prisma Client** - Cliente ORM generado

## 📊 Modelo de Datos

### Proyecto
```prisma
model Proyecto {
  id          Int      @id @default(autoincrement())
  nombre      String
  descripcion String?
  estado      String   @default("pendiente") // pendiente, en_progreso, completado, cancelado
  fechaInicio DateTime?
  fechaFin    DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)

### 1. Clonar el repositorio
```bash
git clone <https://github.com/Dachco/GLocation---Project-Management.git>
cd GLocation-Project_Management
```

### 2. Configurar variables de entorno
Crear archivo `.env` en el directorio `backend/`:
```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/proyectosdb"

# Puerto del servidor
PORT=4000

# Configuración de OpenAI (Opcional)
OPENAI_API_KEY="tu-api-key-de-openai-aqui"
OPENAI_MODEL="gpt-4o-mini"
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7
OPENAI_TIMEOUT_MS=60000
```

**Nota**: Las variables de entorno ya están configuradas en `docker-compose.yml` para desarrollo con Docker.

#### 🔑 Configuración de OpenAI (Opcional)
Para habilitar el análisis inteligente con ChatGPT:

**Variables disponibles:**
- `OPENAI_API_KEY`: Tu API key de OpenAI (requerida)
- `OPENAI_MODEL`: Modelo a usar (default: "gpt-3.5-turbo", recomendado: "gpt-4o-mini")
- `OPENAI_MAX_TOKENS`: Máximo de tokens en la respuesta (default: 1000)
- `OPENAI_TEMPERATURE`: Creatividad de la respuesta 0-1 (default: 0.7)
- `OPENAI_TIMEOUT_MS`: Timeout en milisegundos (default: 60000)

**Pasos:**
1. Obtén tu API key en [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crea el archivo `.env` con la configuración completa mostrada arriba
3. El docker-compose.yml cargará automáticamente las variables del archivo .env

**Sin API key**: El sistema funcionará con análisis local básico.

### 3. Ejecutar con Docker Compose
```bash
# Construir y ejecutar los contenedores
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build
```

### 4. Verificar la instalación
- **Frontend**: `http://localhost:3000` - Interfaz de usuario React completa
- **Backend API**: `http://localhost:4000` - API REST con Swagger
- **Documentación Swagger**: `http://localhost:4000/api-docs` - Documentación interactiva
- **Base de datos PostgreSQL**: `localhost:5432` - Base de datos principal

### 5. Desarrollo Local (Opcional)
Si prefieres ejecutar el proyecto sin Docker:

```bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

### 6. Uso de la aplicación

#### Gestión de Proyectos
1. **Crear proyecto**: Haz clic en "Nuevo Proyecto" y completa el formulario
2. **Editar proyecto**: Haz clic en "Editar" en la tabla de proyectos
3. **Eliminar proyecto**: Haz clic en "Eliminar" y confirma la acción
4. **Ver proyectos**: La tabla muestra todos los proyectos con su estado actual

#### Análisis y Reportes
1. **Gráficos Interactivos**: Ve a la pestaña "Análisis" para ver:
   - Gráfico de barras con proyectos por estado
   - Gráfico de pie con distribución de proyectos
   - Resumen visual con estadísticas
2. **Análisis Inteligente**: 
   - Análisis automático de todos los proyectos
   - Detección de proyectos atrasados
   - Identificación de riesgos
   - Recomendaciones personalizadas
3. **Estadísticas en Tiempo Real**: Visualiza métricas detalladas y actualizadas

## 🐳 Configuración de Docker

### Dockerfile del Backend
```dockerfile
FROM node:18

WORKDIR /usr/src/app

# Copiar archivos de dependencias primero para mejor cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
```

### Docker Compose Completo
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: proyectos_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: proyectosdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    container_name: proyectos_backend
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/proyectosdb"
      PORT: 4000
    ports:
      - "4000:4000"
    depends_on:
      - postgres
    command: sh -c "npx prisma generate && npx prisma migrate deploy && npm run dev"

  frontend:
    build: ./frontend
    container_name: proyectos_frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  pgdata:
```

## 📚 API Endpoints

### Proyectos
- `GET /proyectos` - Obtener todos los proyectos
- `POST /proyectos` - Crear un nuevo proyecto
- `GET /proyectos/:id` - Obtener proyecto por ID
- `PUT /proyectos/:id` - Actualizar proyecto
- `DELETE /proyectos/:id` - Eliminar proyecto
- `GET /proyectos/graficos/data` - Datos para gráficos

### Endpoints Adicionales
- `GET /api/health` - Estado de salud del servidor
- `GET /api/graficos` - Datos agregados de proyectos por estado
- `POST /api/analisis` - Análisis inteligente con detección de riesgos

## 🖥️ Frontend

### Páginas Principales
- **Proyectos** (`/`) - Gestión completa de proyectos con tabla y formularios
- **Análisis** (`/analisis`) - Gráficos interactivos y análisis con IA

### Componentes Principales
- **ProyectosTable** - Tabla responsiva con acciones CRUD (desktop y móvil)
- **ProyectoForm** - Formulario completo para crear/editar proyectos
- **Graficos** - Gráficos interactivos de barras y pie con Recharts
- **AnalisisIA** - Interfaz para análisis inteligente automático
- **App** - Navegación principal y layout responsivo

### Características del Frontend
- **Diseño Responsivo** - Optimizado para móvil, tablet y desktop
- **Interfaz Moderna** - Diseño limpio con TailwindCSS
- **Navegación Intuitiva** - Pestañas para proyectos y análisis
- **Feedback Visual** - Estados de carga, alertas y validaciones
- **Optimización** - Build optimizado con Vite y Nginx

## 🔍 Documentación de la API

La documentación completa de la API está disponible en Swagger UI:
- **URL**: `http://localhost:4000/api-docs`
- **Formato**: OpenAPI 3.0

## 🛠️ Desarrollo

### Comandos disponibles
```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en producción
npm start
```

### Estructura de archivos del backend
```
backend/src/
├── controllers/
│   └── proyectos.controller.js    # Controladores de proyectos
├── services/
│   └── proyectos.service.js       # Lógica de negocio
├── routes/
│   └── proyectos.routes.js        # Definición de rutas
├── middlewares/
│   └── errorHandler.js            # Manejo de errores
├── config/
│   └── db.js                      # Configuración de Prisma
└── app.js                         # Aplicación principal
```

## 🐛 Solución de Problemas

### Error: "@prisma/client did not initialize yet"
**Problema**: El cliente de Prisma no se ha generado correctamente.

**Solución**: 
1. Asegúrate de que el comando en docker-compose incluya `npx prisma generate`
2. Verifica que el archivo `schema.prisma` esté correctamente configurado
3. Reconstruye los contenedores: `docker-compose up --build`

### Error: "Cannot find module 'swagger-jsdoc'"
**Problema**: Dependencia faltante en package.json.

**Solución**: 
1. Agregar `swagger-jsdoc` a las dependencias
2. Reinstalar: `npm install`
3. Reconstruir contenedores: `docker-compose up --build`

### Error de conexión a la base de datos
**Problema**: No se puede conectar a PostgreSQL.

**Solución**:
1. Verificar que el contenedor de PostgreSQL esté ejecutándose
2. Comprobar las variables de entorno
3. Verificar que el puerto 5432 esté disponible

## 🎯 Características Implementadas

### ✅ **Backend Completo**
- **API REST** con Node.js y Express
- **CRUD completo** de proyectos con validaciones
- **Base de datos PostgreSQL** con Prisma ORM
- **Análisis inteligente** con ChatGPT (OpenAI)
- **Análisis local** como fallback
- **Documentación Swagger** automática
- **Manejo de errores** robusto
- **Containerización** con Docker

### ✅ **Frontend Completo**
- **React 18** con Vite y TailwindCSS
- **Interfaz responsiva** para móvil y desktop
- **Gráficos interactivos** con Recharts
- **Análisis automático** de proyectos
- **Navegación intuitiva** entre secciones
- **Estados de carga** y feedback visual
- **Optimización** con Nginx

### ✅ **DevOps y Despliegue**
- **Docker Compose** para orquestación
- **Configuración de producción** optimizada
- **Variables de entorno** configuradas
- **Documentación completa** del proyecto

## 📈 Próximas Características

### 🔐 **Seguridad y Autenticación**
- [ ] Sistema de autenticación con JWT
- [ ] Autorización por roles y permisos
- [ ] Validación de sesiones
- [ ] Middleware de seguridad

### 🤖 **Inteligencia Artificial**
- ✅ **Integración con ChatGPT** - Análisis inteligente de proyectos
- [ ] Integración con otras APIs de IA (Gemini, Claude)
- [ ] Análisis predictivo de proyectos
- [ ] Recomendaciones personalizadas avanzadas
- [ ] Chatbot para consultas

### 📊 **Reportes y Analytics**
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Dashboard avanzado con métricas
- [ ] Historial de cambios
- [ ] Auditoría de acciones

### 🔔 **Notificaciones y Comunicación**
- [ ] Notificaciones en tiempo real
- [ ] Alertas por email
- [ ] Sistema de comentarios
- [ ] Colaboración en equipo


## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

### Interfaz Principal
- **Gestión de Proyectos**: Tabla responsiva con acciones CRUD
- **Formulario de Proyectos**: Interfaz intuitiva para crear/editar
- **Análisis y Gráficos**: Visualizaciones interactivas con Recharts
- **Análisis Inteligente**: Detección automática de riesgos y recomendaciones

### Diseño Responsivo
- **Desktop**: Interfaz completa con tabla y gráficos
- **Móvil**: Vista optimizada con tarjetas y navegación táctil
- **Tablet**: Diseño adaptativo para pantallas medianas

## 🏆 Logros del Proyecto

- ✅ **100% Funcional** - Sistema completo y operativo
- ✅ **Responsive Design** - Optimizado para todos los dispositivos
- ✅ **Dockerizado** - Fácil despliegue y escalabilidad
- ✅ **Documentado** - Código limpio y documentación completa
- ✅ **Moderno** - Tecnologías actuales y mejores prácticas

## 👨‍💻 Autor

Desarrollado por **David** como parte del proyecto GLocation.

---

## 📝 Historial de Cambios

### v3.0.0 - Optimización y Limpieza (Actual)
- ✅ **Limpieza de código** - Eliminación de comentarios innecesarios
- ✅ **README actualizado** - Documentación completa y profesional
- ✅ **Optimización de Dockerfiles** - Configuración más eficiente
- ✅ **Mejoras en la documentación** - Secciones más detalladas
- ✅ **Estructura de proyecto** - Organización mejorada
- ✅ **Código más limpio** - Mantenimiento de comentarios importantes

### v2.0.0 - Frontend Completo
- ✅ **Frontend React** con Vite y TailwindCSS
- ✅ **Interfaz de usuario completa** con gestión de proyectos
- ✅ **Gráficos interactivos** con Recharts (barras y pie)
- ✅ **Análisis con IA mejorado** con estadísticas detalladas
- ✅ **Dockerización completa** del frontend con Nginx
- ✅ **Docker Compose actualizado** con todos los servicios
- ✅ **Interfaz responsiva** y moderna
- ✅ **Componentes reutilizables** y bien estructurados

### v1.0.0 - Configuración Inicial
- ✅ Configuración del proyecto base con Node.js y Express
- ✅ Integración de Prisma con PostgreSQL
- ✅ Implementación del CRUD completo de proyectos
- ✅ Documentación con Swagger
- ✅ Containerización con Docker
- ✅ Configuración de Docker Compose