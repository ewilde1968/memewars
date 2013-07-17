
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./meme'),
    Corporation = require('./corporation');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    settings:   Object,
    state:      String,
    memes:      [Meme.schema],
    turn:      { year:Number, quarter:String }
});


GameSchema.statics.factory = function( settings, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial',
                           turn:{year:2100,quarter:"New Year"}
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

    result.update(cb);
};

GameSchema.methods.update = function(cb) {
    this.save( function(err,game) {
        if(cb) cb(err,game);
    });
};

GameSchema.methods.mergeOptions = function( options) {
    this.memes[0].mergeOptions(options);
};

GameSchema.methods.nextTurn = function(cb) {
    var err = null;

    // pay interest
    // Corporate and locale allocations to investments
    // Corporate and locale allocations to propaganda
    // Timeline events
    // Triggered propaganda events
    // Collect interest on surplus or pay off debt
    // Triggered investment events
    // end quarter
    this.memes.forEach( function(m) {
        m.endQuarter();
    });

    if(cb) cb(err,this);
}


var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
