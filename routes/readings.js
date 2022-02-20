const express = require('express');
const router = express.Router();
const winston = require('winston');

const { Sensor1, validateSensor1 } = require("../models/sensor1");


async function getSensorReadings() {
    // Retrieve all readings coming from sensor1 from the database as an array of objects
    return await Sensor1.find().sort("_id");
}


async function addValue(value) {
    const valueModel = new Sensor1(value);
    return await valueModel.save();
}


router.get("/", async (req, res) => {

    const data = await getSensorReadings();

    // extract the value of the readings from each object
    let values_array = [];
    for (let i = 0; i < data.length; i++) {
        values_array[i] = data[i].readings;
    }

    // construct a json with the total number of readings and the values then send it
    // res.status(200).json({
    //     totalValues: data.length,
    //     Values: values_array,
    // });
    winston.info(`totalValues: ${data.length}\n 
    values_array: ${values_array}`);
    res.send(values_array);
});


router.post("/", async (req, res) => {
    // insert into the database the temperature value
    const newValue = await addValue({
        readings: req.body.temperature
    });

    // send the newly added value 
    res.status(200).json({
        message: "Value saved",
        value: newValue.readings,
    });
});


module.exports = router;