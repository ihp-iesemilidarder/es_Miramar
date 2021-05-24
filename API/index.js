// Framework servidor node
const express = require('express'); 
const bodyParser = require('body-parser');
const routes = require('./routes');
// Framework ODM (objet document model)
const mongoose = require('mongoose'); 
// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors = require('cors');


// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/miramar', {useNewUrlParser: true, useUnifiedTopology: true});


// crear el servidor
const app = express();

// habilitar bodyparser (de esta manera podemos leer "form-data" como "x-www-form-ulrencoded")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/', routes());

// puerto
app.listen(5000);