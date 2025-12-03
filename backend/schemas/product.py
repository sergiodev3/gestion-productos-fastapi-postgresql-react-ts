"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    """Schema base para producto"""
    name: str = Field(..., min_length=1, max_length=255, description="Nombre del producto")
    price: float = Field(..., gt=0, description="Precio del producto (debe ser mayor a 0)")
    is_offer: bool = Field(default=False, description="Indica si el producto está en oferta")


class ProductCreate(ProductBase):
    """Schema para crear un producto"""
    pass


class ProductUpdate(ProductBase):
    """Schema para actualizar un producto"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    price: Optional[float] = Field(None, gt=0)
    is_offer: Optional[bool] = None


class ProductResponse(ProductBase):
    """Schema para respuesta de producto"""
    id: int = Field(..., description="ID único del producto")
    created_at: datetime = Field(..., description="Fecha de creación")
    updated_at: datetime = Field(..., description="Fecha de actualización")
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Laptop Gaming",
                "price": 1299.99,
                "is_offer": True,
                "created_at": "2024-01-01T10:00:00",
                "updated_at": "2024-01-01T10:00:00"
            }
        }


class ProductsListResponse(BaseModel):
    """Schema para lista de productos"""
    total: int = Field(..., description="Cantidad total de productos")
    items: list[ProductResponse] = Field(..., description="Lista de productos")
