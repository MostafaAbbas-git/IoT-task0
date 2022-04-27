
const express = require('express');
const router = express.Router();

const { getLastTemp } = require("../models/tempSensor");
const { getLastDistance } = require("../models/ldrSensor");
const { getButtonState, updateButtonState } = require("../models/ledButton");


router.get("/", async (req, res) => {

    const lastTemp = await getLastTemp();
    const lastDistance = await getLastDistance();


    // send the response as json with the last read of each sensor
    res.status(200).json({
        temperature: lastTemp,
        distance: lastDistance,
    });
});

router.post("/buttonstate", async (req, res) => {
    const buttonState = req.body.buttonState
    const result = await updateButtonState(buttonState);

    // send the response as json with the last read of each sensor
    res.status(200).send({
        newState: result.buttonState
    });
});


router.get("/currentBstate", async (req, res) => {

    const fetchedButtonState = await getButtonState();
    console.log(`fetchedButtonState: ${fetchedButtonState}`);

    // send the response as json with the value of buttonState
    res.status(200).json({
        buttonState: fetchedButtonState.buttonState
    });
});


module.exports = router;