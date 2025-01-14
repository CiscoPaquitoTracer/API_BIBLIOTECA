const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); 

const routes = [
    require('./src/modules/libro/libro.route'),
    require('./src/modules/libreria/libreria.route'),
    require('./src/modules/pedido/pedido.route')
]

const API = express();

API.set('port', process.env.API_PORT);

API.use(morgan('dev'));
API.use(express.urlencoded({extended: false})); 
API.use(express.json());
API.use((request, response, next) => {
    response.header('Access-Control-Allow-Origins', '*');
    response.header('Access-Control-Allow-Origins', 'Accept, Content-Type, Authorization');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Allow', 'GET, POST, PUST, DELETE, OPTIONS');
    next();
});

API.use(`${process.env.API_BASE}/libro`, routes[0]);
API.use(`${process.env.API_BASE}/libreria`,routes[1]);
API.use(`${process.env.API_BASE}/pedido`,routes[2]);


API.listen(API.get('port'), () => {
    console.log(`API corriendo en el puerto ${API.get('port')}`);
});