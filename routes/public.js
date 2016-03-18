// npm-installed modules
var _ = require('lodash');
var Debug = require("debug");
var express = require("express");


// own modules
var engine = require('../engine');
var utils = require('./utils');


// module variables
var debug = Debug("mmtc-ke:routes:public");
var router = express.Router();


// home page
router.get("/", function(req, res) {
    return utils.renderPage(req, res, 'index', {
        networks: engine.getNetworks(),
    });
});


// network page
router
    .route('/n/:name')
    .get(function(req, res) {
        return renderNetworkPage(req, res);
    })
    .post(function(req, res) {
        if (!_.isString(req.body.amount)) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'invalid amount',
                },
            });
        }
        if (!_.isString(req.body.transactionType)) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'invalid transaction type',
                },
            });
        }
        if (!_.isString(req.body.transactor)) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'invalid transactor',
                },
            });
        }

        var cost;

        try {
            cost = engine.calculate(req.params.name, req.body);
        } catch(err) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: err.message,
                },
            });
        }

        if (cost === null) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'Calculation impossible',
                },
            });
        } else if (cost === -1) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'Amount is not allowed',
                },
            });
        }
        return renderNetworkPage(req, res, {
            defaults: {
                amount: req.body.amount,
            },
            result: {
                success: true,
                cost,
            },
        });
    });
    function renderNetworkPage(req, res, ctx) {
        return utils.renderPage(req, res, 'networks/index', _.assign(ctx || {}, {
            networks: engine.getNetworks(),
            network: engine.getNetwork(req.params.name),
            body: _.isEmpty(req.body) ? null : req.body,
        }));
    }


// News page
router.get("/news", function(req, res) {
    return utils.renderPage(req, res, "news/index");
});


// Terms and conditions
router.use('/tcs', function(req, res) {
    return utils.renderPage(req, res, 'misc/tcs');
});


// expose the router
exports = module.exports = router;
exports.router = router;
