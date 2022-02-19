const { Model } = require('objection');
const Joi = require('joi');

class Sensor2 extends Model {
    static get tableName() {
        return 'sensor1';
    }
}

function validateSensor2(req) {
    const schema = Joi.object({
        id: Joi.number().integer(),
        readings: Joi.number().required()
    });
    return schema.validate(req);
}

exports.Sensor2 = Sensor2;
exports.validateSensor2 = validateSensor2;