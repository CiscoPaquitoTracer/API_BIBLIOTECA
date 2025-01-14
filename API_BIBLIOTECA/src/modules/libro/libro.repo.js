const pool = require('../../utils/db.connection');

const QUERIES = [
    'SELECT * FROM libro', // Traer todos
    'SELECT * FROM libro WHERE id = ?', // Traer por id
    'INSERT INTO libro set ?', // Insertar
    'UPDATE libro SET ? WHERE id = ?', // Actualizar libro
    'UPDATE libro SET edo = ? WHERE id = ?', // Actualizar solo el estado
    'DELETE FROM libro WHERE id = ?' // Eliminar
];


const findAll = async() => {
    return (await pool.query(QUERIES[0]))[0];
}

const findById = async id => {
    let result = (await pool.query(QUERIES[1],[id]))[0];
    let found = result[0];
    return found;
}

const save = async libro => {
    try{
        await pool.query(QUERIES[2], [libro]);
        return true; 
    }catch(e){
        console.log(e);
        return false;
    }
}

const update = async libro => {
    try{
        await pool.query(QUERIES[3], [libro, libro.id]);
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

const updateEstado = async (libro, edo) => {
    try {
        await pool.query(QUERIES[5], [libro, libro.id, edo, libro.edo]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


const libroRepo = {
    findAll,
    findById,
    save, 
    update,
    updateEstado,
    remove
}

module.exports = libroRepo;