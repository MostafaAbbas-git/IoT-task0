
const express = require('express');
const router = express.Router();
const cors = require('cors');

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");

const buttonStateMiddleware = require("../middleware/buttonState");


router.get("/", cors(), async (req, res) => {

    const lastTemp = await getLastTemp();
    const lastDistance = await getLastDistance();


    // send the response as json with the last read of each sensor
    res.status(200).json({
        temperature: lastTemp,
        distance: lastDistance,
    });
});

router.post("/buttonstate", [cors(), buttonStateMiddleware], async (req, res) => {
    console.log(`Recieved state from the website: ${req.body.buttonState}`);

    // send the response as json with the last read of each sensor
    res.status(200).json({
        message: "State saved",
        buttonState: req.body.buttonState
    });
});


router.get("/ledstate", [cors(), buttonStateMiddleware], async (req, res) => {

    var fetchedButtonState = req.buttonState;
    console.log(fetchedButtonState);

    // send the response as json with the value of buttonState
    res.status(200).json({
        buttonState: fetchedButtonState
    });
});

module.exports = router;