const mongoose = require('mongoose');
const Pedidos = require('./Pedidos');
const Platos = require('./Platos');
const Schema = mongoose.Schema;

const pedxplasSchema = new Schema({
    id_pedido:{
        type:String,
        ref:Pedidos
    },
    id_plato:{
        type:String,
        ref:Platos
    },
},
    { versionKey: false }
);

module.exports = mongoose.model('PEDXPLAT', pedxplasSchema, 'PEDXPLAT');