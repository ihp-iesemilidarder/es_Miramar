const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredienteSchema = new Schema({
    NOMBRE:{type:String}
},
    { versionKey: false }
);

module.exports = mongoose.model('INGREDIENTE', ingredienteSchema, 'INGREDIENTE');