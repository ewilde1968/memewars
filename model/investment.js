/*
 * Investment model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var InvestmentSchema = new Schema( {
    name:       { type:String, required:true },
    funding:    { type:Number, default:0 }
});


InvestmentSchema.statics.factory = function( name, cb) {
    var result = new Investment({name:name,
                                 funding:0
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Investment = mongoose.model('Investment', InvestmentSchema);
module.exports = Investment;
