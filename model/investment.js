/*
 * Investment model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var InvestmentSchema = new Schema( {
    name:           { type:String, required:true },
    fundsNeeded:    { type:Number, required:true },
    funding:        Number,
    fundsAcquired:  Number
});


InvestmentSchema.statics.factory = function( name, initFunding, cb) {
    var result = new Investment({name:name,
                                 funding:initFunding,
                                 fundsNeeded:0,
                                 fundsAcquired:0
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Investment = mongoose.model('Investment', InvestmentSchema);
module.exports = Investment;
