
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./meme'),
    Locale = require('./locale'),
    Turn = require('./turn'),
    Risk = require('./risk');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    settings:   Object,
    state:      String,
    memes:      [Meme.schema],
    locales:    [Locale.schema],
    turns:      [Turn.schema],       // zeroth turn is current turn
});


GameSchema.statics.factory = function( settings, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial'
                          });
    
    defaultObjects.memes.forEach( function(memeTemplate) {
        var m = Meme.factory(memeTemplate);
        if(settings.meme == memeTemplate.name) {
            result.memes.unshift( m);      // player's meme is always the zeroeth element
            
            if( !!memeTemplate.locales && memeTemplate.locales.length > 0) {
                var initFunding = Math.floor( 100 / memeTemplate.locales.length);
                memeTemplate.locales.forEach( function(locale) {
                    result.locales.push( Locale.factory(locale,initFunding));
                });
                result.locales[0].funding += 100 % memeTemplate.locales.length;
            }

            if( !!memeTemplate.leaderOdds && memeTemplate.leaderOdds.length > 0)
                for( var i = 0; i < memeTemplate.leadersAtStart; i++) {
                    result.memes[0].createAndAddLeader(memeTemplate.leaderOdds[Math.floor(
                        Math.random()*memeTemplate.leaderOdds.length)],
                                                       settings.difficulty);
                }
        } else
            result.memes.push( m);
    });
    
    result.turns.push( Turn.factory());

    
    // TODO - Risks, these are dummy risks below
    defaultObjects.risks.forEach( function(name) {
        result.turns[0].risks.push(Risk.factory(name));
    });
    
    result.update(cb);
};

GameSchema.methods.update = function(cb) {
    this.save( function(err,game) {
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
