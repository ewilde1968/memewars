/*
 * Population model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PopulationSchema = new Schema( {
    race:       { type:String, required:true },
    size:       { type:Number, required:true },
    influence:  Number,
    gullability:Number,
    repulsion:  Number
});


PopulationSchema.statics.factory = function( name, initFunding, cb) {
    var result = new Population({name:name
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};


var Population = mongoose.model('Population', PopulationSchema);
module.exports = Population;
