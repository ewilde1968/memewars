/*
 * Meme model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Corporation = require('./corporation'),
    Investment = require('./investment'),
    Propaganda = require('./propaganda');

var MemeSchema = new Schema( {
    name:           { type:String, required:true },
    heroes:         [Creature.schema],
    corps:          [Corporation.schema],
    investments:    [Investment.schema],
    propagandas:    [Propaganda.schema],
    victory:        [Object],
    investmentName: String,
    monetaryUnit:   String
});


MemeSchema.statics.factory = function( template, cb) {
    var result = new Meme({name:template.name,
                           investmentName:template.investmentName,
                           monetaryUnit:template.monetaryUnit
                          });

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

MemeSchema.methods.createAndAddLeader = function( race, difficulty) {
    // TODO - use difficulty to adjust creature
    var newLeader = Creature.factory( generateName(race), race);
    this.heroes.push( newLeader);
};


var Meme = mongoose.model('Meme', MemeSchema);
module.exports = Meme;
