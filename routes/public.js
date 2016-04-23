// built-in modules
var path = require('path');


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

        var cost;

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
        var network = engine.networks.getNetwork(req.params.name);

        if (!network) {
          return utils.renderPage(req, res, 'error', {
              error: new engine.errors.NetworkNotFoundError(`network '${req.params.name}' not found`),
          });
        }

        return utils.renderPage(req, res, 'networks/index', _.assign(ctx || {}, {
            networks: engine.networks.getNetworks(),
            network: network,
            body: _.isEmpty(req.body) ? null : req.body,
        }));
    }


// News page
router.get("/news", function(req, res, next) {
  var filepath = path.resolve(__dirname, '../web/_raw/news.md');
  return renderMarkdownPage(req, res, next, filepath);
});


// Terms and conditions
router.use('/tcs', function(req, res, next) {
  var filepath = path.resolve(__dirname, '../web/_raw/tcs.md');
  return renderMarkdownPage(req, res, next, filepath);
});


/**
 * Render a markdown page
 */
function renderMarkdownPage(req, res, next, filepath) {
  return engine.pages.getHTML(filepath, function(getErr, html) {
    if (getErr) {
      return next(getErr);
    }

    return utils.renderPage(req, res, 'misc/content', {
      content: html,
    });
  });
}


// expose the router
exports = module.exports = router;
exports.router = router;
