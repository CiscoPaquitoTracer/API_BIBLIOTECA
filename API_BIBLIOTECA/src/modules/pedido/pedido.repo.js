const pool = require('../../utils/db.connection');

const QUERIES = [
    `SELECT pedido.id AS id, pedido.folio_pedido AS folio, libreria.nombre AS libreria, libro.titulo AS libro, pedido.cantidad AS cantidad, pedido.total AS total, (SELECT SUM(p.total)  FROM pedido p WHERE p.folio_pedido IS NOT NULL) AS total_suma
FROM pedido
JOIN libreria ON libreria.id = pedido.libreria_id
JOIN libro ON libro.id = pedido.libro_id
WHERE pedido.folio_pedido IS NOT NULL;`, //Traer todos
    `select pedido.folio_pedido as folio, SUM(pedido.total) as total_final
    from pedido join libreria on libreria.id = pedido.libreria_id join libro on libro.id = pedido.libro_id where pedido.folio_pedido group by pedido.folio_pedido;`, //Traer por id
    'INSERT INTO pedido set ?', //Insertar
    'UPDATE pedido SET ? WHERE id = ?', //Actualizar
    'DELETE FROM pedido WHERE id = ?' //Eliminar
];

const findAll = async() => {
    return (await pool.query(QUERIES[0]))[0];
}

const findById = async id => {
    let result = (await pool.query(QUERIES[1],[id]))[0];
    let found = result[0];
    return found;
}

const save = async pedido => {
    try{
        await pool.query(QUERIES[2], [pedido]);
        return true; 
    }catch(e){
        console.log(e);
        return false;
    }
}

const update = async pedido => {
    try{
        await pool.query(QUERIES[3], [pedido, pedido.id]);
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

const pedidoRepo = {
    findAll,
    findById,
    save, 
    update,
    remove
}

module.exports = pedidoRepo;