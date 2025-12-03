import { useState, useEffect } from 'react';
import type { ProductCreate } from '../types/product';
import './ProductForm.css';

interface ProductFormProps {
  onSubmit: (product: ProductCreate) => void;
  initialData?: {
    name: string;
    price: number;
    is_offer: boolean;
  };
  onClear?: () => void;
  isEditing?: boolean;
}

export default function ProductForm({ onSubmit, initialData, onClear, isEditing = false }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isOffer, setIsOffer] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price.toString());
      setIsOffer(initialData.is_offer);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('El precio debe ser un número mayor a 0');
      return;
    }

    onSubmit({
      name: name.trim(),
      price: priceNum,
      is_offer: isOffer,
    });

    handleClear();
  };

  const handleClear = () => {
    setName('');
    setPrice('');
    setIsOffer(false);
    onClear?.();
  };

  return (
    <section className="form-section">
      <h2>{isEditing ? '✏️ Actualizar Producto' : '➕ Crear Producto'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="input-group">
          <label htmlFor="itemName">Nombre:</label>
          <input
            type="text"
            id="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={1}
            placeholder="Ej: Laptop Gaming"
          />
        </div>
        <div className="input-group">
          <label htmlFor="itemPrice">Precio:</label>
          <input
            type="number"
            id="itemPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            min="0.01"
            placeholder="Ej: 1299.99"
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              id="itemOffer"
              checked={isOffer}
              onChange={(e) => setIsOffer(e.target.checked)}
            />
            ¿Está en oferta?
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? '💾 Actualizar' : '💾 Crear'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
