const mongoose = require('mongoose');
const Mesas = require('./Mesas');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    id_mesa:{
        type:Schema.ObjectId,
        ref:Mesas
    },
    CHECK:{
        type:Boolean
    },
    NUMERO:{
        type:Number
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('PEDIDO', pedidosSchema, 'PEDIDO');