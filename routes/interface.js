
const express = require('express');
const router = express.Router();

const { getLastTemp } = require("../models/tempSensor");
const { getLastDistance } = require("../models/ldrSensor");
const { getButtonState, getButtonTwoState, updateButtonState, updateButtonTwoState } = require("../models/ledButton");


router.get("/", async (req, res) => {

    const lastTemp = await getLastTemp();
    const lastDistance = await getLastDistance();


    // send the response as json with the last read of each sensor
    res.status(200).json({
        temperature: lastTemp,
        distance: lastDistance,
    });
});

router.post("/buttonOnestate", async (req, res) => {
    const buttonState = req.body.buttonState
    const result = await updateButtonState(buttonState);
    console.log("buttonOnestate");
    // send the response as json with the last read of each sensor
    res.status(200).send({
        newState: result.buttonState
    });
});

router.post("/buttonTwostate", async (req, res) => {
    const buttonState = req.body.buttonState
    const result = await updateButtonTwoState(buttonState);
    console.log("buttonTwostate");
    // send the response as json with the last read of each sensor
    res.status(200).send({
        newState: result.buttonState
    });
});



router.get("/sensorflags", async (req, res) => {
    // fetch latest two states from database 
    const buttonOneState = await getButtonState();
    const buttonTwoState = await getButtonTwoState();
    // send two flags
    res.status(200).json({
        buttonOneState: buttonOneState.buttonState,
        buttonTwoState: buttonTwoState.buttonState
    });

});


module.exports = router;