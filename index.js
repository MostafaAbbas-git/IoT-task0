const express = require("express");
const app = express();
const winston = require('winston');
const server = require('http').createServer(app);
const cors = require("cors");
// const whitelist = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)

        // if (!origin || whitelist.indexOf(origin) !== -1) {
        //     callback(null, true)
        // } else {
        //     callback(new Error("Not allowed by CORS"))
        // }
    },
    credentials: true,
}

app.use(cors(corsOptions))

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