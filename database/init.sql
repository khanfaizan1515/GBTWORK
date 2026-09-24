CREATE DATABASE IF NOT EXISTS goley_bhai_timber;
USE goley_bhai_timber;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) DEFAULT '🪵',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Product Data
INSERT INTO products (name, description, icon) VALUES
('Teak Wood', 'Quality teak wood suitable for furniture, doors and other woodworking applications.', '🌳'),
('Timber', 'Reliable timber products for construction and various woodworking requirements.', '🪵'),
('Wood Products', 'Wood solutions selected according to customer requirements and applications.', '🏠');