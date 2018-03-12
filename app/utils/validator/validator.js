var Validator = {
    Required: 'required',

    validate: function(input, res, fields) {
        if (fields && !input) {
             error = Errors.generate('InvalidInput', 'Empty body');
        } else {
            var error = null;
            var errorMessages = [];
            outer:    
            for (var key in fields) {
                var requirements = fields[key];
                if (typeof requirements == 'string') {
                    requirements = [requirements];
                }

                for (var i in requirements) {
                    var requirement = requirements[i];
                    try {
                        var result = validateRequirement(key, input[key], requirement);
                        if (!result[0]) {
                            errorMessages.push(result[1]);
                        }
                    } catch(err) {
                        error = err;
                        break outer;
                    }
                }
            }

            if (errorMessages.length > 0) {
                error = Errors.generate('InvalidInput', errorMessages.join(', '));
            }
        }
        if (error) {
            res.send(error);
            return false;
        } else return true;
    }
};

var validateRequirement = function(key, value, requirement) {
    switch(requirement) {
        case Validator.Required: 
            return [!!value, key + ' is required.'];
        default: 
            // Validator does not exist
            var errorMessage = 'Validator does not exist: ' + requirement;
            throw Errors.InternalServerError(errorMessage);
    }
}

module.exports = Validator;