
/*
 * GET home page.
 */
var Game = require('./../model/game'),
    Account = require('./../model/account'),
    defaultObjects = require('./../model/defaultObjects'),
    Meme = require('./../model/meme');

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    res.render('initialsettings',
               {accountId:req.params.userid,
                memes:defaultObjects.memes
               });

};

//app.post('/user/:userid/game/new', user.ensureSignedIn, game.createGame);
exports.createGame = function( req, res, next) {
    Game.factory({difficulty:req.body.difficulty,
                  meme:req.body.meme
                 },
                 req.session.userId,
                 function(err, game) {
                     if(err) return next(err);

                     Account.findByIdAndUpdate( req.session.userId,{currentGame:game.id}).exec();

                     if( game)
                         res.redirect('/user/' + req.params.userid + '/game/' + game._id.toHexString());
                     else
                         throw 'GET game:newGame - invalid Game object';
                });
};

//app.get('/user/:userid/game/:gameid', user.ensureSignedIn, game.home);
exports.home = function( req, res, next) {
    Game.findById( req.params.gameid, function(err,game) {
        res.render( 'gamehome',
                   {accountId:req.params.userid,
                    gameId:req.params.gameid,
                    game:game
                   });
    });
};

//app.post('/user/:userid/game/:gameid', user.ensureSignedIn, game.update);
exports.update = function( req, res, next) {
    Game.findById( req.params.gameid, function(err,game) {
        game.mergeOptions( req.body);
        game.nextTurn( function(err,game) {
            if(err) return err;
            res.render( 'gamehome',
                       {accountId:req.params.userid,
                        gameId:req.params.gameid,
                        game:game
                       });
        });
    });
};