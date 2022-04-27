const express = require('express');
const router = express.Router();

const { tempSensor, addTempValue, getTempReadings } = require("../models/tempSensor");
const { ldrSensor, validateTempReading, validateDistReading, getLDRReadings, addLDRValue } = require("../models/ldrSensor");

const validate = require('../middleware/validate');
const cors = require('cors');


router.get("/", async (req, res) => {

    const temperature = await getTempReadings();
    const distance = await getLDRReadings();
    var tempValues = [];
    var distanceValues = [];

    temperature.forEach(element => tempValues.push(element.temperature));
    distance.forEach(element => distanceValues.push(element.distance));

    // Send the response as json with all values stored in the db
    res.status(200).json({
        temperature: tempValues,
        distance: distanceValues,
    });

});

router.get("/withtime", async (req, res) => {

    const temperature = await getTempReadings();
    const distance = await getLDRReadings();

    var tempValues = [];
    var distanceValues = [];
    var timestamps = [];

    distance.forEach(element => distanceValues.push(element.distance));
    temperature.forEach(element => {
        tempValues.push(element.temperature);

        // add timestamps
        var timestamp = JSON.stringify(element.createdAt);
        var splittedStamp = timestamp.split("T", 2);
        var totalTime = splittedStamp[1];
        var splittedTime = totalTime.split(".", 2);
        var time = splittedTime[0];
        timestamps.push(time);
    });

    const reversedTempValues = tempValues.reverse();
    const reversedDistanceValues = distanceValues.reverse();
    const reversedTimestampValues = timestamps.reverse();

    // send the response as json with the last read of each sensor    
    res.status(200).json({
        temperature: reversedTempValues,
        distance: reversedDistanceValues,
        time: reversedTimestampValues
    });

});

router.post("/tempValue", [validate(validateTempReading), cors()], async (req, res) => {

    // insert temperature reading into database
    const newTemp = await addTempValue({
        temperature: req.body.temperature
    });

    // send the newly added value 
    res.status(200).json({
        message: "TempValue saved",
        temperature: newTemp.temperature
    });
});

router.post("/distValue", [validate(validateDistReading), cors()], async (req, res) => {

    // insert distance reading into database
    const newDistance = await addLDRValue({
        distance: req.body.distance
    });

    // send the newly added value 
    res.status(200).json({
        message: "DistValue saved",
        distance: newDistance.distance
    });
});


router.delete("/", async (req, res) => {
    // remove all the readings of both sensors (clear the database)

    const tempResponse = await tempSensor.deleteMany({});
    const ldrResponse = await ldrSensor.deleteMany({});

    res.status(200).json({
        message: "Database cleared successfully",
        tempResponse: tempResponse,
        ldrResponse: ldrResponse
    });
});

module.exports = router;

/* 
Slicing seconds:

const timestamp = JSON.stringify(temperature[0].createdAt);
const splittedTime = timestamp.split(":", 3);
var seconds = parseInt(splittedTime[2]);
*/