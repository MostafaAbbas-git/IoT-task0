const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema(
    {
        temperature: Number
    },
    { timestamps: true }
);

function getTempSensorModel() {
    return mongoose.model("tempSensor", tempSchema);
}

const tempSensor = getTempSensorModel();


async function getTempReadings() {
    // Retrieve last temperature value added by the ESP
    return await tempSensor.find().sort({ _id: 1 });

}

async function getLastTemp() {
    // Retrieve last temperature value added by the ESP
    return await tempSensor.findOne().sort({ '_id': -1 }).limit(1);

}


async function addTempValue(tempReading) {
    const tempModel = new tempSensor(tempReading);
    return await tempModel.save();
}


module.exports = {
    tempSensor,
    getTempReadings,
    addTempValue,
    getLastTemp
};
