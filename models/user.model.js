'use strict';

const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Du måste ange ett användarnamn'],
        minLength: [4, 'Användarnamnet måste vara minst 4 tecken långt'],
        unique: [true, 'Användarnamnet är upptaget'],
    },
    password: {
        type: String,
        required: [true, 'Du måste ange ett lösenord'],
        minlength: [4, 'Lösenordet måste vara minst 4 tecken långt'],
    },
    registered: {
        type: Date,
        default: Date.now,
    },
});

//Definiera modell
const User = mongoose.model('User', userSchema);

module.exports = User;
