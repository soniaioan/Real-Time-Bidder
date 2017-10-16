var Promise = require('bluebird')
var NodeCache = require( "node-cache" );
var paceBidsCache = new NodeCache( { stdTTL: 0, checkperiod: 60 } );

exports.upsertCampaignBidCounter = function upsertCampaignId(campaignObj){
    return new Promise(function (resolve, reject) {
        paceBidsCache.get(campaignObj.id, function (err, value) {
            if (!err) {
                if (value == undefined) {
                    campaignObj.countBids = 0;
                }
                campaignObj.countBids = campaignObj.countBids + 1
                paceBidsCache.set(campaignObj.id, campaignObj);
                resolve()
            }
        });
    })
}




exports.getCampaignsBidCounter = function getCampaignsBidCounter(arrrayIds) {
    return new Promise(function (resolve, reject) {
        paceBidsCache.mget(arrrayIds, function (err, result) {
            if (!err) {
                if (Object.keys(result).length === 0){
                    return resolve({});
                }
                return resolve(result)
                /*
                  {
                    "myKeyA": { my: "Special", variable: 123 },
                    "myKeyB": { the: "Glory", answer: 42 }
                  }
                */
                // ... do something ...
            }
        });
    })
}

exports.flush = function flush(){
    paceBidsCache.flushAll();
}
