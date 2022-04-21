const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users'

        // Conectar a base de datos
        this.conectardb();

        // Middleware
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectardb() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json())

        //Directorio público
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use( this.userPath, require('../routes/user-router') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto`, this.port );
        });
    }
}


module.exports = Server;
