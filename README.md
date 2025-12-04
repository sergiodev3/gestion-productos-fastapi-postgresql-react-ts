# 🛒 Sistema de Gestión de Productos 
Ejemplo basico de aplicacion web con operaciones CRUD, desarrollado con **FastAPI** (backend) y **React + TypeScript** (frontend).

## 📋 Descripción

Es una aplicación web moderna que permite gestionar un catálogo de productos con las siguientes funcionalidades:

- ✅ Crear nuevos productos
- 📖 Listar todos los productos
- 🔍 Buscar productos por nombre
- ✏️ Actualizar productos existentes
- 🗑️ Eliminar productos
- 🏷️ Marcar productos en oferta
- 💾 Persistencia de datos en PostgreSQL

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno y rápido
- **PostgreSQL** - Base de datos relacional
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS3** - Estilos modernos

## 📁 Estructura del Proyecto

```
gestion-productos-fastapi-basic/
├── backend/
│   ├── main.py                 # Punto de entrada de la aplicación
│   ├── config.py               # Configuración global
│   ├── requirements.txt        # Dependencias Python
│   ├── .env.example            # Ejemplo de variables de entorno
│   ├── Procfile                # Configuración para Railway
│   ├── runtime.txt             # Versión de Python

### 3. Configurar variables de entorno (opcional)

El archivo `backend/.env` contiene la configuración del servidor:

```env
HOST=127.0.0.1
PORT=8000
│   ├── database/
│   │   ├── estructura.sql      # Script SQL para crear tablas
│   │   ├── connection.py       # Conexión a base de datos
│   │   └── models.py           # Modelos SQLAlchemy
│   ├── schemas/
│   │   └── product.py          # Esquemas Pydantic
│   ├── crud/
│   │   └── product.py          # Operaciones CRUD
│   └── routes/
│       └── products.py         # Endpoints de la API
│
├── frontend-update/
│   ├── src/
│   │   ├── App.tsx             # Componente principal
│   │   ├── config/
│   │   │   └── api.ts          # Configuración de API
│   │   ├── types/
│   │   │   └── product.ts      # Tipos TypeScript
│   │   ├── services/
│   │   │   └── productService.ts  # Servicio de API
│   │   └── components/
│   │       ├── ProductForm.tsx
│   │       ├── ProductList.tsx
│   │       ├── ConfirmModal.tsx
│   │       └── Notification.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env.example
│   └── vercel.json             # Configuración para Vercel
│
└── README.md
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### 1️⃣ Configurar Base de Datos

1. Instala PostgreSQL y crea una base de datos:
```sql
CREATE DATABASE autocobro_db;
```

2. Copia el contenido de `backend/database/estructura.sql` y ejecútalo en pgAdmin 4 o en tu cliente PostgreSQL preferido.

### 2️⃣ Configurar Backend

1. Navega a la carpeta del backend:
```powershell
cd backend
```

2. Crea un entorno virtual:
```powershell
python -m venv venv
.\.venv\Scripts\Activate.ps1
```

3. Instala las dependencias:
```powershell
pip install -r requirements.txt
```

4. Copia el archivo de ejemplo de variables de entorno:
```powershell
Copy-Item .env.example .env
```

5. Edita el archivo `.env` y configura tu conexión a PostgreSQL:
```env
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/gestion-productos
ALLOWED_ORIGINS=http://localhost:5173
HOST=0.0.0.0
PORT=8000
RELOAD=true
```

> ⚠️ **Nota importante**: Si tienes problemas con la codificación del archivo `.env` en Windows, usa el script `start.ps1` que configura las variables de entorno automáticamente.

6. Inicia el servidor usando el script PowerShell:
```powershell
.\start.ps1
```

O alternativamente, configura las variables manualmente:
```powershell
$env:DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/gestion-productos"
$env:ALLOWED_ORIGINS="*"
& ".venv\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

El backend estará disponible en: `http://localhost:8000`
Documentación API: `http://localhost:8000/docs`

### 3️⃣ Configurar Frontend

1. Navega a la carpeta del frontend:
```powershell
cd frontend-update
```

2. Instala las dependencias:
```powershell
npm install
```

3. Copia el archivo de ejemplo de variables de entorno:
```powershell
Copy-Item .env.example .env
```

