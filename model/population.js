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
    repulsion:  Number,
    donation:   Number
});


PopulationSchema.statics.factory = function( race, cb) {
    var result = new Population({race:race,
                                 size:1,
                                 influence:0,
                                 gullability:0,
                                 repulsion:0,
                                 donation:25
                                });

    if(!!result && !!cb)
        cb(result);
    
    return result;
};

PopulationSchema.methods.availableResources = function() {
    return this.size * this.donation;
}

var Population = mongoose.model('Population', PopulationSchema);
module.exports = Population;
