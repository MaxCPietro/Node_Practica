const express = require('express');
const router = express.Router();
//const path = require('path');
const controladores = require('../controllers/mainController');

/*Peticiones GET*/
router.get('/listado',controladores.getListado);

/*router.get('/rutaDinamica2', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../views/dinamico2.html'));;
});*/

/*PETICIONES POST*/
router.post('/listado',controladores.crearRegistro);

/*PETICIONES PUT(update*/

router.put('/modificar/:id', controladores.getModificar);

router.put('/modificar',controladores.actualizar );

/*PETICIONES DELETE*/
router.delete('/listado', controladores.eliminar);

module.exports = router;