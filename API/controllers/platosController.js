const Platos = require('../models/Platos');

exports.mostrarPlatos = async (req, res, next) => {
    try {
        const platos = await Platos.find({}).populate('id_tplato',{_id:0});
        res.json(platos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarPlato = async (req, res, next) => {
    const plato = await Platos.findById(req.params.idPlato).populate('id_tplato',{_id:0});

    if(!plato) {
        res.json({mensaje : 'Ese Plato no existe'});
        return next();
    }

    res.json(plato);
};


// agrega un nuevo plato
exports.nuevoPlato = async (req, res, next) => {
    const plato = new Platos(req.body);
    try {
        // almacenar el registro
        await plato.save();
        res.json({ mensaje : 'Se agrego un nuevo plato' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarPlato = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const plato = await Platos.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(plato);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarPlato = async (req, res, next) => {
    try {
        await Platos.findByIdAndDelete({ _id : req.params.idPlato });
        res.json({mensaje : 'El Plato se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
