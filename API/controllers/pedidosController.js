const Pedidos = require('../models/Pedidos');

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('id_mesa',{_id:0});
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('id_mesa',{_id:0});

    if(!pedido) {
        res.json({mensaje : 'Ese Pedido no existe'});
        return next();
    }

    res.json(pedido);
};


// agrega un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        // almacenar el registro
        await pedido.save();
        res.json({ mensaje : 'Se agrego un nuevo pedido' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarPedido = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const pedido = await Pedidos.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(pedido);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({ _id : req.params.idPedido });
        res.json({mensaje : 'El Pedido se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
