/*
 * Memeplex model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Locale = require('./locale'),
    Corporation = require('./corporation'),
    Investment = require('./investment'),
    Propaganda = require('./propaganda');

var MemeplexSchema = new Schema( {
    name:           { type:String, required:true },
    leaders:         [Creature.schema],
    locales:        [Locale.schema],
    corps:          [Corporation.schema],
    investments:    [Investment.schema],
    props:          [Propaganda.schema],
    investmentName: String,
    monetaryUnit:   String,
    capital:        Number,
    loanInterest:   Number,
    invInterest:    Number,
    propaganda:     Number,
    investment:     Number
});


MemeplexSchema.statics.factory = function( template, settings, cb) {
    var result = new Memeplex({name:template.name,
                               investmentName:template.investmentName,
                               monetaryUnit:template.monetaryUnit,
                               capital:0,
                               propaganda:0,
                               investment:0
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

MemeplexSchema.methods.createAndAddLeader = function( raceA, difficulty) {
    // TODO - use difficulty to adjust creature
    var race = raceA[Math.floor(Math.random()*raceA.length)];
    this.leaders.push( Creature.factory( generateName(race), race));
};

MemeplexSchema.methods.mergeOptions = function(options) {
    if( options && options.propaganda)
        this.propaganda = options.propaganda;
    if( options && options.investment)
        this.investment = options.investment;

    this.leaders.forEach( function(h) {
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
};

MemeplexSchema.methods.availableResources = function() {
    var result = this.capital;
    this.locales.forEach( function(l) {result+=l.availableResources();});
    this.corps.forEach( function(c) {result+=c.availableResources();});
    
    return result;
};

MemeplexSchema.methods.endQuarter = function() {
    // pay/collect interest
};


var Memeplex = mongoose.model('Memeplex', MemeplexSchema);
module.exports = Memeplex;
