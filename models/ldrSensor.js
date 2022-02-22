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
    // Retrieve last temperature value added by the ESP
    return await ldrSensor.find().sort({ _id: 1 });
}


async function getLastDistance() {
    // Retrieve last temperature value added by the ESP
    return await ldrSensor.findOne().sort({ '_id': -1 }).limit(1);

}
async function addLDRValue(ldrReading) {
    const ldrModel = new ldrSensor(ldrReading);
    return await ldrModel.save();
}


function validateReadings(req) {
    const schema = Joi.object({
        distance: Joi.number().required(),
        temperature: Joi.number().required()
    });
    return schema.validate(req);
}

module.exports = {
    ldrSensor,
    validateReadings,
    getLDRReadings,
    addLDRValue,
    getLastDistance
};
