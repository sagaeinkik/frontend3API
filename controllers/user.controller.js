'use strict';

/* Endast Read och create-funktionalitet för användare i detta lilla API */

//Modell
const User = require('../models/user.model');

//error
const errorHandler = require('../utils/errMsg');
let err = errorHandler.createError();

//Lösenord
const pwHandler = require('../utils/passwordHandler');

//Hämta alla användare
module.exports.getAllUsers = async (request, reply) => {
    //Nolla error
    err = errorHandler.resetErrors();

    try {
        const users = await User.find({});

        //Inga användare
        if (!users || users.length === 0) {
            err = errorHandler.createError('Not found', 404, 'Inga användare hittades');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera användarna
        return reply.send(users);
    } catch (error) {
        return reply.send(error);
    }
};

//Hämta enskild användare
module.exports.getUser = async (request, reply) => {
    err = errorHandler.resetErrors();

    //ID från URL
    const id = request.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            err = errorHandler.createError('Not found', 404, 'Användaren hittades inte');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera användare
        return reply.send(user);
    } catch (error) {
        //Om det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }
        return reply.send(error);
    }
};

//Skapa användare
module.exports.createUser = async (request, reply) => {
    err = errorHandler.resetErrors();
    const { username, password } = request.body;

    //Validera fält
    const validationResults = [
        errorHandler.checkEmpty(username, 'Användarnamn'),
        errorHandler.checkEmpty(password, 'Lösenord'),
    ];
    //Sök igenom validationResults efter error
    const validationError = errorHandler.validateFields(reply, validationResults);
    if (validationError) {
        return validationError;
    }

    //Försök lägga till
    try {
        //Se om användare redan finns
        const userExists = await User.findOne({ username: username });

        if (userExists) {
            err = errorHandler.createError('Conflict', 409, 'Användarnamnet är upptaget');
            return reply.code(err.https_response.code).send(err);
        }

        //Hasha lösenordet
        const hashedPassword = await pwHandler.hashPassword(password);

        //Lägg till
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
        });

        //Skapa token
        const token = pwHandler.createToken(username);

        //Returnera användare och token
        return reply.code(201).send({ message: 'Användare skapad!', newUser, token: token });
    } catch (error) {
        //Om det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }
        return reply.send(error);
    }
};

//Logga in
module.exports.loginUser = async (request, reply) => {
    err = errorHandler.resetErrors();
    const { username, password } = request.body;

    //Försök logga in
    try {
        //Se om användare finns
        const user = await User.findOne({ username: username });

        if (!user) {
            err = errorHandler.createError('Not found', 404, 'Användaren hittades inte');
            return reply.code(err.https_response.code).send(err);
        }

        //Jämför inloggningsuppgifter
        const authorized = await pwHandler.verifyPassword(password, user.password);

        //Fel inloggningsuppgifter
        if (!authorized) {
            err = errorHandler.createError('Unauthorized', 401, 'Fel användarnamn eller lösenord');
            return reply.code(err.https_response.code).send(err);
        }

        //Skapa token
        const token = pwHandler.createToken(username);

        //Returnera användare och token
        return reply.send({
            message: 'Inloggning lyckades',
            user: { id: user.id, username: user.username },
            token: token,
        });
    } catch (error) {
        //Om det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }
        return reply.send(error);
    }
};
