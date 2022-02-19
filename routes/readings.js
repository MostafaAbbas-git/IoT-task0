const express = require('express');
const router = express.Router();
const winston = require('winston');

const { Sensor1, validateSensor1 } = require('../models/sensor1');


router.get("/", async (req, res) => {
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


router.post("/temp", async (req, res) => {
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



module.exports = router;