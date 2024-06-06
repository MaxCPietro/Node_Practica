//Server HTTP con Express
const express = require('express');
const app = express(); //equivale a crear el servidor
const port = 3000 || 8080 || process.env.PORT;

app.use(express.static(__dirname + '/public'));

//Definimos las rutas. La parte del método y la parte de la ruta
/*app.get('/', (req, res) => {
    res.sendFile('/public/addPedido.html', {root: __dirname});
});*/

app.get('/rutaDinamica', (req, res) => {
    res.sendFile('/src/views/dinamico1.html', {root: __dirname});;
});

app.get('/rutaDinamica2', (req, res) => {
    res.sendFile('/src/views/dinamico2.html', {root: __dirname});;
});

app.listen(port, () => {   
    console.log(`Example app listening at http://localhost:${port}`);
})