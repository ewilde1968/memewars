/*
 * Locale model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Population = require('./population');

var LocaleSchema = new Schema( {
    name:       { type:String, required:true },
    population: [Population.schema], // if member of meme, is supporters of meme; else neutrals
    biotech:    Number,
    aitech:     Number,
    nanotech:   Number,
    funding:    Number               // percentage of propaganda received, valid only if member of meme
});


LocaleSchema.statics.factory = function( name, initFunding, cb) {
    var result = new Locale({name:name,
                             funding:initFunding
                            });

    // TODO add population
    result.population.push( Population.factory( 'Human'));
    
    if(!!result && !!cb)
        cb(result);
    
    return result;
};

LocaleSchema.methods.setFunding = function(val) {
    if( typeof val == 'string')
        val = parseInt(val,10);
    this.funding = val;
};

LocaleSchema.methods.availableResources = function() {
    var result = 0;
    this.population.forEach( function(p) {result+=p.availableResources();});
    return result;
};


var Locale = mongoose.model('Locale', LocaleSchema);
module.exports = Locale;
