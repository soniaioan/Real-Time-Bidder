require('../lib/index')
require('assert')
var config = require('../lib/config')
var restClient = require('../lib/clients/restClient')
var url = restClient.getUrl(config)
var should = require('should')
var campaignRetriever = require('../lib/campaign/campaignRetriever');
var sinon = require('sinon');
var _ = require('lodash');
var sandbox;
var campaignResponse = require('../fixtures/success/campaignApiResponse.json')
var cache = require('../lib/campaign/paceBidsMemory')
describe('Bidder Api', function () {
    beforeEach(function () {
        // this.sinon = sandbox = sinon.sandbox.create();
        cache.flush();
    });

    afterEach(function () {
        // sandbox.restore();
    });
    describe('Given a request for device to bidder api, endpoint should return the filtered campaigns based on device country sorted by desc price', function () {
        it('Should return 200 along with the campaign object if campaign found', function () {
            sinon.stub(campaignRetriever, 'get', function () {
                return Promise.resolve(campaignResponse);
            })
            return restClient.apiBidder(url).then(function (res) {
                should(res.statusCode).eql(200);
                res.body.id.should.equal('5a3dce46')
                console.log(res.body)
            }).catch(function(err){
                console.log(err);
            })
        })
        it('Should return 204 if campaigns not found at all', function () {
            campaignRetriever.get.restore();
            sinon.stub(campaignRetriever, 'get', function () {
                return Promise.resolve([]);
            })
            return restClient.apiBidder(url).then(function (res) {
                should(res.statusCode).eql(204);
                console.log(res.body)
            }).catch(function(err){
                console.log(err);
            })
        })
        it('When a campaign has reached the pace threshold, the next campaign in the order should be returned. (Will simulate this by making two requests on the row and by setting threshold equal with 1)', function () {
            campaignRetriever.get.restore();
            sinon.stub(campaignRetriever, 'get', function () {
                return Promise.resolve(campaignResponse);
            })
            return restClient.apiBidder(url).then(function (res) {
                should(res.statusCode).eql(200);
                res.body.id.should.equal('5a3dce46')
                return restClient.apiBidder(url)
            }).then(function (res) {
                should(res.statusCode).eql(200);
                res.body.id.should.equal('e919799e')
                console.log(res.body)
            }).catch(function(err){
                console.log(err);
            })
        })
    })
})
