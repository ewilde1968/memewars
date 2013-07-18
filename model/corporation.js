/*
 * Corporation model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Locale = require('./locale');

var CorporationSchema = new Schema( {
    name:       { type:String, required:true },
    donation:   Number,
    funding:    Number,
    influence:  Number,
    locales:    [Locale.schema]
});


CorporationSchema.statics.factory = function( name, cb) {
    var result = new Corporation({name:name,
                                  donation:0,
                                  funding:0,
                                  influence:0
                                 });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

CorporationSchema.methods.setFunding = function(val) {
    if( typeof val == 'string')
        val = parseInt(val,10);
    this.funding = val;
};


var Corporation = mongoose.model('Corporation', CorporationSchema);
module.exports = Corporation;
