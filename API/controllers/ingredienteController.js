const Ingredientes = require('../models/Ingrediente.js');

exports.mostrarIngredientes = async (req, res, next) => {
    try {
        const ingredientes = await Ingredientes.find({});
        res.json(ingredientes);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarIngrediente = async (req, res, next) => {
    const ingrediente = await Ingredientes.findById(req.params.idIngrediente);

    if(!ingrediente) {
        res.json({mensaje : 'Ese Ingrediente no existe'});
        return next();
    }

    res.json(ingrediente);
};


// agrega un nuevo ingrediente
exports.nuevoIngrediente = async (req, res, next) => {
    const ingrediente = new Ingredientes(req.body);
    try {
        // almacenar el registro
        await ingrediente.save();
        res.json({ mensaje : 'Se agrego un nuevo ingrediente' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarIngrediente = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const ingrediente = await Ingredientes.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(ingrediente);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarIngrediente = async (req, res, next) => {
    try {
        await Ingredientes.findByIdAndDelete({ _id : req.params.idIngrediente });
        res.json({mensaje : 'El Ingrediente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
