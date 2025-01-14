const { response } = require('express');

let body = {};

const getOk = (response, code, data) => {
    body = {};

    body.message = 'Operacion exitosa';
    body.status = code === 200 ? 'OK' : 'CREATED';
    body.code = code;
    if(data){
        body.data = data;
    }

    return response.status(code).json(body)
}

const get400 = response => {
    body = {};

    body.message = 'Error al realizar la operación';
    body.status = 'BAD_REQUEST';
    body.code = 400;

    return response.status(body.code).json(body);
}

const get404 = response => {
    body = {};

    body.message = 'Recurso no encontrado';
    body.status = 'NOT_FOUND';
    body.code = 404;

    return response.status(body.code).json(body);
}

const customResponse = {
    getOk,
    get400,
    get404
}

module.exports = customResponse;