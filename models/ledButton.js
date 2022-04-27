const mongoose = require("mongoose");
const Joi = require("joi");


const buttonSchema = new mongoose.Schema(
    {
        buttonState: Boolean
    },
    { timestamps: true }
);

// function getButtonModel() {
//     return mongoose.model("Button", buttonSchema);
// }

// const Button = getButtonModel();
const Button = new mongoose.model('Button', buttonSchema);


async function getButtonState() {
    return await Button.findOne();
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


function validateState(req) {
    const schema = Joi.object({
        buttonState: Joi.boolean().required()
    });
    return schema.validate(req);
}


exports.Button = Button;
exports.getButtonState = getButtonState;
exports.updateButtonState = updateButtonState;
exports.validateState = validateState;