var bcrypt = require('bcrypt');
var crypto = require('crypto');
var moment = require('moment');
const saltRounds = 10;

module.exports = {
    bcrypt: function(plainText) {
        var salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(plainText, salt);
    },

    bcryptCompare: function(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    },

    generateRandomString: function(){
        return crypto.randomBytes(20).toString('hex');
    },

    dateTime: function(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },

  
    isConfigSet: function(key) {
        return process.env[key] && process.env[key].toLowerCase() == 'yes';
    },

    promiseEach: function(arr, exec) {
        let chain;
        return new Promise(function(resolve, reject){
            for (let i = 0; i < arr.length; i++) {
                if (chain) chain = chain.then(function(){
                    return exec(arr[i]);
                });
                else chain = exec(arr[i]);
            }
            chain.then(function(){
                resolve();
            });
        });        
    },

    random: function(min, max){
        return Math.random() * (max - min) + min;
    },

    shallowCopy: function(obj) {
        return Object.assign({}, obj);
    }
}