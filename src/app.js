//Server HTTP con Express
const express = require('express');
const app = express(); 
require('dotenv').config();
const port = process.env.PORT || 8080;
const methodOverride = require('method-override');
const rutas = require('./routes/mainRoutes');
const path = require('path');

const publicPath = path.join(__dirname, '../public'); //Hacer publicos los archivos de la carpeta public
app.use(express.static(publicPath));
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(methodOverride("_method"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', rutas);

// app.use((req, res, next) => {
//     res.status(404).send('recurso no encontrado 404');
// })

/*abro el puerto de escucha*/
app.listen(port, () => {   
    console.log(`Servidor corriendo http://localhost:${port}`);
})

