
module.exports = function (config) {
    var express = require('express');
    var multer = require('multer');
    var router = express.Router();
    var utils = require('../utils');
    var bidderService = require('../service/bidderService')
    var bidderController = require('../controllers/bidderController')(bidderService);
    var storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now())
        }
    })
    var upload = multer({storage: storage})
    var cpUpload = upload.fields([
        {name: 'jsonCompanyA', maxCount: 1},
        {name: 'jsonCompanyB', maxCount: 1}
    ])
    router.post('/api/bidder', bidderController.parseAdExchange)
    router.get('/api', function (req, res) {
        res.send('Discrepancy Server is running');
    })
    return router;
}