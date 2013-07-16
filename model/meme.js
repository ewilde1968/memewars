/*
 * Meme model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Locale = require('./locale'),
    Corporation = require('./corporation'),
    Investment = require('./investment'),
    Propaganda = require('./propaganda');

var MemeSchema = new Schema( {
    name:           { type:String, required:true },
    heroes:         [Creature.schema],
    locales:        [Locale.schema],
    corps:          [Corporation.schema],
    investments:    [Investment.schema],
    propaganda:     [Propaganda.schema],
    victory:        [Object],
    investmentName: String,
    monetaryUnit:   String
});


MemeSchema.statics.factory = function( template, settings, cb) {
    var result = new Meme({name:template.name,
                           investmentName:template.investmentName,
                           monetaryUnit:template.monetaryUnit
                          });

    if( template && template.leaderOdds && template.leaderOdds.length > 0)
        for( var i = 0; i < template.leadersAtStart; i++)
            result.createAndAddLeader(template.leaderOdds, settings.difficulty);

    if( template && template.locales && template.locales.length > 0) {
        var initFunding = Math.floor( 100 / template.locales.length);
        template.locales.forEach( function(locale) {
            result.locales.push( Locale.factory(locale,initFunding));
        });
        result.locales[0].funding += 100 % template.locales.length;
    }

    if( template && template.startingInvestments && template.startingInvestments.length > 0) {
        template.startingInvestments.forEach( function(i) {
            var inv = Investment.factory(i);
            if( inv)
                result.investments.push(inv);
        });
    }

    if( template && template.startingPropaganda && template.startingPropaganda.length > 0) {
        template.startingPropaganda.forEach( function(p) {
            var pro = Propaganda.factory(p);
            if( pro)
                result.propaganda.push(pro);
        });
    }

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

// TODO - use real names
var usedNames;
var generateName = function(race) {
    if( !!usedNames === false)
        usedNames = new Array();
    
    if( !!usedNames[race] === false)
        usedNames[race] = 0;
    usedNames[race] = usedNames[race]+1;

    return race + usedNames[race];
};

MemeSchema.methods.createAndAddLeader = function( raceA, difficulty) {
    // TODO - use difficulty to adjust creature
    var race = raceA[Math.floor(Math.random()*raceA.length)];
    this.heroes.push( Creature.factory( generateName(race), race));
};


var Meme = mongoose.model('Meme', MemeSchema);
module.exports = Meme;
