const express = require('express');
const router = express.Router();
const path = require('path');

/*Peticiones GET*/
router.get('/rutaDinamica', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../views/dinamico1.html'));;
});

router.get('/rutaDinamica2', (req, res) => {
    res.sendFile(path.resolve(__dirname + './../views/dinamico2.html'));;
});

/*PETICIONES POST*/
router.post('/rutaDinamica2', (req, res) => {
    res.send(`Se hizo algo con el POST ${req.body.nombre}`);
});

/*PETICIONES PUT(update*/

router.put('/rutaDinamica2', (req, res) => {
    res.send(`Se actualizó con el PUT ${req.body.nombreUpdate}`);
});

/*PETICIONES DELETE*/
router.delete('/rutaDinamica2', (req, res) => {
    res.send(`Se elimino con el DELETE ${req.body.delete}`);
});

module.exports = router;