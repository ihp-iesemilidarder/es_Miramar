const mongoose = require('mongoose');
const Tplatos = require('./Tplatos');
const Schema = mongoose.Schema;

const platosSchema = new Schema({
    NOMBRE:{ type:String },
    DESCRIPCION:{ type:String },
    PRECIO:{ type:Number },
    COMENSALES:{ type:Number },
    id_tplato:{
        type:Schema.ObjectId,
        ref:Tplatos
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('PLATOS', platosSchema, 'PLATOS');