4. Edita el archivo `.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

5. Inicia el servidor de desarrollo:
```powershell
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📡 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products/` | Obtener todos los productos |
| GET | `/api/v1/products/{id}` | Obtener un producto por ID |
| POST | `/api/v1/products/` | Crear un nuevo producto |
| PUT | `/api/v1/products/{id}` | Actualizar un producto |
| DELETE | `/api/v1/products/{id}` | Eliminar un producto |

### Ejemplo de Request (POST)

```json
{
  "name": "Laptop Gaming",
  "price": 1299.99,
  "is_offer": true
}
```

### Ejemplo de Response

```json
{
  "id": 1,
  "name": "Laptop Gaming",
  "price": 1299.99,
  "is_offer": true,
  "created_at": "2024-12-03T10:00:00Z",
  "updated_at": "2024-12-03T10:00:00Z"
}
```

## 🚢 Deploy en Producción

### Deploy del Backend en Railway

1. Crea una cuenta en [Railway.app](https://railway.app)

2. Crea un nuevo proyecto y agrega PostgreSQL

3. Conecta tu repositorio de GitHub

4. Configura las variables de entorno en Railway:
   - `DATABASE_URL` - Se configura automáticamente con PostgreSQL
   - `ALLOWED_ORIGINS` - URL de tu frontend en Vercel (ej: `https://tu-app.vercel.app`)
   - `HOST` - `0.0.0.0`
   - `PORT` - Se configura automáticamente
   - `RELOAD` - `false`

5. Railway detectará automáticamente el `Procfile` y desplegará la aplicación

6. Copia la URL de tu backend (ej: `https://tu-backend.up.railway.app`)

7. Ejecuta el script SQL en la base de datos de Railway:
   - Ve a la pestaña "Data" de PostgreSQL en Railway
   - Ejecuta el contenido de `backend/database/estructura.sql`

### Deploy del Frontend en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)

2. Importa tu repositorio de GitHub

3. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend-update`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Configura las variables de entorno en Vercel:
   - `VITE_API_BASE_URL` - URL de tu backend en Railway (ej: `https://tu-backend.up.railway.app`)

5. Despliega la aplicación

6. Actualiza la variable `ALLOWED_ORIGINS` en Railway con la URL de Vercel

## 🔧 Scripts Útiles

### Backend
```powershell
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor de desarrollo
python main.py

# Ejecutar con uvicorn
uvicorn main:app --reload

# Ejecutar tests (si existen)
pytest
```

### Frontend
```powershell
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 🔐 Variables de Entorno

### Backend (.env)
```env
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db
ALLOWED_ORIGINS=http://localhost:5173,https://tu-app.vercel.app
HOST=0.0.0.0
PORT=8000
RELOAD=true
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## 🎯 Características Principales

### Backend
- ✅ Arquitectura modular y escalable
- ✅ Validación de datos con Pydantic
- ✅ ORM con SQLAlchemy
- ✅ CORS configurado
- ✅ Documentación automática con Swagger UI
- ✅ Manejo de errores robusto
- ✅ Preparado para deploy en Railway

### Frontend
- ✅ Componentes reutilizables en React
- ✅ TypeScript para tipado seguro
- ✅ Estado manejado con hooks
- ✅ Notificaciones para feedback al usuario
- ✅ Modal de confirmación para acciones destructivas
- ✅ Diseño responsive
- ✅ Preparado para deploy en Vercel

## 📝 Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**: Backend y frontend completamente separados
2. **Tipado Estático**: TypeScript en frontend, Pydantic en backend
3. **Variables de Entorno**: Configuración flexible para desarrollo y producción
4. **Modularidad**: Código organizado en módulos y componentes reutilizables
5. **Validación**: Validación de datos en ambos lados
6. **Manejo de Errores**: Try-catch y mensajes de error informativos
7. **CORS**: Configurado correctamente para desarrollo y producción
8. **Git**: .gitignore apropiados, archivos de ejemplo para configuración

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en el archivo `.env`
- Asegúrate de haber ejecutado el script SQL

### Error de CORS
- Verifica que `ALLOWED_ORIGINS` en el backend incluya la URL del frontend
- En desarrollo local, usa `*` o la URL específica del frontend

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo
- Verifica la variable `VITE_API_BASE_URL` en el `.env` del frontend
- Verifica la consola del navegador para errores

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en GitHub.

---

**Desarrollado con ❤️ usando FastAPI y React**
