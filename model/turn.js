/*
 * Turn model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Risk = require('./risk');

var TurnSchema = new Schema( {
    year:       { type:Number, required:true },
    quarter:    { type:String, required:true },
    focus:      Number,
    risks:      [Risk.schema]
});


TurnSchema.statics.factory = function(cb) {
    var result = new Turn({year:2100,
                           quarter:"New Year"
                          });
    
    if(!!result && !!cb)
        cb(result);

    return result;
};


var Turn = mongoose.model('Turn', TurnSchema);
module.exports = Turn;
