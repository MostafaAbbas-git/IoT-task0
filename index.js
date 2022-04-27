const express = require("express");
const app = express();
const winston = require('winston');
const server = require('http').createServer(app);
const cors = require("cors");

require('./startup/routes')(app);
require("./startup/database")();
require("./startup/logging");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
/* HomePage */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

// PORT
const port = process.env.PORT || 8000;
server.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});


module.exports = server;