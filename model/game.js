
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    settings:   Object,
    state:      String
});


GameSchema.statics.factory = function( settings, characters, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial'
                          });
    result.update(cb);
};

GameSchema.methods.update = function(cb) {
    this.save( function(err,game) {
        if( err) return err;
        if(cb) cb(err,game);
    });
};

GameSchema.methods.socketSendBack = function(newState,data,callback) {
    if( !!newState)
        this.state = newState;
    data.state = this.state;
    
    this.save( function(err,g) {
        if(err) return next(err);
        if( callback) callback(data)
    });
};


var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
