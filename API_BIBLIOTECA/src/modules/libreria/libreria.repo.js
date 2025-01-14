const pool = require('../../utils/db.connection');

const QUERIES = [
    'SELECT * FROM libreria', //Traer todos
    'SELECT * FROM libreria WHERE id = ?', //Traer por id
    'INSERT INTO Libreria set ?', //Insertar
    'UPDATE libreria SET ? WHERE id = ?', //Actualizar
    'DELETE FROM libreria WHERE id = ?' //Eliminar
];

const findAll = async() => {
    return (await pool.query(QUERIES[0]))[0];
}

const findById = async id => {
    let result = (await pool.query(QUERIES[1],[id]))[0];
    let found = result[0];
    return found;
}

const save = async libreria => {
    try{
        await pool.query(QUERIES[2], [libreria]);
        return true; 
    }catch(e){
        console.log(e);
        return false;
    }
}

const update = async libreria => {
    try{
        await pool.query(QUERIES[3], [libreria, libreria.id]);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const remove = async id => {
    try{
        await pool.query(QUERIES[4], [id]);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const libreriaRepo = {
    findAll,
    findById,
    save, 
    update,
    remove
}

module.exports = libreriaRepo;