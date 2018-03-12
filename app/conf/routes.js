var restify = require('restify');

function include(controller){
    return require('../controllers/' + controller);
}

var users = include('users');

function configure(server) {
    // User routes
    server.post('/users', users.register);
    server.get('/users', users.list);
    server.get('/users/:id', users.get);
    server.del('/users/:id', users.delete);
    server.put('/users/:id', users.update);
} 

module.exports = configure;