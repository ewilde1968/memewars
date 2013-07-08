/*
 * Meme model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var MemeSchema = new Schema( {
    name:       { type:String, required:true },
    heroes:     [ObjectId],
    victory:    [Object]
});


MemeSchema.statics.factory = function( name, cb) {
    var result = new Meme({name:name
                          });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Meme = mongoose.model('Meme', MemeSchema);
module.exports = Meme;
