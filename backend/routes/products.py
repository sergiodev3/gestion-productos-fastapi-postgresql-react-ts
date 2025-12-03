"""
Product routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from database.connection import get_db
from schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductsListResponse
from crud import product as crud_product

router = APIRouter(
    prefix="/products",
    tags=["products"]
)


@router.get("/", response_model=ProductsListResponse)
async def get_all_products(
    skip: int = Query(0, ge=0, description="Número de registros a saltar"),
    limit: int = Query(100, ge=1, le=100, description="Número máximo de registros a devolver"),
    is_offer: Optional[bool] = Query(None, description="Filtrar por productos en oferta"),
    db: Session = Depends(get_db)
):
    """
    Obtener todos los productos con paginación opcional.
    
    - **skip**: Número de registros a saltar (para paginación)
    - **limit**: Número máximo de registros a devolver
    - **is_offer**: Filtrar solo productos en oferta (true/false)
    """
    products = crud_product.get_products(db, skip=skip, limit=limit, is_offer=is_offer)
    total = crud_product.get_products_count(db, is_offer=is_offer)
    
    # Convertir modelos SQLAlchemy a Pydantic
    products_response = [ProductResponse.model_validate(p) for p in products]
    
    return ProductsListResponse(
        total=total,
        items=products_response
    )


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un producto específico por su ID.
    """
    db_product = crud_product.get_product_by_id(db, product_id)
    
    if not db_product:
        raise HTTPException(
            status_code=404,
            detail=f"Producto con ID {product_id} no encontrado"
        )
    
    return db_product


@router.post("/", response_model=ProductResponse, status_code=201)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo producto.
    """
    return crud_product.create_product(db, product)


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un producto existente.
    """
    db_product = crud_product.update_product(db, product_id, product)
    
    if not db_product:
        raise HTTPException(
            status_code=404,
            detail=f"Producto con ID {product_id} no encontrado"
        )
    
    return db_product


@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un producto.
    """
    db_product = crud_product.delete_product(db, product_id)
    
    if not db_product:
        raise HTTPException(
            status_code=404,
            detail=f"Producto con ID {product_id} no encontrado"
        )
    
    return {
        "message": f"Producto '{db_product.name}' eliminado exitosamente",
        "id": product_id
    }
