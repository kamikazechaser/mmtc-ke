// npm-installed modules
var Debug = require("debug");
var express = require("express");


// module variables
var debug = Debug("mmtc-ke:routes:api");
var router = express.Router();


// just say hello
router.use("/", function(req, res) {
    return res.json({ message: "Hello, World!" });
});


// expose the router
exports = module.exports = router;
exports.router = router;
