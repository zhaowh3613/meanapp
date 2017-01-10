var config = require('./config'),
mongoose = require('mongoose');
module.exports = function(){
    var db = mongoose.createConnection(config.db);
    db.on('error', console.error.bind(console, 'db connection error:'));
    db.once('open', function(callback){
        console.log('db connect successful');
    });
    require('../app/models/users.server.model');
    return db;
}