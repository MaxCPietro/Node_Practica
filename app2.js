//Serividor Estatico web hhtp
//Escucha peticiones HTTP con el método nativo
//Un servidor estático envía un html directamente como está
//utilizo un modulo nativo
const http = require('http');
const fs = require('fs');

//levanto el servidor
const server = http.createServer((req, res) => {
    const archivo = fs.readFileSync('./addPedido2.html', 'utf-8');
    res.end(archivo);

    /*res.writeHead(200, {
        'content-Type' : 'text/html'
    })
    res.end('<h1>Hola mundo</h1>');*/
});

//El servidor escucha en el puerto 3000
//El listen empeiza a escuchar activamente lo que está ocurriendo.
server.listen(3000, () => {
    console.log('Escuchando el puerto 3000'); //es para darnos cuenta que el servidor está listo
});