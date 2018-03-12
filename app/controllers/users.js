// Users api
var userModel = require('../models/user');
var Validator = require('../utils/validator/validator');

var required = Validator.Required;

module.exports = {
    /**
     * @api {get} /users/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {Object} User user object.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "Elene",
     *       "lastname": "Latsoshvili",
     *       "email": "elatsoshvili@gmail.com",
     *       "id": 1
     *     }
     *
     * @apiError ResourceNotFound error.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "code": "ResourceNotFound",
     *       "message": "Could not find requested resource"
     *     }
     */
    get: function(req, res, next) {
        let id = req.params.id;
        userModel.get(id, true).then(function(user){
            var result = user ? user : Errors.generate('ResourceNotFound');
            res.send(result);
            next();
        }).catch(function(err){
            res.send(err);
            next();
        });
    },

    /**
     * @api {post} /users Post User information
     * @apiName AddUser
     * @apiGroup User
     *
     * @apiParam {String} firstname Users first name.
     * @apiParam {String} lastname Users last name.
     * @apiParam {String} email Users email.
     * @apiParam {String} password Users password as plain text.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *          "firstname": "Elene",
     *          "lastname": "Latsoshvili",
     *          "email": "elatsoshvili@gmail.com",
     *          "password": "2345"
     *     }

     * @apiSuccess {Object} Id of added user.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 1
     *     }
     *
     */
    register: function(req, res, next){
        var input = req.body;
        
        if (!Validator.validate(input, res, {
           firstname: required,
           lastname: required,
           email: [required],
           password: required
        })) return;

        var user = {
            email: input.email,
            firstname: input.firstname,
            lastname: input.lastname,
            password: input.password
        };
        
        return userModel.register(user).then(function(result, fields){
            res.send(result);
            next();
        }).catch(function(error){
            res.send(error);
            next();
        });
    },


    /**
     * @api {put} /users/:id Update User information
     * @apiName UpdateUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     * 
     * @apiParam {String} firstname Users first name.
     * @apiParam {String} lastname Users last name.
     * @apiParam {String} email Users email.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *          "firstname": "Elene",
     *          "lastname": "Latsoshvili",
     *          "email": "elatsoshvili@gmail.com"
     *     }
     *
     *
     * @apiError ResourceNotFound error.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "code": "ResourceNotFound",
     *       "message": "Could not find requested resource"
     *     }
     */
    update: function(req, res, next) {
        let id = req.params.id;
        var input = req.body;
        
        if (!Validator.validate(input, res, {
           firstname: required,
           lastname: required,
           email: [required]
        })) return;

        var user = {
            email: input.email,
            firstname: input.firstname,
            lastname: input.lastname
        };

        userModel.update(id, user).then(function(){
            res.send();
            next();
        }).catch(function(err){
            res.send(err);
            next();
        });
    },

    /**
     * @api {delete} /users/:id Delete User
     * @apiName DeleteUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     */
    delete: function(req, res, next) {
        let id = req.params.id;
        userModel.delete(id).then(function(){
            res.send();
            next();
        }).catch(function(err){
            res.send(err);
            next();
        });
    },

    /**
     * @api {get} /users Request user list
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiSuccess {Object} anonymous List of users.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "firstname": "Elene",
     *       "lastname": "Latsoshvili",
     *       "email": "elatsoshvili@gmail.com",
     *       "id": 1
     *     }]
     *     
     */
    list: function(req, res, next) {
        userModel.list().then(function(users){
            res.send(users);
            next();
        }).catch(function(err){
            res.send(err);
            next();
        });
    },
}