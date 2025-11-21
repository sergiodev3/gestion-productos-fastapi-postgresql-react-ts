"""
Backend FastAPI - CRUD de Productos
====================================
Este es un sistema simple de gestión de productos (AutocobroApp).
Operaciones disponibles: Crear, Leer, Actualizar y Eliminar productos.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Optional
import os

# Cargar variables de entorno desde un archivo .env (solo para desarrollo)
from dotenv import load_dotenv
load_dotenv()

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================

app = FastAPI(
    title="AutocobroApp API",
    description="API para gestionar productos con operaciones CRUD",
    version="1.0.0"
)

# Configurar CORS para permitir peticiones desde el frontend
# Esto es necesario porque el frontend (Live Server) y el backend están en puertos diferentes
# Leer ALLOWED_ORIGINS desde variables de entorno. Puede ser:
# - Una cadena '*' para permitir todos los orígenes
# - Una lista separada por comas: 'http://127.0.0.1:5500,http://localhost:3000'
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins_env.strip() == "*":
    allow_origins = ["*"]
else:
    # Separar por comas y eliminar espacios en blanco
    allow_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# MODELOS DE DATOS (usando Pydantic)
# ============================================================================

class Product(BaseModel):
    """
    Modelo que representa un producto.
    Pydantic valida automáticamente que los datos tengan el formato correcto.
    """
    name: str = Field(..., min_length=1, description="Nombre del producto")
    price: float = Field(..., gt=0, description="Precio del producto (debe ser mayor a 0)")
    is_offer: bool = Field(default=False, description="Indica si el producto está en oferta")
    
    class Config:
        # Ejemplo de cómo se vería un producto en la documentación
        json_schema_extra = {
            "example": {
                "name": "Laptop Gaming",
                "price": 1299.99,
                "is_offer": True
            }
        }


class ProductResponse(Product):
    """
    Modelo de respuesta que incluye el ID del producto.
    Hereda todos los campos de Product y añade item_id.
    """
    item_id: int = Field(..., description="ID único del producto")


class ProductsListResponse(BaseModel):
    """
    Modelo para responder con una lista de productos.
    """
    total: int = Field(..., description="Cantidad total de productos")
    items: list[ProductResponse] = Field(..., description="Lista de productos")


# ============================================================================
# BASE DE DATOS SIMULADA (en memoria)
# ============================================================================

# Diccionario que simula una base de datos
# En una aplicación real, usarías SQLite, PostgreSQL, MongoDB, etc.
products_db: Dict[int, ProductResponse] = {}

# Datos de ejemplo para pruebas (opcional)
# Puedes comentar estas líneas si quieres empezar con la base de datos vacía
products_db[1] = ProductResponse(item_id=1, name="Laptop HP", price=899.99, is_offer=False)
products_db[2] = ProductResponse(item_id=2, name="Mouse Gamer", price=49.99, is_offer=True)
products_db[3] = ProductResponse(item_id=3, name="Teclado Mecánico", price=129.99, is_offer=True)


# ============================================================================
# ENDPOINTS DE LA API
# ============================================================================

@app.get("/")
async def root():
    """
    Endpoint raíz que da la bienvenida.
    Útil para verificar que el servidor está corriendo.
    """
    return {
        "message": "Bienvenido a AutocobroApp API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/items/", response_model=ProductsListResponse)
async def get_all_products():
    """
    Obtiene todos los productos almacenados.
    
    Returns:
        ProductsListResponse: Lista con todos los productos y el total
    """
    items_list = list(products_db.values())
    return ProductsListResponse(
        total=len(items_list),
        items=items_list
    )


@app.get("/items/{item_id}", response_model=ProductResponse)
async def get_product(
    item_id: int,
    q: Optional[str] = Query(None, description="Parámetro de búsqueda opcional (no usado actualmente)")
):
    """
    Obtiene un producto específico por su ID.
    
    Args:
        item_id: ID del producto a buscar
        q: Parámetro de búsqueda opcional (query string)
    
    Returns:
        ProductResponse: El producto encontrado
    
    Raises:
        HTTPException 404: Si el producto no existe
    """
    if item_id not in products_db:
        raise HTTPException(
            status_code=404,
            detail=f"Producto con ID {item_id} no encontrado"
        )
    
    return products_db[item_id]


@app.put("/items/{item_id}", response_model=ProductResponse)
async def create_or_update_product(item_id: int, product: Product):
    """
    Crea un nuevo producto o actualiza uno existente.
    
    Args:
        item_id: ID del producto
        product: Datos del producto (nombre, precio, oferta)
    
    Returns:
        ProductResponse: El producto creado o actualizado
    """
    # Crear el producto con todos los datos
    product_with_id = ProductResponse(
        item_id=item_id,
        name=product.name,
        price=product.price,
        is_offer=product.is_offer
    )
    
    # Guardar en la "base de datos"
    products_db[item_id] = product_with_id
    
    return product_with_id


@app.delete("/items/{item_id}")
async def delete_product(item_id: int):
    """
    Elimina un producto por su ID.
    
    Args:
        item_id: ID del producto a eliminar
    
    Returns:
        dict: Mensaje de confirmación
    
    Raises:
        HTTPException 404: Si el producto no existe
    """
    if item_id not in products_db:
        raise HTTPException(
            status_code=404,
            detail=f"Producto con ID {item_id} no encontrado"
        )
    
    # Eliminar el producto del diccionario
    deleted_product = products_db.pop(item_id)
    
    return {
        "message": f"Producto '{deleted_product.name}' eliminado exitosamente",
        "item_id": item_id
    }


# ============================================================================
# PUNTO DE ENTRADA
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    # Leer configuración desde variables de entorno (o usar valores por defecto)
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    reload_env = os.getenv("RELOAD", "true").lower()
    reload_flag = reload_env in ("1", "true", "yes", "y")

    # Ejecutar el servidor con la configuración obtenida
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=reload_flag
    )
