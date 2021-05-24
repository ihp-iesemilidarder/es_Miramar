const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tpuestosSchema = new Schema({
    NOMBRE:{
        type:String
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('TPUESTO', tpuestosSchema, 'TPUESTO');