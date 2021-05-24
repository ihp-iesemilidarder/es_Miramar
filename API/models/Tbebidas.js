const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tbebidasSchema = new Schema({
    NOMBRE:{type:String}

},
    { versionKey: false }
);

module.exports = mongoose.model('TBEBIDA', tbebidasSchema, 'TBEBIDA');