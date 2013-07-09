/*
 * Meme model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature');

var MemeSchema = new Schema( {
    name:       { type:String, required:true },
    heroes:     [Creature.schema],
    victory:    [Object]
});


MemeSchema.statics.factory = function( template, cb) {
    var result = new Meme({name:template.name
                          });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

var Meme = mongoose.model('Meme', MemeSchema);
module.exports = Meme;
