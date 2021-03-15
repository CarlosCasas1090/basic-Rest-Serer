const express = require('express');
const cors = require('cors');

class Server 
{  
    //var app, port ***DO NOT need to declare properties before Constructor
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    middlewares()
    {
        this.app.use(cors()); //CORS
        this.app.use(express.json()); //read and parse body to json
        this.app.use(express.static('public')); //public folder
    }

    routes()
    {
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen()
    {
        this.app.listen(this.port, () =>
        {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;