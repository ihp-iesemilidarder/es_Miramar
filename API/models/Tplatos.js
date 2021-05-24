const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tplatosSchema = new Schema({
    NOMBRE:{type:String}
},
    { versionKey: false }
);

module.exports = mongoose.model('TPLATO', tplatosSchema, 'TPLATO');