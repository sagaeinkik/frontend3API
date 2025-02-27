'use strict';

// Importer
const userCtrl = require('../../controllers/user.controller');

//Alla användare
module.exports.getAllUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                    },
                },
            },
        },
    },
    handler: userCtrl.getAllUsers,
};

//Enskild användare
module.exports.getSingleUserOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                },
            },
        },
    },
    handler: userCtrl.getUser,
};

//Skapa användare
module.exports.createUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string', minLength: 4, maxLength: 255 },
                password: { type: 'string', minLength: 4, maxLength: 255 },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    newUser: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            username: { type: 'string' },
                        },
                    },
                    token: { type: 'string' },
                },
            },
        },
    },
    handler: userCtrl.createUser,
};

//Logga in användare
module.exports.loginUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            username: { type: 'string' },
                        },
                    },
                    token: { type: 'string' },
                },
            },
        },
    },
    handler: userCtrl.loginUser,
};
