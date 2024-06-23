const {conn}  = require("../db/dbconnect");

exports.save = (req, res) => {
    const cliente = req.body.cliente;
    const tipo_cliente = req.body.tipo_cliente;
    console.log(user, rol);

    conn.query('INSERT INTO Clientes SET ?', {cliente:cliente, tipo_cliente:tipo_cliente}, (err, results) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/cliente');
    })
}