const mongoose = require("mongoose");
const Joi = require("joi");


const ldrSchema = new mongoose.Schema(
    {
        distance: Number
    },
    { timestamps: true }
);

function getLdrSensorModel() {
    return mongoose.model("ldrSensor", ldrSchema);
}

const ldrSensor = getLdrSensorModel();


async function getLDRReadings() {
    // Retrieve all distance values added by the ESP
    return await ldrSensor.find().sort({ createdAt: -1 }).limit(10);
}


async function getLastDistance() {
    // Retrieve last distance value added by the ESP
    return await ldrSensor.findOne().sort({ '_id': -1 }).limit(1);

}
async function addLDRValue(ldrReading) {
    const ldrModel = new ldrSensor(ldrReading);
    return await ldrModel.save();
}


function validateTempReading(req) {
    const schema = Joi.object({
        temperature: Joi.number().required()
    });
    return schema.validate(req);
}

function validateDistReading(req) {
    const schema = Joi.object({
        distance: Joi.number().required()
    });
    return schema.validate(req);
}

module.exports = {
    ldrSensor,
    validateTempReading,
    validateDistReading,
    getLDRReadings,
    addLDRValue,
    getLastDistance
};
