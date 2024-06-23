const { conn } = require("../db/dbconnect");

exports.save = (req, res) => {
    const cliente = req.body.cliente;
    const tipo_cliente = req.body.tipo_cliente;
    console.log(cliente, tipo_cliente);

    conn.query('INSERT INTO Clientes SET ?', { nombre: cliente, tipo_cliente: tipo_cliente }, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar el cliente');
            return;
        }
        res.redirect('/cliente');
    });
};
