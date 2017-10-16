var Joi = require('bluebird').promisifyAll(require('joi'))
exports.validate = function (data, schema, options) {
    options = options || {}
    options.convert = false
    return Joi.validateAsync(data, schema, options).catch(function (e) {
        throw e.message
    })
}
