import { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ConfirmModal from './components/ConfirmModal';
import Notification from './components/Notification';
import { productService } from './services/productService';
import type { Product, ProductCreate, Notification as NotificationType } from './types/product';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: number | null }>({
    isOpen: false,
    productId: null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar productos por nombre
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data.items);
    } catch (error) {
      showNotification(
        `❌ Error al cargar productos: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateProduct = async (product: ProductCreate) => {
    try {
      await productService.create(product);
      showNotification('✅ Producto creado exitosamente', 'success');
      loadProducts();
    } catch (error) {
      showNotification(
        `❌ Error al crear producto: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error'
      );
    }
  };

  const handleUpdateProduct = async (product: ProductCreate) => {
    if (!editingProduct) return;

    try {
      await productService.update(editingProduct.id, product);
      showNotification('✅ Producto actualizado exitosamente', 'success');
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      showNotification(
        `❌ Error al actualizar producto: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error'
      );
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id: number) => {
    setDeleteModal({ isOpen: true, productId: id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.productId) return;

    try {
      await productService.delete(deleteModal.productId);
      showNotification('✅ Producto eliminado exitosamente', 'success');
      loadProducts();
    } catch (error) {
      showNotification(
        `❌ Error al eliminar producto: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error'
      );
    } finally {
      setDeleteModal({ isOpen: false, productId: null });
    }
  };

  const showNotification = (message: string, type: NotificationType['type']) => {
    setNotification({ message, type });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Gestor de productos</h1>
        <p>CRUD de Productos con React + TypeScript + FastAPI</p>
      </header>

      <main className="app-main">
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          initialData={
            editingProduct
              ? {
                  name: editingProduct.name,
                  price: editingProduct.price,
                  is_offer: editingProduct.is_offer,
                }
              : undefined
          }
          onClear={() => setEditingProduct(null)}
          isEditing={!!editingProduct}
        />

        {/* Campo de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Buscar producto por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <ProductList
          products={filteredProducts}
          loading={loading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </main>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, productId: null })}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
