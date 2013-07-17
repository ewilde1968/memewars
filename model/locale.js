/*
 * Locale model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LocaleSchema = new Schema( {
    name:       { type:String, required:true },
    funding:    { type:Number, default:0 },
    donation:   { type:Number, default:0 }
});


LocaleSchema.statics.factory = function( name, initFunding, cb) {
    var result = new Locale({name:name,
                             funding:initFunding
                          });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

LocaleSchema.methods.setFunding = function( val) {
    if( typeof val == 'string')
        val = parseInt(val,10);
    this.funding = val;
};


var Locale = mongoose.model('Locale', LocaleSchema);
module.exports = Locale;
