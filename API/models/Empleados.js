const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({
    NOMBRE: {
        type: String
    },
    APELLIDOS: {
        type: Array
    },
    NACIMIENTO: {
        type: Date
    },
    GENERO: {
        type: String
    },
    CONTRASENA: {
        type: String
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('EMPLEADO', empleadosSchema, 'EMPLEADO');