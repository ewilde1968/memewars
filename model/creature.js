/*
 * Creature model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    defaultObjects = require('./../model/defaultObjects');

var CreatureSchema = new Schema( {
    name:       { type:String, required:true },
    race:       { type:String, required:true },
    funded:     { type:Boolean, default:false },
    selffunding:{ type:Boolean, default:false },
    profession: { name:String, level:Number },
    community:  { type:Number, required:true },
    management: { type:Number, required:true },
    charisma:   { type:Number, required:true }
});


var interpretTemplate = function( str) {
    if( typeof str == 'number')
        return str;
    
    var numD = 0,sizeD=0,addD=0;
    str.split(/[d\+]/,5).forEach( function(e,i) {
        switch( i) {
            case 0:
                numD = parseInt(e,10);
                break;
            case 1:
                sizeD = parseInt(e,10);
                break;
            case 2:
                addD = parseInt(e,10);
                break;
            default:
                throw "creature.js interpretTemplate too many template ds";
        }
        
    });

    var result = addD;
    while( numD-- > 0)
        result += Math.floor( Math.random() * sizeD) + 1;
    
    return result;
};

CreatureSchema.statics.factory = function( name, race, cb) {
    for( var i = 0; i < defaultObjects.creatureTemplates.length; i++) {
        if( defaultObjects.creatureTemplates[i].race == race) {
            var result = new Creature({name:name,
                                       race:race,
                                       profession:{name:'TODO',
                                                   level:interpretTemplate(defaultObjects.creatureTemplates[i].level)
                                                  },
                                       community:interpretTemplate(defaultObjects.creatureTemplates[i].community),
                                       management:interpretTemplate(defaultObjects.creatureTemplates[i].management),
                                       charisma:interpretTemplate(defaultObjects.creatureTemplates[i].charisma)
                                      });

            if(!!result && !!cb)
                cb(result);

            return result;
        }
    }

    if(cb) cb(null);
    return null;
};

CreatureSchema.methods.setFunding = function(val) {
    if( !this.selffunding)
        this.funded = val;
};


var Creature = mongoose.model('Creature', CreatureSchema);
module.exports = Creature;
