const router = require('express').Router();
const pedidoService = require('./pedido.service');

router.get('', async (request, response) => {
    response = await pedidoService.findAll(response);
});

router.get('/:id', async(request, response) => {
    let { id } = request.params;
    response = await pedidoService.findById(response, id);
});

router.post('', async (request, response) => {
    let { libreria_id, libro_id, cantidad, total, folio_pedido } = request.body;
    let pedido = {  libreria_id, libro_id, cantidad, total, folio_pedido };
    response = await pedidoService.save(response, pedido);
});

router.put('', async (request, response) => {
    let { id, libreria_id, libro_id, cantidad, total, folio_pedido } = request.body;
    let pedido = { id, libreria_id, libro_id, cantidad, total, folio_pedido };
    response = await pedidoService.update(response, pedido);
});

router.delete('/:id', async (request, response) => {
    let { id } = request.params;
    response = await pedidoService.remove(response, id);
});

module.exports = router;