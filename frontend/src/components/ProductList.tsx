import type { Product } from '../types/product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({ products, loading, onEdit, onDelete }: ProductListProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (loading) {
    return (
      <section className="results-section">
        <h2>📦 Productos</h2>
        <div className="loading">Cargando productos...</div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="results-section">
        <h2>📦 Productos</h2>
        <div className="placeholder">No hay productos guardados</div>
      </section>
    );
  }

  return (
    <section className="results-section">
      <h2>📦 Productos ({products.length})</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h4>{product.name}</h4>
              <span className="product-id">ID: {product.id}</span>
            </div>
            <div className="product-price">
              {formatPrice(product.price)}
              {product.is_offer && (
                <span className="offer-badge">🏷️ OFERTA</span>
              )}
            </div>
            <div className="product-dates">
              <small>Creado: {new Date(product.created_at).toLocaleDateString('es-ES')}</small>
            </div>
            <div className="product-actions">
              <button
                onClick={() => onEdit(product)}
                className="btn btn-sm btn-edit"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="btn btn-sm btn-delete"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
