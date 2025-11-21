# 🛒 Gestión de Productos - FastAPI Básico

> Proyecto educativo para aprender los fundamentos de **FastAPI** construyendo una API REST con operaciones CRUD.

Este proyecto demuestra cómo crear un backend moderno con FastAPI y conectarlo con un frontend básico usando HTML, CSS y JavaScript vanilla. Ideal para principiantes que quieren entender cómo funcionan las APIs REST y la comunicación cliente-servidor.

## 🎯 Objetivos de Aprendizaje

- ✅ Crear una API REST con FastAPI
- ✅ Implementar operaciones CRUD (Create, Read, Update, Delete)
- ✅ Configurar CORS para permitir peticiones desde el frontend
- ✅ Validar datos con Pydantic
- ✅ Usar variables de entorno para configuración
- ✅ Documentación automática con Swagger UI
- ✅ Conectar un frontend con fetch API

## 📋 Requisitos Previos

- **Python 3.8+**
- **pip** o **uv** (gestor de paquetes Python)
- Navegador web moderno
- Editor de código (VS Code recomendado)
- **Live Server** (extensión de VS Code) para el frontend

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/sergiodev3/gestion-productos-fastapi-basic-ejem.git
cd gestion-productos-fastapi-basic-ejem
```

### 2. Configurar el entorno virtual y dependencias

```bash
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate
# En Linux/Mac:
source .venv/bin/activate

# Instalar dependencias
cd backend
pip install -r requirements.txt
```

### 3. Configurar variables de entorno (opcional)

El archivo `backend/.env` contiene la configuración del servidor:

```env
HOST=127.0.0.1
PORT=8000
RELOAD=true
ALLOWED_ORIGINS=http://127.0.0.1:5500,http://127.0.0.1:5501
```

Puedes modificar estos valores según tus necesidades. Para desarrollo, `ALLOWED_ORIGINS` acepta múltiples orígenes separados por comas, o usa `*` para permitir todos.

## ▶️ Ejecutar la Aplicación

### Backend (FastAPI)

**Opción 1: Ejecutar con Python**
```bash
cd backend
python main.py
```

**Opción 2: Ejecutar con Uvicorn (recomendado)**
```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

El servidor estará disponible en `http://127.0.0.1:8000`

### Frontend (HTML/CSS/JS)

1. Abre VS Code en la carpeta del proyecto
2. Instala la extensión **Live Server** si no la tienes
3. Haz clic derecho en `frontend/index.html`
4. Selecciona **"Open with Live Server"**

El frontend se abrirá automáticamente en tu navegador (generalmente en `http://127.0.0.1:5500`)

## 📚 Documentación de la API

FastAPI genera documentación interactiva automáticamente. Una vez que el backend esté corriendo:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## 🔧 API Endpoints

| Método | Endpoint | Descripción | Ejemplo |
|--------|----------|-------------|---------|
| `GET` | `/` | Mensaje de bienvenida | - |
| `GET` | `/items/` | Listar todos los productos | - |
| `GET` | `/items/{item_id}` | Obtener producto por ID | `/items/1` |
| `PUT` | `/items/{item_id}` | Crear o actualizar producto | Body: `{"name": "Laptop", "price": 999.99, "is_offer": false}` |
| `DELETE` | `/items/{item_id}` | Eliminar producto | `/items/1` |

## 📦 Estructura del Proyecto

```
.
├── backend/
│   ├── main.py              # API FastAPI con endpoints CRUD
│   ├── requirements.txt     # Dependencias Python
│   └── .env                 # Configuración (HOST, PORT, CORS)
├── frontend/
│   ├── index.html          # Interfaz de usuario
│   ├── script.js           # Lógica y fetch API
│   └── styles.css          # Estilos CSS
├── .gitignore
└── README.md
```

## 💡 Conceptos Clave Explicados

### 🚀 FastAPI
Framework web moderno para Python que permite crear APIs de forma rápida y eficiente:
- **Documentación automática** (Swagger/OpenAPI)
- **Validación de datos** integrada con Pydantic
- **Alto rendimiento** comparable a NodeJS y Go
- **Type hints** para mejor autocompletado

### 🔒 CORS (Cross-Origin Resource Sharing)
Mecanismo de seguridad que permite que el frontend (puerto 5500) se comunique con el backend (puerto 8000):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### ✅ Pydantic Models
Define y valida la estructura de los datos automáticamente:
```python
class Product(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    is_offer: bool = False
```

