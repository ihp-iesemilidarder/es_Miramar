const Pedxplas = require('../models/Pedxplas');

exports.mostrarPedxplas = async (req, res, next) => {
    try {
        const pedxplas = await Pedxplas.find({}).populate('id_pedido',{_id:0}).populate('id_plato',{_id:0});
        res.json(pedxplas);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarPedxpla = async (req, res, next) => {
    const pedxpla = await Pedxplas.findById(req.params.idPedxpla).populate('id_pedido',{_id:0}).populate('id_plato',{_id:0});

    if(!pedxpla) {
        res.json({mensaje : 'Ese Pedxpla no existe'});
        return next();
    }

    // Mostrar el curso
    res.json(pedxpla);
};


// agrega un nuevo pedxpla
exports.nuevoPedxpla = async (req, res, next) => {
    const pedxpla = new Pedxplas(req.body);
    try {
        // almacenar el registro
        await pedxpla.save();
        res.json({ mensaje : 'Se agrego un nuevo pedxpla' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarPedxpla = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const pedxpla = await Pedxplas.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(pedxpla);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarPedxpla = async (req, res, next) => {
    try {
        await Pedxplas.findByIdAndDelete({ _id : req.params.idPedxpla });
        res.json({mensaje : 'El Pedxpla se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
