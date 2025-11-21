// Configuración de la API (puedes cambiar la URL según tu backend)
const API_BASE_URL = 'http://127.0.0.1:8000';

const productForm = document.getElementById('productForm');
const resultsContainer = document.getElementById('results');
const modal = document.getElementById('modal');
const searchBtn = document.getElementById('searchBtn');
const verTodosBtn = document.getElementById('verTodosBtn');

let currentProductToDelete = null;

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    setupEventListeners();
});

function setupEventListeners() {
    productForm.addEventListener('submit', handleProductSubmit);
    searchBtn.addEventListener('click', searchProduct);
    verTodosBtn.addEventListener('click', loadAllProducts);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    document.getElementById('modalConfirm').addEventListener('click', confirmDelete);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

// Crear/Actualizar producto
async function handleProductSubmit(e) {
    e.preventDefault();
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemOffer = document.getElementById('itemOffer').checked;

    const productData = { name: itemName, price: itemPrice, is_offer: itemOffer };

    try {
        const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (response.ok) {
            showNotification('✅ Producto guardado exitosamente!', 'success');
            productForm.reset();
            loadAllProducts();
        } else {
            const error = await response.json();
            showNotification(`❌ Error: ${error.detail}`, 'error');
        }
    } catch (error) {
        showNotification(`❌ Error de conexión: ${error.message}`, 'error');
    }
}

// Buscar producto
async function searchProduct() {
    const itemId = document.getElementById('searchId').value;
    const query = document.getElementById('searchQuery').value;
    if (!itemId) {
        showNotification('⚠️ Por favor ingresa un ID de producto', 'warning');
        return;
    }
    try {
        let url = `${API_BASE_URL}/items/${itemId}`;
        if (query) url += `?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (response.ok) {
            const product = await response.json();
            displayProducts([product], `Producto ID: ${itemId}`);
        } else if (response.status === 404) {
            showNotification(`❌ Producto con ID ${itemId} no encontrado`, 'error');
            resultsContainer.innerHTML = '<p class="placeholder">Producto no encontrado</p>';
        } else {
            const error = await response.json();
            showNotification(`❌ Error: ${error.detail}`, 'error');
        }
    } catch (error) {
        showNotification(`❌ Error de conexión: ${error.message}`, 'error');
    }
}

// Cargar todos los productos
async function loadAllProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/items/`);
        if (response.ok) {
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                displayProducts(data.items, `Todos los productos (${data.total})`);
            } else {
                resultsContainer.innerHTML = '<p class="placeholder">No hay productos guardados</p>';
            }
        } else {
            showNotification('❌ Error al cargar productos', 'error');
        }
    } catch (error) {
        showNotification(`❌ Error de conexión: ${error.message}`, 'error');
    }
}

// Renderizar productos
function displayProducts(products, title) {
    let html = `<h3>${title}</h3><div class="products-grid">`;
    products.forEach(product => {
        const priceFormatted = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price);
        html += `
            <div class="product-card">
                <div class="product-header">
                    <h4>${product.name}</h4>
                    <span class="product-id">ID: ${product.item_id}</span>
                </div>
                <div class="product-price">
                    ${priceFormatted}
                    ${product.is_offer ? '<span class="offer-badge">🏷️ OFERTA</span>' : ''}
                </div>
                <div class="product-actions">
                    <button onclick="editProduct(${product.item_id}, '${product.name}', ${product.price}, ${product.is_offer})" class="btn btn-sm btn-secondary">✏️ Editar</button>
                    <button onclick="deleteProduct(${product.item_id})" class="btn btn-sm btn-danger">🗑️ Eliminar</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// Editar producto
function editProduct(id, name, price, isOffer) {
    document.getElementById('itemId').value = id;
    document.getElementById('itemName').value = name;
    document.getElementById('itemPrice').value = price;
    document.getElementById('itemOffer').checked = isOffer;
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    showNotification('📝 Datos cargados para edición', 'info');
}

// Eliminar producto
function deleteProduct(id) {
    currentProductToDelete = id;
    document.getElementById('modalTitle').textContent = 'Confirmar Eliminación';
    document.getElementById('modalMessage').textContent = `¿Estás seguro de que quieres eliminar el producto con ID ${id}?`;
    modal.style.display = 'flex';
}

async function confirmDelete() {
    if (!currentProductToDelete) return;
    try {
        const response = await fetch(`${API_BASE_URL}/items/${currentProductToDelete}`, { method: 'DELETE' });
        if (response.ok) {
            showNotification('✅ Producto eliminado exitosamente!', 'success');
            loadAllProducts();
        } else {
            const error = await response.json();
            showNotification(`❌ Error: ${error.detail}`, 'error');
        }
    } catch (error) {
        showNotification(`❌ Error de conexión: ${error.message}`, 'error');
    } finally {
        closeModal();
        currentProductToDelete = null;
    }
}

function closeModal() {
    modal.style.display = 'none';
    currentProductToDelete = null;
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}