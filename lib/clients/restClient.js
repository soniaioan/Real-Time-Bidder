var request = require('supertest-as-promised')
exports.getUrl = function (config) {
    return config.get('protocol') + '://' + config.get('host') + ':' + config.get('port')
}

exports.apiBidder = function (url) {
    var req = request(url)
        .post('/api/bidder')
        .send({
            "id": "e7fe51ce4f6376876353ff0961c2cb0d",
            "app": {
                "id": "e7fe51ce-4f63-7687-6353-ff0961c2cb0d",
                "name": "Morecast Weather"
            },
            "device": {
                "os": "Android",
                "geo": {
                    "country": "USA",
                    "lat": 0,
                    "lon": 0
                }
            }
        })
    return req
}
