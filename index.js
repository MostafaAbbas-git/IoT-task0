const express = require("express");
const app = express();
const winston = require('winston');
const server = require('http').createServer(app);

require('./startup/cors')(app);
require('./startup/routes')(app);
require("./startup/database")();
require("./startup/logging");

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