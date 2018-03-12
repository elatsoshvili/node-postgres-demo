// Load environment config
require('dotenv').config();

// Create database pool
require('./app/conf/database');

// Load Error utils
require('./app/utils/errors');

// Create and configure restify server
var restify = require('restify');
var server = restify.createServer();
// This line MUST appear before any route declaration
// server.pre(restify.CORS({
//   origins: ['*']
// }));

server.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1000");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
  return next();
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

// Set up global logger and get one for auditLogger, too.
var logger = require('./app/conf/logger');
server.on('after', restify.auditLogger({
  log: logger.requestTraceLog
}));

// Load routes
var routes = require('./app/conf/routes');
routes(server);

// Start server
server.listen(8081, function(){
    console.log('%s listening at %s', server.name, server.url);
});

// Export server for integration tests
module.exports = server;