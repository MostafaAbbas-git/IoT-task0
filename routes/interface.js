
const express = require('express');
const router = express.Router();

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");



router.get("/", async (req, res) => {

    const lastTemp = await getLastTemp();
    const lastDistance = await getLastDistance();


    // send the response as json with the last read of each sensor
    res.status(200).json({
        temperature: lastTemp,
        distance: lastDistance,
    });
});


module.exports = router;