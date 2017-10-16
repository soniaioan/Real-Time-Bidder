
var campaignRetriever = require('../campaign/campaignRetriever')
var campaignFilter = require('../campaign/campaignFilter')
exports.bidderCampaign= function bidderCampaign (country) {
    return campaignRetriever.get().then(function(campaigns){
        var result = campaignFilter.filterCampaignByCountry(campaigns, country)
        return Promise.resolve(result)
    })
}