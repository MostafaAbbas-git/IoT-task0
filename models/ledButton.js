const mongoose = require("mongoose");
const Joi = require("joi");


const buttonSchema = new mongoose.Schema(
    {
        buttonState: Boolean
    },
    { timestamps: true }
);

const Button = new mongoose.model('Button', buttonSchema);
const ButtonTwo = new mongoose.model('ButtonTwo', buttonSchema);


async function getButtonState() {
    return await Button.findOne();
}

async function getButtonTwoState() {
    return await ButtonTwo.findOne();
}


async function updateButtonState(state) {

    // two approaches:
    // 1. delete the previous state and just add the new one
    // 2. update the one already exists

    await Button.deleteMany({});

    const newButtonDocument = new Button({ buttonState: state });

    console.log(`client buttonstate is: ${state}`);
    const result = await newButtonDocument.save();
    return result;
}

async function updateButtonTwoState(state) {

    await ButtonTwo.deleteMany({});

    const newButtonDocument = new ButtonTwo({ buttonState: state });

    console.log(`client buttonTwostate is: ${state}`);
    const result = await newButtonDocument.save();
    return result;
}


function validateState(req) {
    const schema = Joi.object({
        buttonState: Joi.boolean().required()
    });
    return schema.validate(req);
}


exports.Button = Button;
exports.ButtonTwo = ButtonTwo;
exports.getButtonState = getButtonState;
exports.updateButtonState = updateButtonState;

exports.getButtonTwoState = getButtonTwoState;
exports.updateButtonTwoState = updateButtonTwoState;

exports.validateState = validateState;