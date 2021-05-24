const Bebidas = require('../models/Bebidas.js');

exports.mostrarBebidas = async (req, res, next) => {
    try {
        const bebidas = await Bebidas.find({}).populate('id_tbebida',{
            _id:0
        });
        res.json(bebidas);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarBebida = async (req, res, next) => {
    const bebida = await Bebidas.findById(req.params.idBebida).populate("id_tbebida",{
        _id:0
    });

    if(!bebida) {
        res.json({mensaje : 'Ese Bebida no existe'});
        return next();
    }

    res.json(bebida);
};


// agrega un nuevo bebida
exports.nuevoBebida = async (req, res, next) => {
    const bebida = new Bebidas(req.body);
    try {
        // almacenar el registro
        await bebida.save();
        res.json({ mensaje : 'Se agrego un nuevo bebida' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarBebida = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const bebida = await Bebidas.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(bebida);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarBebida = async (req, res, next) => {
    try {
        await Bebidas.findByIdAndDelete({ _id : req.params.idBebida });
        res.json({mensaje : 'El Bebida se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
