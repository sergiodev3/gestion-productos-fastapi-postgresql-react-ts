-- ============================================================================
-- ESTRUCTURA DE BASE DE DATOS - gestor de productos 
-- ============================================================================
-- Este script crea las tablas necesarias para el CRUD de productos
-- Base de datos: PostgreSQL
-- Ejecución: Copiar y pegar en pgAdmin 4 Query Tool
-- ============================================================================

-- Eliminar tabla si existe (para desarrollo/testing)
DROP TABLE IF EXISTS products CASCADE;

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    is_offer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_is_offer ON products(is_offer);

-- Comentarios para documentación
COMMENT ON TABLE products IS 'Tabla de productos para el sistema de gestión AutocobroApp';
COMMENT ON COLUMN products.id IS 'Identificador único del producto (auto-incrementable)';
COMMENT ON COLUMN products.name IS 'Nombre del producto';
COMMENT ON COLUMN products.price IS 'Precio del producto (debe ser mayor a 0)';
COMMENT ON COLUMN products.is_offer IS 'Indica si el producto está en oferta';
COMMENT ON COLUMN products.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN products.updated_at IS 'Fecha y hora de última actualización del registro';

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo (opcional - puedes comentar si no los necesitas)
INSERT INTO products (name, price, is_offer) VALUES
    ('Laptop HP', 899.99, FALSE),
    ('Mouse Gamer', 49.99, TRUE),
    ('Teclado Mecánico', 129.99, TRUE),
    ('Monitor 27"', 299.99, FALSE),
    ('Webcam HD', 79.99, TRUE);

-- Verificar que los datos se insertaron correctamente
SELECT * FROM products;

-- ============================================================================
-- QUERIES ÚTILES PARA DESARROLLO
-- ============================================================================

-- Ver todos los productos
-- SELECT * FROM products ORDER BY id;

-- Ver solo productos en oferta
-- SELECT * FROM products WHERE is_offer = TRUE;

-- Contar productos
-- SELECT COUNT(*) as total_productos FROM products;

-- Buscar productos por nombre (búsqueda parcial)
-- SELECT * FROM products WHERE name ILIKE '%laptop%';

-- Actualizar precio de un producto
-- UPDATE products SET price = 849.99 WHERE id = 1;

-- Eliminar un producto
-- DELETE FROM products WHERE id = 5;

-- Reiniciar secuencia de IDs (usar con precaución)
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
