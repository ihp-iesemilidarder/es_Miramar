const mongoose = require('mongoose');
const Empleados = require('./Empleados');
const Schema = mongoose.Schema;

const horariosSchema = new Schema({
    DESDE:{
        type: Number
    },
    HASTA:{
        type: Number
    },
    id_empleado:[{
        type:Schema.ObjectId,
        ref: Empleados
    }]
},
    { versionKey: false }
);

module.exports = mongoose.model('HORARIO', horariosSchema, 'HORARIO');