'use strict';

//Importera
const {
    getAllPostsOpts,
    getSinglePostOpts,
    createPostOpts,
    editPostOpts,
    deletePostOpts,
} = require('./options/blogpost.options');

//Routes
async function blogPostRoutes(fastify) {
    fastify.get('/posts', getAllPostsOpts);
    fastify.get('/posts/:id', getSinglePostOpts);
    fastify.post('/posts', createPostOpts);
    fastify.put('/posts/:id', editPostOpts);
    fastify.delete('/posts/:id', deletePostOpts);
}

module.exports = blogPostRoutes;
