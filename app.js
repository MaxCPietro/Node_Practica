//Server HTTP con Express
const express = require('express');
const app = express(); //equivale a crear el servidor
const port = 3000 || 8080 || process.env.PORT;

//Definimos las rutas. La parte del método y la parte de la ruta
app.get('/', (req, res) => {
    res.sendFile('./addPedido2.html', {root: __dirname});
});

app.get('/hola', (req, res) => {
    res.send(`Hola estoy en el puerto ${port}`);
});


app.listen(port, () => {   
    console.log(`Example app listening at http://localhost:${port}`);
})