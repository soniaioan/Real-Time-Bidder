var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var root = process.cwd();
var config = require(root + '/lib/config')
module.exports = {
    get: function () {
        return request.get(config.get('campaign_url')).then(function(response){
              return Promise.resolve(response)
        }).catch(function (err) {
                throw err;
        })
    }
}