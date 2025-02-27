'use strict';

//Importera options
const {
    getAllUsersOpts,
    getSingleUserOpts,
    createUserOpts,
    loginUserOpts,
} = require('./options/user.options');

//Routes
async function userRoutes(fastify) {
    fastify.get('/users', getAllUsersOpts);
    fastify.get('/users/:id', getSingleUserOpts);
    fastify.post('/signup', createUserOpts);
    fastify.post('/login', loginUserOpts);
}

module.exports = userRoutes;
