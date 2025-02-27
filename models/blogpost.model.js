'use strict';

const mongoose = require('mongoose');

//Schema
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255,
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 4000,
    },
    posted: {
        type: Date,
        default: Date.now,
    },
});

//Modell
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
