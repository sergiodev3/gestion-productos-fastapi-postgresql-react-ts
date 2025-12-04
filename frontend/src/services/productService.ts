import { API_URL } from '../config/api';
import type { Product, ProductCreate, ProductUpdate, ProductsListResponse } from '../types/product';

/**
 * Servicio para gestionar productos
 */
class ProductService {
  private baseUrl = `${API_URL}/products`;

  /**
   * Obtener todos los productos
   */
  async getAll(skip: number = 0, limit: number = 100, isOffer?: boolean): Promise<ProductsListResponse> {
    let url = `${this.baseUrl}/?skip=${skip}&limit=${limit}`;
    if (isOffer !== undefined) {
      url += `&is_offer=${isOffer}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    return response.json();
  }

  /**
   * Obtener un producto por ID
   */
  async getById(id: number): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      throw new Error('Error al cargar el producto');
    }
    return response.json();
  }

  /**
   * Crear un nuevo producto
   */
  async create(product: ProductCreate): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al crear el producto');
    }
    return response.json();
  }

  /**
   * Actualizar un producto existente
   */
  async update(id: number, product: ProductUpdate): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al actualizar el producto');
    }
    return response.json();
  }

  /**
   * Eliminar un producto
   */
  async delete(id: number): Promise<{ message: string; id: number }> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al eliminar el producto');
    }
    return response.json();
  }
}

export const productService = new ProductService();
