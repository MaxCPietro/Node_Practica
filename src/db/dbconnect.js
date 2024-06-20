const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'bvm9w5jfvpbdovjwwcoe-mysql.services.clever-cloud.com',
    user: 'u7chsuxpquauaocc',
    password: 'yZznY8t0L1jZakDFTgWD',
    database: 'bvm9w5jfvpbdovjwwcoe',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Prueba de conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the database.');
        connection.release();
    }
});
module.exports = {
	conn: pool.promise()
}