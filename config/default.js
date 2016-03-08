// npm-installed modules
var cfenv = require('cfenv');


// module variables
var appEnv = cfenv.getAppEnv();
var config = {};


// server configuration
config.server = {};
config.server.port = appEnv.port;
config.server.ip = '0.0.0.0';


// site configuration
config.site = {};
config.site.title = `Mobile Money Transaction Cost in Kenya`;
config.site.title_short = `mmtc-ke`;
config.site.email = `we@forfuture.co.ke`;
config.site.description = `An easy way to calculate cost of mobile money transcations in Kenya`
config.site.url = `https://mtc-ke.eu-gb.mybluemix.net/`;
config.site.baseurl = ``;
config.site.author = {};
config.site.author.name = 'Forfuture LLC';
config.site.author.url = 'http://forfuture.co.ke';


// export the configuration
exports = module.exports = config;
