/*
 * Propaganda model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PropagandaSchema = new Schema( {
    name:           { type:String, required:true },
    funding:        Number,
    fundsThisTurn:  Number
});


PropagandaSchema.statics.factory = function( name, initFunding, cb) {
    var result = new Propaganda({name:name,
                                 funding:initFunding,
                                 fundsThisturn:0
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

PropagandaSchema.methods.setFunding = function(val) {
    if( typeof val == 'string')
        val = parseInt(val,10);
    this.funding = val;
};

PropagandaSchema.methods.spendFunds = function(total) {
    this.fundsThisTurn = Math.floor( total * this.funding / 100);
};

PropagandaSchema.methods.checkForEvents = function() {
};  // TODO

var Propaganda = mongoose.model('Propaganda', PropagandaSchema);
module.exports = Propaganda;
