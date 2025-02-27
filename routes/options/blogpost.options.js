'use strict';

const pwHandler = require('../../utils/passwordHandler');
const blogPostCtrl = require('../../controllers/blogpost.controller');

//Hämta alla inlägg
module.exports.getAllPostsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        posted: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
            },
        },
    },
    handler: blogPostCtrl.getAllPosts,
};

//Hämta enskilt inlägg
module.exports.getSinglePostOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    posted: {
                        type: 'string',
                        format: 'date-time',
                    },
                },
            },
        },
    },
    handler: blogPostCtrl.getSinglePost,
};

//Skapa nytt inlägg
module.exports.createPostOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 255 },
                content: { type: 'string', minLength: 1, maxLength: 4000 },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            posted: {
                                type: 'string',
                                format: 'date-time',
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: blogPostCtrl.createPost,
};

//Uppdatera inlägg
module.exports.editPostOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 255 },
                content: { type: 'string', minLength: 1, maxLength: 4000 },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            posted: {
                                type: 'string',
                                format: 'date-time',
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: blogPostCtrl.editPost,
};

//Radera inlägg
module.exports.deletePostOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            posted: {
                                type: 'string',
                                format: 'date-time',
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: pwHandler.authenticateToken,
    handler: blogPostCtrl.deletePost,
};
