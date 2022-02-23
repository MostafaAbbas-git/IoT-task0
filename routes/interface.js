
const express = require('express');
const router = express.Router();
const cors = require('cors');

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");
const { Button, getButtonState, updateButtonState } = require("../models/ledButton");

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

router.post("/buttonstate", cors(), async (req, res) => {

    console.log(`Recieved state from the website: ${req.body.buttonState}`);

    const lastButtonState = await updateButtonState(req.body.buttonState);
    console.log(`Last recieved state from DB: ${lastButtonState}`);

    // send the response as json with the last read of each sensor
    res.status(200).json({
        message: "State saved",
        buttonState: lastButtonState.buttonState
    });
});


router.get("/ledstate", cors(), async (req, res) => {

    const fetchedButtonState = await getButtonState();
    console.log(`fetchedButtonState: ${fetchedButtonState}`);

    // send the response as json with the value of buttonState
    res.status(200).json({
        buttonState: fetchedButtonState.buttonState
    });
});


module.exports = router;