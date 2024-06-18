INSERT INTO rol (rol) VALUES ('admin'), ('vendedor');
INSERT INTO Vendedores (nombre, contraseña, rol_id) VALUES
('John Doe', 'password123', 1),
('Jane Smith', 'qwerty', 1),
('Mike Johnson', 'mypassword', 2);
INSERT INTO Productos (nombre, descripción, precio, stock) VALUES
('Catena Malbec', 'Vino tinto argentino con notas de frutas oscuras y especias', 25.99, 100),
('Trapiche Cabernet Sauvignon', 'Vino tinto argentino con notas de frutas rojas y madera', 19.99, 200),
('Doña Paula Torrontés', 'Vino blanco argentino con notas de frutas cítricas y florales', 14.99, 300),
('Norton Malbec', 'Vino tinto argentino con notas de frutas oscuras y chocolate', 29.99, 50),
('Zuccardi Serie A Malbec', 'Vino tinto argentino con notas de frutas oscuras y especias', 39.99, 20),
('Rutini Cabernet Sauvignon', 'Vino tinto argentino con notas de frutas rojas y madera', 24.99, 150),
('Alamos Torrontés', 'Vino blanco argentino con notas de frutas cítricas y florales', 12.99, 250),
('Luigi Bosca Malbec', 'Vino tinto argentino con notas de frutas oscuras y especias', 34.99, 30);