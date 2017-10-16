var Joi = require('joi')
var schema = {
    id: Joi.string().required(),
    app: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
    }).required(),
    device: Joi.object().keys({
        os: Joi.string().valid('Android', 'ios').required(),
        geo: Joi.object().keys({
           country: Joi.string().required(),
           lat: Joi.number(),
           lon: Joi.number(),
        })
    }).required()
};

exports.validate = function (data) {
    var joiWrapper = require('../utils/joiWrapper');
    return joiWrapper.validate(data, schema);
}


