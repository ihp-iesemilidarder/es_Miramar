const Tplatos = require('../models/Tplatos');

exports.mostrarTplatos = async (req, res, next) => {
    try {
        const tplatos = await Tplatos.find({});
        res.json(tplatos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarTplato = async (req, res, next) => {
    const tplato = await Tplatos.findById(req.params.idTplato);

    if(!tplato) {
        res.json({mensaje : 'Ese Tplato no existe'});
        return next();
    }

    res.json(tplato);
};


// agrega un nuevo tplato
exports.nuevoTplato = async (req, res, next) => {
    const tplato = new Tplatos(req.body);
    try {
        // almacenar el registro
        await tplato.save();
        res.json({ mensaje : 'Se agrego un nuevo tplato' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarTplato = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const tplato = await Tplatos.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(tplato);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarTplato = async (req, res, next) => {
    try {
        await Tplatos.findByIdAndDelete({ _id : req.params.idTplato });
        res.json({mensaje : 'El Tplato se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
