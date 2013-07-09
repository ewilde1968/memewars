/*
 * Risk model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RiskSchema = new Schema( {
    name:     { type:String, required:true }
});


RiskSchema.statics.factory = function( name, cb) {
    var result = new Risk({name:name
                          });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Risk = mongoose.model('Risk', RiskSchema);
module.exports = Risk;
