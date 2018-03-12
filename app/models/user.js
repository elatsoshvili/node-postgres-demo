var Utils = require('../utils/utils');

var UserModel = {
    get: function(id) {
        return query('select id, firstname, lastname, email from  users where id = $1', [id])
            .then(function(result){
                if (result.rows && result.rows.length > 0) return result.rows[0];
                return null;
            });
    },

    list: function() {
        return query('select id, firstname, lastname, email from users')
            .then(function(result){
                return result.rows || [];
            });
    },

    register: function(user) {
        // Hash password
        user.password = Utils.bcrypt(user.password);
        
        // Insert user record
        return query('INSERT INTO users(firstname, lastname, password, email) values($1,$2,$3,$4) RETURNING id', 
                    [user.firstname, user.lastname, user.password, user.email])
                .then(function(result){
                    let insertId = result.rows[0].id;
                    log.debug('User %s created successfully', insertId);
                    // Return inserted user id
                    return { id: insertId };
                });
    },

    update: function(id, user) {
        return query('select * from users where id = $1', [id])
            .then(function(result){
                if (result.length == 0) {
                    return Errors.generate('ResourceNotFound');
                } else {
                    let existingUser = result[0];
                    let validData = {
                        firstname: user.firstname || existingUser.firstname,
                        lastname: user.lastname || existingUser.lastname,
                        email: user.email || existingUser.email, // TODO ideally there should be another service to update email with verification
                        // TODO there should be another service for reseting password
                    }
                    return query('update users set firstname = $1, lastname = $2, email =$3 where id = $4', 
                        [validData.firstname, validData.lastname, validData.email, id]).then(function(){
                        log.debug('User %s updated successfully', id);
                    });
                }
            });
    },

    delete: function(id) {
        return query('delete from users where id = $1', [id]).then(function(){
            log.debug('User %s deleted successfully', id);
        });
    }
}

module.exports = UserModel;