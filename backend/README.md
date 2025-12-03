# Backend - AutocobroApp API

Backend desarrollado con FastAPI y PostgreSQL.

## Estructura del Proyecto

```
backend/
├── main.py                 # Punto de entrada principal
├── config.py               # Configuración y settings
├── requirements.txt        # Dependencias Python
├── .env.example            # Ejemplo de variables de entorno
├── Procfile                # Para deploy en Railway
├── runtime.txt             # Versión de Python
├── database/
│   ├── estructura.sql      # Script SQL para crear tablas
│   ├── connection.py       # Conexión a PostgreSQL
│   └── models.py           # Modelos SQLAlchemy
├── schemas/
│   └── product.py          # Esquemas Pydantic para validación
├── crud/
│   └── product.py          # Operaciones CRUD
└── routes/
    └── products.py         # Endpoints de la API
```

## Instalación Rápida

```powershell
# Crear entorno virtual
python -m venv venv
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
Copy-Item .env.example .env
# Editar .env con tus credenciales

# Ejecutar servidor
python main.py
```

## Endpoints Disponibles

- `GET /` - Health check y bienvenida
- `GET /health` - Estado del servidor
- `GET /api/v1/products/` - Listar todos los productos
- `GET /api/v1/products/{id}` - Obtener producto por ID
- `POST /api/v1/products/` - Crear nuevo producto
- `PUT /api/v1/products/{id}` - Actualizar producto
- `DELETE /api/v1/products/{id}` - Eliminar producto

## Documentación

Una vez ejecutando el servidor, accede a:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
