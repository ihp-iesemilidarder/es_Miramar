const Pedxbebs = require('../models/Pedxbebs');

exports.mostrarPedxbebs = async (req, res, next) => {
    try {
        const pedxbebs = await Pedxbebs.find({}).populate('id_pedido',{_id:0}).populate('id_bebida',{_id:0});
        res.json(pedxbebs);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarPedxbeb = async (req, res, next) => {
    const pedxbeb = await Pedxbebs.findById(req.params.idPedxbeb).populate('id_pedido',{_id:0}).populate('id_bebida',{_id:0});

    if(!pedxbeb) {
        res.json({mensaje : 'Ese Pedxbeb no existe'});
        return next();
    }

    res.json(pedxbeb);
};


// agrega un nuevo pedxbeb
exports.nuevoPedxbeb = async (req, res, next) => {
    const pedxbeb = new Pedxbebs(req.body);
    try {
        // almacenar el registro
        await pedxbeb.save();
        res.json({ mensaje : 'Se agrego un nuevo pedxbeb' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarPedxbeb = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const pedxbeb = await Pedxbebs.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(pedxbeb);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarPedxbeb = async (req, res, next) => {
    try {
        await Pedxbebs.findByIdAndDelete({ _id : req.params.idPedxbeb });
        res.json({mensaje : 'El Pedxbeb se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
