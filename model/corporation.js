/*
 * Corporation model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Locale = require('./locale');

var CorporationSchema = new Schema( {
    name:       { type:String, required:true },
    donation:   { type:Number, default:0 },
    locales:    [Locale.schema]
});


CorporationSchema.statics.factory = function( name, cb) {
    var result = new Corporation({name:name});

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Corporation = mongoose.model('Corporation', CorporationSchema);
module.exports = Corporation;
