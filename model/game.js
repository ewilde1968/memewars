
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./meme'),
    Locale = require('./locale');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    settings:   Object,
    state:      String,
    memes:      [Meme.schema],
    locales:    [Locale.schema]
});


GameSchema.statics.factory = function( settings, meme, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial'
                          });
    
    defaultObjects.availableMemes.forEach( function(name) {
        var m = Meme.factory(name);
        if(meme == name)
            result.memes.unshift( m);      // player's meme is always the zeroeth element
        else
            result.memes.push( m);
    });
    
    defaultObjects.availableLocales.forEach( function(name) {
        result.locales.push(Locale.factory(name));
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
