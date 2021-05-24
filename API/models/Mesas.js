const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mesasSchema = new Schema({
    NUMERO:{
        type:Number
    },
    PERSONAS:{
        type:Number
    },
    OCUPADO:{
        type:Boolean
    }
},
    { versionKey: false }
);

module.exports = mongoose.model('MESA', mesasSchema, 'MESA');