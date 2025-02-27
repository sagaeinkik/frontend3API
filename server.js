'use strict';

// Importer
const fastify = require('fastify')({ logger: false });
const mongoose = require('mongoose');
const cors = require('@fastify/cors');
require('dotenv').config();

// Variabler
const env = process.env;
let dbUrl = env.DB_CONNECTIONSTRING;
const port = env.PORT || 3000;

// Middleware
fastify.register(cors);

// Routes
fastify.get('/', async (request, reply) => {
    return {
        message:
            'Välkommen till Blog API! Det är gjort av Saga Kikajon för moment 4 i kursen Fördjupad Frontend-utveckling på Mittuniversitetet.',
    };
});

fastify.register(require('./routes/user.routes'));

// DB-anslutning
function dbConnect() {
    mongoose
        .connect(dbUrl)
        .then(() => {
            console.log('Ansluten till MongoDB!');
        })
        .catch((error) => {
            console.log('Något gick fel vid anslutning: ', error);
        });
}

// Starta app
const start = async () => {
    try {
        //anslutning
        dbConnect();
        fastify.listen({ port: port, host: '0.0.0.0' });
        console.log(`Servern är igång på port ${port}! 🎉`);
    } catch (error) {
        console.error('Något gick fel vid start av app: ', error);
        process.exit(1);
    }
};
start();
