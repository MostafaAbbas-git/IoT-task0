const express = require('express');
const router = express.Router();

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");

const validate = require('../middleware/validate');


router.get("/", async (req, res) => {

    const temperature = await getTempReadings();
    const distance = await getLDRReadings();
    var tempValues = [];
    var distanceValues = [];
    // const timestamp = JSON.stringify(temperature[0].createdAt);
    // const splittedTime = timestamp.split(":", 3);
    // var seconds = parseInt(splittedTime[2]);


    temperature.forEach(element => tempValues.push(element.temperature));
    distance.forEach(element => distanceValues.push(element.distance));

    // Send the response as json with all values stored in the db
    res.status(200).json({
        temperature: tempValues,
        distance: distanceValues,
    });

});

router.get("/one", async (req, res) => {

    const lastTemp = await getLastTemp();
    const lastDistance = await getLastDistance();


    // send the response as json with the last read of each sensor
    res.status(200).json({
        temperature: lastTemp,
        distance: lastDistance,
    });
});

router.post("/", validate(validateReadings), async (req, res) => {

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


router.delete("/", async (req, res) => {
    // remove all the readings of both sensors (clear the database)

    const tempResponse = await tempSensor.remove();
    const ldrResponse = await ldrSensor.remove();

    res.status(200).json({
        message: "Database cleared successfully",
        tempResponse: tempResponse,
        ldrResponse: ldrResponse
    });
});

module.exports = router;