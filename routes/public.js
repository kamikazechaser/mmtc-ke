/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Router for public pages on the web.
 */


// built-in modules
const path = require('path');


// npm-installed modules
const _ = require('lodash');
const Debug = require('debug');
const express = require('express');


// own modules
const engine = require('../engine');
const utils = require('./utils');


// module variables
const debug = Debug("mmtc-ke:routes:public");
const router = express.Router();


// expose the router
exports = module.exports = router;
exports.router = router;


// home page
router.get("/", function(req, res) {
    return utils.renderPage(req, res, 'index', {
        networks: engine.networks.getNetworks(),
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

        let cost;

        try {
            cost = engine.math.calculate(req.params.name, req.body);
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
        } else if (cost === -2) {
            return renderNetworkPage(req, res, {
                result: {
                    error: true,
                    message: 'Consult merchant',
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
        const network = engine.networks.getNetwork(req.params.name);

        if (!network) {
          return utils.renderPage(req, res, 'error', {
              error: new engine.errors.NetworkNotFoundError(`network '${req.params.name}' not found`),
          });
        }

        return utils.renderPage(req, res, 'networks/index', _.assign(ctx || {}, {
            networks: engine.networks.getNetworks(),
            network,
            body: _.isEmpty(req.body) ? null : req.body,
        }));
    }


// News page
router.get('/news', function(req, res, next) {
  const filepath = path.resolve(__dirname, '../docs/news.md');
  return utils.renderMarkdownPage(req, res, next, filepath);
});


// Terms and conditions
router.get('/tcs', function(req, res, next) {
  const filepath = path.resolve(__dirname, '../docs/terms-and-conditions.md');
  return utils.renderMarkdownPage(req, res, next, filepath);
});
