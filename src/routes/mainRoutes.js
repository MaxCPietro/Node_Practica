const express = require('express');
const router = express.Router();
//const path = require('path');
const controladores = require('../controllers/mainController');
const middlewares = require( '../middleware/indexMiddleware');

router.get('/', controladores.renderHome);
router.get('/clientes', controladores.renderClientes);
router.get('/contacto', controladores.renderContacto);

router.get('/productos', controladores.renderProductos);
router.get('/quienessomos', controladores.renderQuienessomos); 
router.get('/ubicacion', controladores.renderUbicacion);
router.get('/login', controladores.renderLogin);
// admin crud vendedores
router.get('/adminuser', middlewares.checkAdmin,controladores.renderAdminUser);
router.post('/users', middlewares.checkAdmin,controladores.crearUsuario);
router.put('/users/:id', middlewares.checkAdmin,controladores.actualizarUsuario);
router.delete('/users/:id', middlewares.checkAdmin,controladores.eliminarUsuario);
//admin   crud productos
router.get('/adminProduct',middlewares.checkAdmin, controladores.renderAdminProducto);
router.post('products',middlewares.checkAdmin,controladores.crearProducto);
router.put('/products/:id',middlewares.checkAdmin,controladores.actualizarProducto);
router.delete('/products/:id',middlewares.checkAdmin,controladores.eliminarProducto);
//admin crud clientes
router.get('/customers',middlewares.checkAdmin,controladores.renderAdminCliente);  
router.post('/customers',middlewares.checkAdmin,controladores.crearCliente);
router.put('/customers/:id',middlewares.checkAdmin,controladores.actualizarCliente);
router.delete('/customers/:id',middlewares.checkAdmin,controladores.eliminarCliente);
//login
router.post('/login', controladores.login);
router.get('/logout', controladores.logout)
//ventas
router.get('/neworder',middlewares.checkAuthenticated ,  controladores.renderNewOrder);
router.post('/createorder',middlewares.checkAuthenticated ,  controladores.createOrder);
//pedidos
router.get('/pedidos:pedido_id',middlewares.checkAuthenticated ,  controladores.renderPedido);
module.exports = router;
