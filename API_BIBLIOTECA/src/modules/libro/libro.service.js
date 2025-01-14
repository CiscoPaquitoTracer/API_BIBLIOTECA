const libroRepo = require('./libro.repo');
const customResponse = require('../../utils/custom.response');
const { response } = require('express');

const findAll = async response => {
    let list = await libroRepo.findAll(response);
    return customResponse.getOk(response, 200, list);
}

const findById = async (response, id) => {
    let found = await libroRepo.findById(id);
    return found ? customResponse.getOk(response, 200, found) : customResponse.get404(response);
}

const save = async (response, libro) => {
    return await libroRepo.save(libro) ?
    customResponse.getOk(response, 200, undefined) :
    customResponse.get400;
}

const update = async (response, libro) => {
    let found = await libroRepo.findById(id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await libroRepo.update(libro) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const remove = async (response, id) => {
    let found = await libroRepo.findById(id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await libroRepo.remove(id) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const libroService = {
    findAll, 
    findById, 
    save, 
    update, 
    remove
}

module.exports = libroService;