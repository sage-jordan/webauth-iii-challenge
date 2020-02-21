const db = require('../db/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find(){
    return db('users')
        .select('id', 'username', 'password', 'department');
};

function findBy(filter){
    return db('users')
        .select('id', 'username', 'password', 'department')
        .where(filter);
};

function add(user){
    return db('users')
        .insert(user)
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
};

function findById(id){
    return db('users')
        .select('id', 'username', 'department')
        .where({ id })
        .first();
};

function remove(id){
    return db('users')
        .where({ id: Number(id) })
        .del()
}