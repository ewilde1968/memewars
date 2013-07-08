/*
 * Creature model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CreatureSchema = new Schema( {
    name:       { type:String, required:true }
});


CreatureSchema.statics.factory = function( name, cb) {
    var result = new Creature({name:name
                          });

    if(!!result && !!cb)
        cb(result);
};


var Creature = mongoose.model('Creature', CreatureSchema);
module.exports = Creature;