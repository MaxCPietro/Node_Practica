const express = require('express');
const router = express.Router();
//const path = require('path');
const controladores = require('../controllers/mainController');

router.get('/', controladores.renderHome);
router.get('/clientes', controladores.renderClientes);
router.get('/contacto', controladores.renderContacto);

router.get('/productos', controladores.renderProductos);
router.get('/quienessomos', controladores.renderQuienessomos); 
router.get('/ubicacion', controladores.renderUbicacion);
router.get('/login', controladores.renderLogin);
// admin crud vendedores
router.get('/adminuser', controladores.renderAdminUser);
router.post('/users', controladores.crearUsuario);
router.put('/users/:id', controladores.actualizarUsuario);
router.delete('/users/:id', controladores.eliminarUsuario);
//admin   crud productos
router.get('/adminProduct',controladores.renderAdminProducto);
router.post('products',controladores.crearProducto);
router.put('/products/:id',controladores.actualizarProducto);
router.delete('/products/:id',controladores.eliminarProducto);
//admin crud clientes
router.get('/customers',controladores.renderAdminCliente);  
router.post('/customers',controladores.crearCliente);
router.put('/customers/:id',controladores.actualizarCliente);
router.delete('/customers/:id',controladores.eliminarCliente);

module.exports = router;
