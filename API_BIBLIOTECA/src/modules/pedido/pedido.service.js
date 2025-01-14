const pedidoRepo = require('./pedido.repo');
const customResponse = require('../../utils/custom.response');
const { response } = require('express');

const findAll = async response => {
    let list = await pedidoRepo.findAll(response);
    return customResponse.getOk(response, 200, list);
}

const findById = async (response, id) => {
    let found = await pedidoRepo.findById(id);

    return found ? customResponse.getOk(response, 200, found) : customResponse.get404(response);
}

const save = async (response, pedido) => {
    return await pedidoRepo.save(pedido) ?
    customResponse.getOk(response, 201, undefined) :
    customResponse.get400;
}

const update = async (response, pedido) => {
    let found = await pedidoRepo.findById(id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await pedidoRepo.update(pedido) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const updates = async (response, id) => {
    let found = await pedidoRepo.findById(id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await pedidoRepo.remove(id) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const pedidoService = {
    findAll, 
    findById, 
    save, 
    update, 
    updates
}

module.exports = pedidoService;
