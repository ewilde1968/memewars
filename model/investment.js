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

InvestmentSchema.methods.setFunding = function(val) {
    if( typeof val == 'string')
        val = parseInt(val,10);
    this.funding = val;
};

InvestmentSchema.methods.spendFunds = function(total) {
    this.fundsAcquired += Math.floor( total * this.funding / 100);
};

InvestmentSchema.methods.checkForEvents = function(completeCB) {
    if( this.fundsAcquired > this.fundsNeeded) {
        if(completeCB) completeCB(this);
    }
};


var Investment = mongoose.model('Investment', InvestmentSchema);
module.exports = Investment;
