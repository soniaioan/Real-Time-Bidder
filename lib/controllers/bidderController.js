module.exports = function (bidderService) {
    var Log = require('log')
        , log = new Log('info');
    var _ = require('lodash')
    var requestValidator= require('../validators/requestValidator');
    return {
        parseAdExchange: function (req, res, next) {
            //TODO request null check
            if (req.body === null){
                throw ('Empty request body')
            }
            return requestValidator.validate(req.body).then(function () {
                return bidderService.bidderCampaign(req.body.device.geo.country)
            }).then(function (result) {
                log.info({response: JSON.stringify(result)});
                if (_.isEmpty(result)) {
                    res.status(204).json(result);
                } else {
                    res.status(200).json(result);
                }
            }).catch(next)
        }
    }
}
