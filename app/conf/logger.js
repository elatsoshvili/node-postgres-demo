
// Configure loggers
var bunyan = require('bunyan');
global.log = bunyan.createLogger({
    name: 'api',
    streams: [{
            level: (process.env.LOG_LEVEL || 'fatal'),
            path: 'log/api.log',
            type: 'rotating-file',
            period: '1d',   // daily rotation
            count: 3        // keep 3 back copies'
        },
        { 
            stream: process.stdout 
        }
    ]
});

module.exports.requestTraceLog = bunyan.createLogger({
    name: 'req-trace',
    stream: process.stdout
});