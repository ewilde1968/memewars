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
    props:          [Propaganda.schema],
    victory:        [Object],
    investmentName: String,
    monetaryUnit:   String,
    income:         { type:Number, default:0 },
    capital:        { type:Number, default:0 },
    propaganda:     { type:Number, default:0 },
    investment:     { type:Number, default:0 },
    localeVsCorp:   { type:Number, default:0 },
    corpIncome:     { type:Number, default:0 },
    localeIncome:   { type:Number, default:0 }
});


MemeSchema.statics.factory = function( template, settings, cb) {
    var result = new Meme({name:template.name,
                           investmentName:template.investmentName,
                           monetaryUnit:template.monetaryUnit,
                           income:0,
                           capital:0,
                           propaganda:0,
                           investment:0,
                           localeVsCorp:0,
                           corpIncome:0,
                           localeIncome:0
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
                result.props.push(pro);
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

MemeSchema.methods.mergeOptions = function(options) {
    this.heroes.forEach( function(h) {
        h.setFunding( 'on' == options[h.name]);
    });

    this.locales.forEach( function(l) {
        l.setFunding( options[l.name]);
    });

    this.corps.forEach( function(c) {
        c.setFunding( options[c.name]);
    });

    //investments:    [Investment.schema],
    //props:     [Propaganda.schema],

    if( options && options.propaganda)
        this.propaganda = options.propaganda;
    if( options && options.investment)
        this.investment = options.investment;
    if( options && options.localeVsCorp)
        this.localeVsCorp = options.localeVsCorp;
};

MemeSchema.methods.endQuarter = function() {
};


var Meme = mongoose.model('Meme', MemeSchema);
module.exports = Meme;
