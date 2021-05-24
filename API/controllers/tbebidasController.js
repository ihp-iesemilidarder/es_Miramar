const Tbebidas = require('../models/Tbebidas');

exports.mostrarTbebidas = async (req, res, next) => {
    try {
        const tbebidas = await Tbebidas.find({});
        res.json(tbebidas);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarTbebida = async (req, res, next) => {
    const tbebida = await Tbebidas.findById(req.params.idTbebida);

    if(!tbebida) {
        res.json({mensaje : 'Ese Tbebida no existe'});
        return next();
    }

    res.json(tbebida);
};


// agrega un nuevo tbebida
exports.nuevoTbebida = async (req, res, next) => {
    const tbebida = new Tbebidas(req.body);
    try {
        // almacenar el registro
        await tbebida.save();
        res.json({ mensaje : 'Se agrego un nuevo tbebida' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarTbebida = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const tbebida = await Tbebidas.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(tbebida);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarTbebida = async (req, res, next) => {
    try {
        await Tbebidas.findByIdAndDelete({ _id : req.params.idTbebida });
        res.json({mensaje : 'El Tbebida se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
