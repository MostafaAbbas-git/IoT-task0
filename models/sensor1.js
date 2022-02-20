const mongoose = require("mongoose");

const sensor1Schema = new mongoose.Schema({
    readings: {
        type: Number,
        required: true
    }
});

function getSensor1Model() {
    return mongoose.model("Sensor1", sensor1Schema);
}

const Sensor1 = getSensor1Model();

function validateSensor1(req) {
    const schema = Joi.object({
        readings: Joi.number().required()
    });
    return schema.validate(req);
}

module.exports = {
    Sensor1: Sensor1,
    validateSensor1: validateSensor1,
    sensor1Schema: sensor1Schema
};
