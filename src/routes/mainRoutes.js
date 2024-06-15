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
router.get('/gspedidos', controladores.rendergspedidos)

/*Peticiones GET*/
router.get('/listado',controladores.getListado);



/*PETICIONES POST*/
router.post('/listado',controladores.crearRegistro);

/*PETICIONES PUT(update*/

router.put('/modificar/:id', controladores.getModificar);

router.put('/modificar',controladores.actualizar );

/*PETICIONES DELETE*/
router.delete('/listado', controladores.eliminar);

module.exports = router;