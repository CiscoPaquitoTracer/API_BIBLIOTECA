const libreriaRepo = require('./libreria.repo');
const customResponse = require('../../utils/custom.response');
const { response } = require('express');

const findAll = async response => {
    let list = await libreriaRepo.findAll(response);
    return customResponse.getOk(response, 200, list);
}

const findById = async (response, id) => {
    let found = await libreriaRepo.findById(id);

    return found ? customResponse.getOk(response, 200, found) : customResponse.get404(response);
}

const save = async (response, libreria) => {
    return await libreriaRepo.save(libreria) ?
    customResponse.getOk(response, 201, undefined) :
    customResponse.get400;
}

const update = async (response, libreria) => {
    let found = await libreriaRepo.findById(libreria.id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await libreriaRepo.update(libreria) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const remove = async (response, id) => {
    let found = await libreriaRepo.findById(id);
    if(!found) {
        return customResponse.get404(response);
    } else {
        return await libreriaRepo.remove(id) ?
        customResponse.getOk(response, 200, undefined) :
        customResponse.get400(response);
    }
}

const libreriaService = {
    findAll, 
    findById, 
    save, 
    update, 
    remove
}

module.exports = libreriaService;