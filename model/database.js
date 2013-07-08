
/*
 * Database mdoel
 */
module.exports = Database;

var mongoose = require('mongoose'),
    defaultObjects = require('./defaultObjects');

var connected = false;
function Database () {
    if( !connected)
        mongoose.connect('mongodb://127.0.0.1/memewars');
    connected = true;
    
    return this;
};

Database.prototype.initialize = function() {
    // see if the database is setup properly and, if not, initialize
};
