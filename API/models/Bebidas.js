const mongoose = require('mongoose');
const Tbebidas = require('./Tbebidas');
const Schema = mongoose.Schema;

const bebidasSchema = new Schema({
    NOMBRE:{type:String},
    PRECIO:{type:Number},
    DESCRIPCION:{type:String},
    id_tbebida:{
        type:Schema.ObjectId,
        ref:Tbebidas
    }

},
    { versionKey: false }
);

module.exports = mongoose.model('BEBIDA', bebidasSchema,'BEBIDA');