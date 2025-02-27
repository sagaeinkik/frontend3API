'use strict';

//Modell
const blogPost = require('../models/blogpost.model');

//Error
const errorHandler = require('../utils/errMsg');
let err = errorHandler.createError();

// Hämta alla inlägg
module.exports.getAllPosts = async (request, reply) => {
    //Nollställ error
    err = errorHandler.resetErrors();

    try {
        const posts = await blogPost.find();

        //Kolla om det finns inlägg
        if (!posts || posts.length == 0) {
            err = errorHandler.createError('Not found', 404, 'Inga inlägg hittades');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera inlägg
        return reply.send(posts);
    } catch (error) {
        return reply.send(error);
    }
};

// Hämta enskilt inlägg
module.exports.getSinglePost = async (request, reply) => {
    err = errorHandler.resetErrors();

    //ID
    const id = request.params.id;

    try {
        const post = await blogPost.findById(id);

        if (!post) {
            err = errorHandler.createError('Not found', 404, 'Inlägget hittades inte');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera inlägg
        return reply.send(post);
    } catch (error) {
        //Om det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send(error);
    }
};

// Skapa nytt inlägg
module.exports.createPost = async (request, reply) => {
    err = errorHandler.resetErrors();

    const { title, content } = request.body;

    //Validera
    const validationResults = [
        errorHandler.checkEmpty(title, 'Titel'),
        errorHandler.checkEmpty(content, 'Innehåll'),
    ];
    const validationError = errorHandler.validateFields(reply, validationResults);
    if (validationError) {
        return validationError;
    }

    try {
        //Skapa och spara nytt inlägg
        const newPost = new blogPost({
            title,
            content,
        });

        const result = await newPost.save();

        return reply.code(201).send({ message: 'Blogginlägg tillagt!', post: result });
    } catch (error) {
        return reply.send(error);
    }
};

//Redigera inlägg
module.exports.editPost = async (request, reply) => {
    err = errorHandler.resetErrors();

    //Hitta ID
    const id = request.params.id;

    //Nytt innehåll
    const { title, content } = request.body;

    //Validera
    const validationResults = [
        errorHandler.checkEmpty(title, 'Titel'),
        errorHandler.checkEmpty(content, 'Innehåll'),
    ];
    const validationError = errorHandler.validateFields(reply, validationResults);
    if (validationError) {
        return validationError;
    }

    try {
        //Hitta inlägg och uppdatera (med mongoose-schemats validering – misslyckas validering hamnar vi i catch-blocket direkt)
        const updatedPost = await blogPost.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        //Om inlägget inte hittades
        if (!updatedPost) {
            err = errorHandler.createError('Not found', 404, 'Inlägget hittades inte');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera inlägg
        return reply.send({ message: 'Inlägg uppdaterades!', post: updatedPost });
    } catch (error) {
        //OM det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }
        return reply.send(error);
    }
};

//Radera inlägg
module.exports.deletePost = async (request, reply) => {
    err = errorHandler.resetErrors();
    const id = request.params.id;

    try {
        //Hitta och radera inlägg
        const deletedPost = await blogPost.findByIdAndDelete(id);

        if (!deletedPost) {
            err = errorHandler.createError('Not found', 404, 'Inlägget hittades inte');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send({ message: 'Inlägg raderades!', post: deletedPost });
    } catch (error) {
        //Om det är cast to-error (fel i ID)
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'Inlägg med angivet ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }
        return reply.send(error);
    }
};
