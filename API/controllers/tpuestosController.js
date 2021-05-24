const Tpuestos = require('../models/Tpuestos');

exports.mostrarTpuestos = async (req, res, next) => {
    try {
        const tpuestos = await Tpuestos.find({});
        res.json(tpuestos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarTpuesto = async (req, res, next) => {
    const tpuesto = await Tpuestos.findById(req.params.idTpuesto);

    if(!tpuesto) {
        res.json({mensaje : 'Ese Tpuesto no existe'});
        return next();
    }

    // Mostrar el curso
    res.json(tpuesto);
};


// agrega un nuevo tpuesto
exports.nuevoTpuesto = async (req, res, next) => {
    const tpuesto = new Tpuestos(req.body);
    try {
        // almacenar el registro
        await tpuesto.save();
        res.json({ mensaje : 'Se agrego un nuevo tpuesto' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarTpuesto = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const tpuesto = await Tpuestos.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(tpuesto);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarTpuesto = async (req, res, next) => {
    try {
        await Tpuestos.findByIdAndDelete({ _id : req.params.idTpuesto });
        res.json({mensaje : 'El Tpuesto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
