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


TurnSchema.statics.factory = function( turn, cb) {
    var year = 2100;
    var quarter = "New Year";
    if( !!turn) {
        year = turn.year;
        switch( turn.quarter) {
            case 'New Year':
                quarter = 'Winter';
                break;
            case 'Winter':
                quarter = 'Spring';
                break;
            case 'Spring':
                quarter = 'Summer';
                break;
            case 'Summer':
                quarter = 'Fall';
                break;
            case 'Fall':
                quarter = 'New Year';
                year++;
                break;
            default:
                throw 'Turn factory: bad quarter'
        }
    }
    
    var result = new Turn({year:year,
                           quarter:quarter
                          });

    if(!!result && !!cb)
        cb(result);

    return result;
};


var Turn = mongoose.model('Turn', TurnSchema);
module.exports = Turn;
