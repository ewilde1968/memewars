/*
 * Locale model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature');

var LocaleSchema = new Schema( {
    name:       { type:String, required:true },
    characters: [Creature.schema]
});


LocaleSchema.statics.factory = function( name, cb) {
    var result = new Locale({name:name
                          });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};



var Locale = mongoose.model('Locale', LocaleSchema);
module.exports = Locale;
