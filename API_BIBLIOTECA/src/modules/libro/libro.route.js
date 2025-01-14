const router = require('express').Router();
const libroService = require('./libro.service');

router.get('', async (request, response) => {
    response = await libroService.findAll(response);
});

router.get('/:id', async(request, response) => {
    let { id } = request.params;
    response = await libroService.findById(response, id);
});

router.post('', async (request, response) => {
    let { titulo, autores, descripcion, categoria, precio, sku, edo } = request.body;
    let libro = { titulo, autores, descripcion, categoria, precio, sku, edo };
    response = await libroService.save(response, libro);
});

router.put('/:id', async (request, response) => {
    let { id, titulo, autores, descripcion, categoria, precio, sku, edo } = request.body;
    let libro = { id, titulo, autores, descripcion, categoria, precio, sku, edo };
    response = await libroService.update(response, libro);
});

router.delete('/:id', async (request, response) => {
    let { id } = request.params;
    response = await libroService.remove(response, id);
});

module.exports = router;