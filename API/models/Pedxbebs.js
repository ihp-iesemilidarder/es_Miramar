const mongoose = require('mongoose');
const Bebidas = require('./Bebidas');
const Pedidos = require('./Pedidos');
const Schema = mongoose.Schema;

const pedxbebsSchema = new Schema({
    id_pedido:{
        type: String,
        ref: Pedidos
    },
    id_bebida:{
        type:String,
        ref:Bebidas
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('PEDXBEB', pedxbebsSchema, 'PEDXBEB');