/*
 * Turn model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TurnSchema = new Schema( {
    year:           { type:Number, required:true },
    quarter:        { type:String, required:true },
    income:         { type:Number, default:0 },
    propaganda:     { type:Number, default:0 },
    investment:     { type:Number, default:0 },
    corpIncome:     { type:Number, default:0 },
    localeIncome:   { type:Number, default:0 }
});


TurnSchema.statics.factory = function(cb) {
    var result = new Turn({year:2100,
                           quarter:"New Year",
                           income:0,
                           propaganda:0,
                           investment:0,
                           corpIncome:0,
                           localeIncome:0
                          });
    
    if(!!result && !!cb)
        cb(result);

    return result;
};


var Turn = mongoose.model('Turn', TurnSchema);
module.exports = Turn;
