const router = require('express').Router();
const libreriaService = require('./libreria.service');

router.get('', async (request, response) => {
    response = await libreriaService.findAll(response);
});

router.get('/:id', async(request, response) => {
    let { id } = request.params;
    response = await libreriaService.findById(response, id);
});

router.post('', async (request, response) => {
    let { nombre, direccion, telefono, nombre_gerente, edo } = request.body;
    let libreria = { nombre, direccion, telefono, nombre_gerente, edo };
    response = await libreriaService.save(response, libreria);
});

router.put('', async (request, response) => {
    let { id, nombre, direccion, telefono, nombre_gerente, edo } = request.body;
    let libreria = { id, nombre, direccion, telefono, nombre_gerente, edo };
    response = await libreriaService.update(response, libreria);
});

router.delete('/:id', async (request, response) => {
    let { id } = request.params;
    response = await libreriaService.remove(response, id);
});

module.exports = router;