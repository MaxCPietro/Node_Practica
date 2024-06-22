const express = require('express');
const router = express.Router();
//const path = require('path');
const controladores = require('../controllers/mainController');
const middlewares = require( '../middleware/indexMiddleware');
const {conn}  = require("../db/dbconnect");

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



// Ruta para mostrar registros (GET)
router.get('/pedidos', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT Pedidos.id,Clientes.nombre AS cliente_id,Vendedores.nombre AS vendedor_id,Pedidos.fecha_pedido,Pedidos.total FROM Pedidos JOIN Clientes ON Pedidos.cliente_id = Clientes.id JOIN Vendedores ON Pedidos.vendedor_id = Vendedores.id;');
        const user = req.session.user;
        res.render('pedidos', { results: results , user});
    } catch (err) {
        console.error('Error executing query:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id); // Verifica que el ID esté siendo recibido correctamente
    try {
        // Eliminar los registros dependientes en DetallePedidos
        await conn.query('DELETE FROM DetallePedidos WHERE pedido_id = ?', [id]);
        
        // Eliminar el registro en Pedidos
        await conn.query('DELETE FROM Pedidos WHERE id = ?', [id]);
        
        // Redirigir a la lista de pedidos después de eliminar
        res.redirect('/pedidos'); 
    } catch (err) {
        console.error('Error executing query:', err.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
