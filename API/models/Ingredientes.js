const mongoose = require('mongoose');
const Bebidas = require('./Bebidas');
const Ingrediente = require('./Ingrediente');
const Platos = require('./Platos');
const Schema = mongoose.Schema;

const ingredientesSchema = new Schema({
    id_ingrediente:{
        type:Schema.ObjectId,
        ref:Ingrediente
    },
    id_bebida:{
        type:Schema.ObjectId,
        ref:Bebidas
    },
    id_plato:{
        type:Schema.ObjectId,
        ref:Platos
    },
    CANTIDAD: {type:Number}
},
    { versionKey: false }
);

module.exports = mongoose.model('INGREDIENTES', ingredientesSchema,'INGREDIENTES');