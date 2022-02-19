const { Model } = require('objection');
const Joi = require('joi');

class Sensor1 extends Model {
    static get tableName() {
        return 'sensor1';
    }

}

function validateSensor1(req) {
    const schema = Joi.object({
        id: Joi.number().integer(),
        readings: Joi.number().required()
    });
    return schema.validate(req);
}

exports.Sensor1 = Sensor1;
exports.validateSensor1 = validateSensor1;