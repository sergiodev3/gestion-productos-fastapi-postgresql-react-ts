"""
Backend FastAPI - CRUD de Productos con PostgreSQL
===================================================
Sistema de gestión de productos (AutocobroApp) refactorizado.
Operaciones CRUD con base de datos PostgreSQL.
Estructura modular y preparado para deploy en Railway.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from config import settings
from routes import products
from database.connection import engine, Base

# Cargar variables de entorno (opcional en producción)
load_dotenv(override=False)

# Crear tablas en la base de datos (solo en desarrollo)
# En producción, usar migraciones con Alembic
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not create tables: {e}")

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# ROUTES
# ============================================================================

# Incluir rutas de productos
app.include_router(products.router, prefix="/api/v1")


# ============================================================================
# ENDPOINTS RAÍZ
# ============================================================================

@app.get("/")
async def root():
    """
    Endpoint raíz que da la bienvenida.
    Útil para verificar que el servidor está corriendo.
    """
    return {
        "message": "Bienvenido a AutocobroApp API",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint para monitoreo.
    """
    return {
        "status": "healthy",
        "version": settings.APP_VERSION
    }


# ============================================================================
# PUNTO DE ENTRADA
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD
    )
