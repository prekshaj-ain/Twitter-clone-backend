const express = require('express');

const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');

const app = express();

const setupAndStartServer = ()=>{
    app.listen(PORT, async ()=>{
        console.log(`Server started at ${PORT}`)
        await connect();
    })
}

setupAndStartServer();
