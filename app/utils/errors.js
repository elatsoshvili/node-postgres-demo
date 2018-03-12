var restify = require('restify');

var codes = {
    InvalidInput:       { code: 400, message: 'Invalid input is provided' },
    ResourceNotFound:   { code: 404, message: 'Could not find requested resource' }
};

global.Errors = {
    generate: function(inputCode, message){
        var errorDesc = codes[inputCode];
        var errorMessage = message || errorDesc.message;
        return new restify.RestError({
            statusCode: errorDesc.code,
            restCode: inputCode,
            message: errorMessage
        });
    },

    InternalServerError(message){
        return new restify.errors.InternalServerError(message);
    }
    
}