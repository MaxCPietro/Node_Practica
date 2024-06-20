INSERT INTO rol (rol) VALUES ('admin'), ('vendedor');
INSERT INTO Vendedores (nombre, contraseña, rol_id) VALUES
('admin', '123456', 1),
('vendedor', '123456', 2);
INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES 
('Malbec Norton', 'Vino tinto Malbec de la bodega Norton, de Mendoza.', 750.50, 50),
('Cabernet Sauvignon Alamos', 'Vino tinto Cabernet Sauvignon de la bodega Alamos, de Mendoza.', 650.75, 60),
('Chardonnay Trapiche', 'Vino blanco Chardonnay de la bodega Trapiche, de Mendoza.', 700.00, 45),
('Syrah Finca Las Moras', 'Vino tinto Syrah de la bodega Finca Las Moras, de San Juan.', 680.90, 55),
('Merlot Trivento', 'Vino tinto Merlot de la bodega Trivento, de Mendoza.', 720.30, 40),
('Torrontés Crios', 'Vino blanco Torrontés de la bodega Crios, de Salta.', 670.50, 65),
('Pinot Noir Alma Mora', 'Vino tinto Pinot Noir de la bodega Alma Mora, de San Juan.', 780.40, 30),
('Bonarda Durigutti', 'Vino tinto Bonarda de la bodega Durigutti, de Mendoza.', 760.25, 35),
('Malbec Catena Zapata', 'Vino tinto Malbec de la bodega Catena Zapata, de Mendoza.', 850.00, 25),
('Cabernet Franc El Enemigo', 'Vino tinto Cabernet Franc de la bodega El Enemigo, de Mendoza.', 900.50, 20),
('Sauvignon Blanc Bodega Norton', 'Vino blanco Sauvignon Blanc de la bodega Norton, de Mendoza.', 710.30, 50),
('Tempranillo Finca La Linda', 'Vino tinto Tempranillo de la bodega Finca La Linda, de Mendoza.', 695.60, 55),
('Viognier Don David', 'Vino blanco Viognier de la bodega Don David, de Salta.', 725.50, 40),
('Cabernet Sauvignon Escorihuela Gascón', 'Vino tinto Cabernet Sauvignon de la bodega Escorihuela Gascón, de Mendoza.', 820.75, 30),
('Malbec Luigi Bosca', 'Vino tinto Malbec de la bodega Luigi Bosca, de Mendoza.', 890.80, 20),
('Rosado Santa Julia', 'Vino rosado de la bodega Santa Julia, de Mendoza.', 640.90, 60),
('Cabernet Sauvignon Terrazas de los Andes', 'Vino tinto Cabernet Sauvignon de la bodega Terrazas de los Andes, de Mendoza.', 840.20, 25),
('Chenin Dulce Nature', 'Vino dulce Chenin de la bodega Nature, de Mendoza.', 680.75, 45),
('Malbec Norton Reserve', 'Vino tinto Malbec de la bodega Norton Reserve, de Mendoza.', 950.50, 30),
('Cabernet Sauvignon Navarro Correas', 'Vino tinto Cabernet Sauvignon de la bodega Navarro Correas, de Mendoza.', 775.80, 35);


INSERT INTO Clientes (nombre, telefono, direccion, tipo_cliente) VALUES
('Supermercado La Anónima', '02944-123456', 'Calle Falsa 123, Ciudad A', 'mayorista'),
('Supermercado Carrefour', '011-654321', 'Avenida Siempre Viva 456, Ciudad B', 'mayorista'),
('Supermercado Jumbo', '0221-987654', 'Boulevard del Sol 789, Ciudad C', 'mayorista'),
('Comercio Don Pepe', '0291-456789', 'Calle Luna 111, Ciudad D', 'minorista'),
('Comercio La Esquina', '0261-123789', 'Calle Estrella 222, Ciudad E', 'minorista'),
('Comercio El Sol', '0381-987321', 'Avenida del Valle 333, Ciudad F', 'minorista'),
('Supermercado Disco', '011-456123', 'Avenida Libertador 444, Ciudad G', 'mayorista'),
('Supermercado Coto', '011-789456', 'Calle Mitre 555, Ciudad H', 'mayorista'),
('Supermercado Vea', '0223-321654', 'Calle Belgrano 666, Ciudad I', 'mayorista'),
('Comercio Los Amigos', '0264-654789', 'Avenida Rivadavia 777, Ciudad J', 'minorista'),
('Comercio La Familia', '0341-123654', 'Calle Sarmiento 888, Ciudad K', 'minorista'),
('Comercio El Pueblo', '02954-789123', 'Calle San Martín 999, Ciudad L', 'minorista'),
('Supermercado Libertad', '0387-987456', 'Avenida San Juan 101, Ciudad M', 'mayorista'),
('Supermercado Makro', '011-456987', 'Boulevard Buenos Aires 202, Ciudad N', 'mayorista'),
('Comercio El Rincón', '0351-321987', 'Calle Córdoba 303, Ciudad O', 'minorista'),
('Comercio El Encuentro', '02966-654321', 'Calle Mendoza 404, Ciudad P', 'minorista'),
('Comercio La Unión', '011-789321', 'Avenida Chile 505, Ciudad Q', 'minorista'),
('Supermercado Día', '011-123789', 'Calle Perú 606, Ciudad R', 'mayorista'),
('Supermercado Toledo', '0221-654123', 'Avenida Uruguay 707, Ciudad S', 'mayorista'),
('Comercio Los Vecinos', '011-456321', 'Calle Paraguay 808, Ciudad T', 'minorista');
