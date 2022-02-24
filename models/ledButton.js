const mongoose = require("mongoose");
const Joi = require("joi");


const buttonSchema = new mongoose.Schema(
    {
        buttonState: Boolean,
    }
);

function getButtonModel() {
    return mongoose.model("Button", buttonSchema);
}

const Button = getButtonModel();


async function getButtonState() {
    return await Button.findOne();
}


async function updateButtonState(state) {

    // two approaches:
    // 1. delete the previous state and just add the new one
    // 2. update the one already exists

    await Button.remove();

    const buttonModel = new Button({ buttonState: state });

    console.log(`updatedState: ${state}`);

    return await buttonModel.save();
}


function validateState(req) {
    const schema = Joi.object({
        buttonState: Joi.boolean().required()
    });
    return schema.validate(req);
}

module.exports = {
    Button,
    getButtonState,
    updateButtonState,
    validateState
};