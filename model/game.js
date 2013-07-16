
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./meme'),
    Turn = require('./turn'),
    Corporation = require('./corporation');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    settings:   Object,
    state:      String,
    memes:      [Meme.schema],
    turns:      [Turn.schema]       // zeroth turn is current turn
});


GameSchema.statics.factory = function( settings, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial'
                          });

    var takenCorps = new Array();
    defaultObjects.memes.forEach( function(memeTemplate) {
        var m = Meme.factory(memeTemplate, settings);
        if(settings.meme == memeTemplate.name) {
            result.memes.unshift( m);      // player's meme is always the zeroeth element

        } else
            result.memes.push( m);

        if( !!memeTemplate.startingCorporationOdds && memeTemplate.startingCorporationOdds.length > 0) {
            var i = Math.floor(Math.random()*memeTemplate.startingCorporationOdds.length)
            do {
                var corpName = memeTemplate.startingCorporationOdds[i];
                if( takenCorps.indexOf( corpName) == -1) {
                    takenCorps.push( corpName);
                    var corp = Corporation.factory( corpName);
                    if( corp)
                        m.corps.push( corp);
                }
                i = (i + 1) % memeTemplate.startingCorporationOdds.length;
            } while( m.corps.length < 1);
        }
    });
    
    result.turns.push( Turn.factory());

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
