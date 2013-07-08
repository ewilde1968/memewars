
/*
 * GET home page.
 */
var Game = require('./../model/game'),
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./../model/meme');

//app.post('/user/:userid/game/new', user.ensureSignedIn, game.createGame);
exports.createGame = function( req, res, next) {
    Game.factory({difficulty:req.body.difficulty},
                 req.body.meme,
                 req.session.userId,
                 function(err, game) {
                     if(err) return next(err);
                     if( game)
                         res.redirect('/user/' + req.params.userid + '/game/' + game._id.toHexString());
                     else
                         throw 'GET game:newGame - invalid Game object';
                });
};

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    res.render('initialsettings',
               {accountId:req.params.userid,
                memes:defaultObjects.availableMemes
               });

};

exports.initial = function(inData,callback) {
    Game.findById( inData.gameid, function(err,game) {
        if(err) return next(err);
        
        var resultA = new Array();
        game.characters.forEach( function(c) {
            c.homes.forEach( function(h) {
                if( resultA.indexOf(h) == -1)
                    resultA.push(h);
            });
        });
        
        game.socketSendBack('placecharacters', {homes:resultA}, callback);
    });
};

//app.get('/user/:userid/game/:gameid', user.ensureSignedIn, game.home);
exports.home = function( req, res, next) {
    Game.findById( req.params.gameid, function(err,game) {
        res.render( 'yearstart',
                   {accountId:req.params.userid,
                    game:game
                   });
    });
};

//app.post('/user/:userid/game/:gameid', user.ensureSignedIn, game.update);
exports.update = function( req, res, next) {
    throw 'POST game:update - not yet implemented';
};