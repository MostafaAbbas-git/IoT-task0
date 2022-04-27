const express = require('express');
const router = express.Router();

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");

const validate = require('../middleware/validate');
const cors = require('cors');


router.get("/", cors(), async (req, res) => {

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

router.get("/withtime", cors(), async (req, res) => {

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

router.post("/", [validate(validateReadings), cors()], async (req, res) => {

    // insert into the database
    const newTemp = await addTempValue({
        temperature: req.body.temperature
    });
    const newDistance = await addLDRValue({
        distance: req.body.distance
    });

    // send the newly added value 
    res.status(200).json({
        message: "Values saved",
        temperature: newTemp.temperature,
        distance: newDistance.distance
    });
});


router.delete("/", cors(), async (req, res) => {
    // remove all the readings of both sensors (clear the database)

    const tempResponse = await tempSensor.remove();
    const ldrResponse = await ldrSensor.remove();

    res.status(200).json({
        message: "Database cleared successfully",
        tempResponse: tempResponse,
        ldrResponse: ldrResponse
    });
});

router.post("/button", cors(), async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    // send the response as json with the last read of each sensor
    res.status(200).json({
        message: "State saved",
        buttonState: req.body.buttonState
    });
});
module.exports = router;

/* 
Slicing seconds:

const timestamp = JSON.stringify(temperature[0].createdAt);
const splittedTime = timestamp.split(":", 3);
var seconds = parseInt(splittedTime[2]);
*/