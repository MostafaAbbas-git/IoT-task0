
const express = require('express');
const router = express.Router();
const cors = require('cors');

const { tempSensor, addTempValue, getTempReadings, getLastTemp } = require("../models/tempSensor");
const { ldrSensor, validateReadings, getLDRReadings, addLDRValue, getLastDistance } = require("../models/ldrSensor");
const { Button, getButtonState, updateButtonState, validateState } = require("../models/ledButton");

const validate = require('../middleware/validate');


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

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

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