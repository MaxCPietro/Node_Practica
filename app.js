//Server HTTP con Express
const express = require('express');
const app = express(); //equivale a crear el servidor
const port = 3000 || 8080 || process.env.PORT;
const override = require('method-override');
const rutas = require('./src/routes/mainRoutes');

//Midelwares
app.use(express.static(__dirname + '/public')); //llamo a la página principal
app.use(express.urlencoded({ extended: true }));
app.use(override('_metodo'));

app.use('/', rutas);

app.use((req, res, next) => {
    res.status(404).send('recurso no encontrado 404');
})

/*abro el puerto de escucha*/
app.listen(port, () => {   
    console.log(`Example app listening at http://localhost:${port}`);
})

