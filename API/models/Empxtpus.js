const mongoose = require('mongoose');
const Empleados = require('./Empleados');
const Tpuestos = require('./Tpuestos');
const Schema = mongoose.Schema;

const empxtpusSchema = new Schema({
    id_empleado:{
        type:String,
        ref:Empleados
    },
    id_tpuesto:{
        type:String,
        ref:Tpuestos
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('EMPXTPU', empxtpusSchema, 'EMPXTPU');