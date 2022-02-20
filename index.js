const express = require("express");
const app = express();
const winston = require('winston');
const server = require('http').createServer(app);

const { Sensor1, validateSensor1 } = require('./models/sensor1');


require('./startup/db/db-setup')();
require('./startup/routes')(app);

require("./startup/logging");



/* HomePage */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

/////////////////////

app.get("/read", async (req, res) => {
    // Retrieve all readings coming from sensor1 from the database as an object
    const readings = await Sensor1.query().orderBy('id').select('readings');

    // extract only the values from the object
    let values_array = [];
    for (let i = 0; i < readings.length; i++) {
        values_array[i] = readings[i].readings;
    }

    // construct a json with the total number of readings and the values then send it
    res.status(200).json({
        totalValues: readings.length,
        Values: values_array,
    });

});


app.post("/update", async (req, res) => {
    // insert into the database the temperature value
    const value = await Sensor1.query().insert({
        readings: req.body.temperature
    });

    // send the newly added value 
    res.status(200).json({
        message: "Value saved",
        value: value.readings,
    });
});


///////////////////
// PORT
const port = process.env.PORT || 8000;
server.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});


module.exports = server;