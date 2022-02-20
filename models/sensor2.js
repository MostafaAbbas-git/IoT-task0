const mongoose = require("mongoose");

const sensor2Schema = new mongoose.Schema({
    readings: {
        type: Number,
        required: true
    }
});

function getSensor2Model() {
    return mongoose.model("Sensor2", sensor2Schema);
}

const Sensor2 = getSensor2Model();

function validateSensor2(req) {
    const schema = Joi.object({
        readings: Joi.number().required()
    });
    return schema.validate(req);
}

module.exports = {
    Sensor2: Sensor2,
    validateSensor2: validateSensor2,
    sensor2Schema: sensor2Schema
};
