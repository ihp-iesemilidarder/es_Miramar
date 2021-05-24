const Mesas = require('../models/Mesas');

exports.mostrarMesas = async (req, res, next) => {
    try {
        const mesas = await Mesas.find({});
        res.json(mesas);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarMesa = async (req, res, next) => {
    const mesa = await Mesas.findById(req.params.idMesa);

    if(!mesa) {
        res.json({mensaje : 'Ese Mesa no existe'});
        return next();
    }

    res.json(mesa);
};


// agrega un nuevo mesa
exports.nuevoMesa = async (req, res, next) => {
    const mesa = new Mesas(req.body);
    try {
        // almacenar el registro
        await mesa.save();
        res.json({ mensaje : 'Se agrego un nuevo mesa' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarMesa = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const mesa = await Mesas.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(mesa);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarMesa = async (req, res, next) => {
    try {
        await Mesas.findByIdAndDelete({ _id : req.params.idMesa });
        res.json({mensaje : 'El Mesa se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
