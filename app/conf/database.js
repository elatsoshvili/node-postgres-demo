const { Pool, Client } = require('pg');

const pool  = new Pool();

global.query = function(sql, data){
    return new Promise(function(resolve, reject){
        function processError(error){
            log.error(error);
            reject(Errors.InternalServerError(error.toString()));
        }

        // Note: Currently single requests are executed on any client in the pool. But when we need
        // transactions, we'll need to manage pool clients, too.

        // Perform query
        var performedQuery = pool.query(sql, data, function(error, results){
            if (error) {
                processError(error);
                return;
            }
            resolve(results);
        });
    });
}