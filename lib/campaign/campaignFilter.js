var _ = require('lodash')
var paceBidsMemory = require ('./paceBidsMemory')
var config = require('../config')
exports.filterCampaignByCountry = function filterCampaignByCountry (campaigns, country) {
    var filteredCampaigns = _.filter(campaigns, function(o) { return _.includes(o.targetedCountries, country) })
    var sortedCampaigns = _.orderBy(filteredCampaigns, function(campaign) {
        return [
            campaign.price
        ];
    }, ['desc'])
    var ids = []
    if (sortedCampaigns.length === 0) {
        return []
    }
    sortedCampaigns.forEach(function(obj){
        ids.push(obj.id)
    })
    return paceBidsMemory.getCampaignsBidCounter(ids).then(function(paceBids){
        if (!_.isEmpty(paceBids)) {
            for (i = 0; i < sortedCampaigns.length; i++) {
                var campaignObj = sortedCampaigns[i];
                if ((paceBids.hasOwnProperty(campaignObj.id) && paceBids[campaignObj.id].countBids < config.get('paceThreshold') || !(paceBids.hasOwnProperty(campaignObj.id)))){
                    paceBidsMemory.upsertCampaignBidCounter(campaignObj)
                    return campaignObj;
                }
                continue
            }
            return {}
        }
        paceBidsMemory.upsertCampaignBidCounter(sortedCampaigns[0])
        return sortedCampaigns[0]
    })
}