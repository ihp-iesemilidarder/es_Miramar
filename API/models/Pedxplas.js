const mongoose = require('mongoose');
const Pedidos = require('./Pedidos');
const Platos = require('./Platos');
const Schema = mongoose.Schema;

const pedxplasSchema = new Schema({
    _id:{
        type:Schema.ObjectId,
        ref:Pedidos
    },
    id_plato:{
        type:Schema.ObjectId,
        ref:Platos
    },
},
    { versionKey: false }
);

module.exports = mongoose.model('PEDXPLAT', pedxplasSchema, 'PEDXPLAT');