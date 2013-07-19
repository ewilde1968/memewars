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
    achieved:       [Investment.schema],
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
        var initFunding = Math.floor( 100 / template.startingInvestments.length);
        template.startingInvestments.forEach( function(i) {
            var inv = Investment.factory(i,initFunding);
            if( inv)
                result.investments.push(inv);
        });
        result.investments[0].funding += 100 % template.startingInvestments.length;
    }

    if( template && template.startingPropaganda && template.startingPropaganda.length > 0) {
        var initFunding = Math.floor( 100 / template.startingPropaganda.length);
        template.startingPropaganda.forEach( function(p) {
            var pro = Propaganda.factory(p,initFunding);
            if( pro)
                result.props.push(pro);
        });
        result.props[0].funding += 100 % template.startingPropaganda.length;
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

    if( this.locales.length == 1)
        this.locales[0].setFunding(100);
    else this.locales.forEach( function(l) {
        l.setFunding( options[l.name]);
    });

    if( this.corps.length == 1)
        this.corps[0].setFunding(100);
    else this.corps.forEach( function(c) {
        c.setFunding( options[c.name]);
    });

    if( this.investments.length == 1)
        this.investments[0].setFunding(100);
    else this.investments.forEach( function(i) {
        i.setFunding( options[i.name]);
    });

    if( this.props.length == 1)
        this.props[0].setFunding(100);
    else this.props.forEach( function(p) {
        p.setFunding( options[p.name]);
    });
};

MemeplexSchema.methods.availableResources = function() {
    var result = this.capital;
    this.locales.forEach( function(l) {result+=l.availableResources();});
    this.corps.forEach( function(c) {result+=c.availableResources();});
    
    return result;
};

MemeplexSchema.methods.spendFunds = function() {
    var totalSpent = this.investment;
    this.investments.forEach( function(i) {i.spendFunds(totalSpent);});

    totalSpent = this.propaganda;
    this.props.forEach( function(p) {p.spendFunds(totalSpent);});
};

MemeplexSchema.methods.propagandaEvents = function() {
    this.props.forEach( function(p) {p.checkForEvents();});
};

MemeplexSchema.methods.completedInvestment = function(i) {
    i.remove();
    this.achieved.push(i);
};

MemeplexSchema.methods.investmentEvents = function() {
    var mp = this;
    this.investments.forEach( function(i) {
        i.checkForEvents(function(inv) {mp.completedInvestment(inv);});
    });
};

MemeplexSchema.methods.endQuarter = function() {
    // pay/collect interest
    // setup economy for coming turn
    // update turn object
};


var Memeplex = mongoose.model('Memeplex', MemeplexSchema);
module.exports = Memeplex;
