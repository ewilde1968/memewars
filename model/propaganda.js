/*
 * Propaganda model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PropagandaSchema = new Schema( {
    name:       { type:String, required:true },
    funding:    { type:Number, default:0 }
});


PropagandaSchema.statics.factory = function( name, cb) {
    var result = new Propaganda({name:name,
                                 funding:0
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Propaganda = mongoose.model('Propaganda', PropagandaSchema);
module.exports = Propaganda;
