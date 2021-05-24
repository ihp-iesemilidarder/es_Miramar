const Horarios = require('../models/Horarios');

exports.mostrarHorarios = async (req, res, next) => {
    try {
        const horarios = await Horarios.find({}).populate('id_empleado',{_id:0});
        res.json(horarios);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarHorario = async (req, res, next) => {
    const horario = await Horarios.findById(req.params.idHorario).populate('id_empleado',{_id:0});

    if(!horario) {
        res.json({mensaje : 'Ese Horario no existe'});
        return next();
    }

    res.json(horario);
};


// agrega un nuevo horario
exports.nuevoHorario = async (req, res, next) => {
    const horario = new Horarios(req.body);
    try {
        // almacenar el registro
        await horario.save();
        res.json({ mensaje : 'Se agrego un nuevo horario' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarHorario = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const horario = await Horarios.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(horario);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarHorario = async (req, res, next) => {
    try {
        await Horarios.findByIdAndDelete({ _id : req.params.idHorario });
        res.json({mensaje : 'El Horario se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
