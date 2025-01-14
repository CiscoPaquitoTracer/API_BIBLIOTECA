const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

pool.getConnection((error, connection)=>{
    if (error) {
        console.log('Error en la consola de datos: ${error}');
    }
    if (condition) {
        connection.relase();
        return;
    }
});

module.exports = pool