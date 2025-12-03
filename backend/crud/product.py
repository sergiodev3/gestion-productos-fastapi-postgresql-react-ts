"""
CRUD operations for products
"""
from sqlalchemy.orm import Session
from typing import List, Optional
from database.models import Product
from schemas.product import ProductCreate, ProductUpdate


def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
    """Obtener un producto por ID"""
    return db.query(Product).filter(Product.id == product_id).first()


def get_products(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    is_offer: Optional[bool] = None
) -> List[Product]:
    """Obtener lista de productos con paginación opcional"""
    query = db.query(Product)
    
    if is_offer is not None:
        query = query.filter(Product.is_offer == is_offer)
    
    return query.offset(skip).limit(limit).all()


def get_products_count(db: Session, is_offer: Optional[bool] = None) -> int:
    """Contar productos"""
    query = db.query(Product)
    
    if is_offer is not None:
        query = query.filter(Product.is_offer == is_offer)
    
    return query.count()


def create_product(db: Session, product: ProductCreate) -> Product:
    """Crear un nuevo producto"""
    db_product = Product(
        name=product.name,
        price=product.price,
        is_offer=product.is_offer
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(
    db: Session, 
    product_id: int, 
    product_update: ProductUpdate
) -> Optional[Product]:
    """Actualizar un producto existente"""
    db_product = get_product_by_id(db, product_id)
    
    if not db_product:
        return None
    
    # Actualizar solo los campos proporcionados
    update_data = product_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int) -> Optional[Product]:
    """Eliminar un producto"""
    db_product = get_product_by_id(db, product_id)
    
    if not db_product:
        return None
    
    db.delete(db_product)
    db.commit()
    return db_product
