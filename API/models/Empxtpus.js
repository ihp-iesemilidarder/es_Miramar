const mongoose = require('mongoose');
const Empleados = require('./Empleados');
const Tpuestos = require('./Tpuestos');
const Schema = mongoose.Schema;

const empxtpusSchema = new Schema({
    _id:{
        type:Schema.ObjectId,
        ref:Empleados
    },
    id_tpuesto:{
        type:Schema.ObjectId,
        ref:Tpuestos
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('EMPXTPU', empxtpusSchema, 'EMPXTPU');