### 🌍 Variables de Entorno
Configuración externalizada mediante archivo `.env`:
- **HOST**: Dirección del servidor
- **PORT**: Puerto de escucha
- **RELOAD**: Auto-reload en desarrollo
- **ALLOWED_ORIGINS**: Orígenes permitidos para CORS

## 🧪 Probar la API

### 1. Interfaz Web (frontend)
Usa el formulario para gestionar productos de forma visual.

### 2. Swagger UI (recomendado)
1. Ve a [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
2. Haz clic en cualquier endpoint
3. Clic en **"Try it out"**
4. Completa los parámetros
5. Clic en **"Execute"**

### 3. cURL (línea de comandos)

```bash
# Crear un producto
curl -X PUT "http://127.0.0.1:8000/items/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop HP","price":899.99,"is_offer":false}'

# Listar todos los productos
curl http://127.0.0.1:8000/items/

# Obtener un producto
curl http://127.0.0.1:8000/items/1

# Eliminar un producto
curl -X DELETE http://127.0.0.1:8000/items/1
```

### 4. JavaScript Fetch API (frontend)

```javascript
// Obtener todos los productos
const response = await fetch('http://127.0.0.1:8000/items/');
const data = await response.json();
console.log(data);
```

## 🎓 ¿Qué Aprenderás?

### Backend (FastAPI)
- ✅ Crear rutas y endpoints RESTful
- ✅ Validar datos con Pydantic
- ✅ Manejar errores HTTP (404, 422, etc.)
- ✅ Configurar CORS
- ✅ Usar variables de entorno
- ✅ Documentar APIs automáticamente

### Frontend (Vanilla JS)
- ✅ Hacer peticiones HTTP con `fetch()`
- ✅ Manejar respuestas JSON
- ✅ Operaciones CRUD desde el cliente
- ✅ Manejo de errores de red
- ✅ Interacción con APIs REST

## 📝 Notas Importantes

### Base de Datos
Este proyecto usa un **diccionario Python** como base de datos en memoria:
- ✅ **Ventajas**: Simple, sin dependencias adicionales, ideal para aprender
- ⚠️ **Limitación**: Los datos se pierden al reiniciar el servidor

Para persistencia real, considera:
- **SQLite** con SQLAlchemy (local, sin servidor)
- **PostgreSQL** (producción)
- **MongoDB** (NoSQL)

### Productos de Ejemplo
El backend incluye 3 productos de ejemplo al iniciar. Para empezar con la base vacía, comenta estas líneas en `backend/main.py`:

```python
# products_db[1] = ProductResponse(...)
# products_db[2] = ProductResponse(...)
# products_db[3] = ProductResponse(...)
```

## 🚧 Próximos Pasos

Si quieres seguir aprendiendo, intenta implementar:

1. **Base de datos SQLite** con SQLAlchemy
2. **Autenticación** con JWT tokens
3. **Paginación** (`/items/?skip=0&limit=10`)
4. **Filtros de búsqueda** por nombre o precio
5. **Tests unitarios** con pytest
6. **Validaciones adicionales** (ej: nombre único)
7. **Logging** de peticiones
8. **Despliegue** en Railway, Render o Vercel

## 🐛 Solución de Problemas

### ❌ Error de CORS
```
Access to fetch has been blocked by CORS policy
```
**Solución**: Asegúrate de que el origen del Live Server (`http://127.0.0.1:5500` o `5501`) esté en `ALLOWED_ORIGINS` del archivo `.env`.

### ❌ Puerto en uso
```
Address already in use
```
**Solución**: Cambia el puerto en `backend/.env` o cierra la aplicación que usa el puerto 8000.

### ❌ Módulo no encontrado
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solución**: Activa el entorno virtual y ejecuta `pip install -r requirements.txt`.

## 📖 Recursos Recomendados

- [Documentación oficial de FastAPI](https://fastapi.tiangolo.com/) (EN)
- [Tutorial de FastAPI en español](https://fastapi.tiangolo.com/es/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [HTTP Status Codes](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias para mejorar el aprendizaje, abre un **issue** o envía un **pull request**.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

⭐ **Si este proyecto te ayudó a aprender FastAPI, dale una estrella en GitHub!**

Desarrollado con ❤️ para enseñar los fundamentos de FastAPI
