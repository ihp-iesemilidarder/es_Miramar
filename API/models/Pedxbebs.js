const mongoose = require('mongoose');
const Bebidas = require('./Bebidas');
const Pedidos = require('./Pedidos');
const Schema = mongoose.Schema;

const pedxbebsSchema = new Schema({
    _id:{
        type: Schema.ObjectId,
        ref: Pedidos
    },
    id_bebida:{
        type:Schema.ObjectId,
        ref:Bebidas
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('PEDXBEB', pedxbebsSchema, 'PEDXBEB');