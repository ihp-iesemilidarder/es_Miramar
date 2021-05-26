const Empxtpus = require('../models/Empxtpus');

exports.mostrarEmpxtpus = async (req, res, next) => {
    try {
        const empxtpus = await Empxtpus.find({}).populate('id_empleado').populate('id_tpuesto');
        res.json(empxtpus);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarEmpxtpu = async (req, res, next) => {
    const empxtpu = await Empxtpus.findById(req.params.idEmpxtpu).populate('id_empleado',{_id:0}).populate('id_tpuesto',{_id:0});

    if(!empxtpu) {
        res.json({mensaje : 'Ese Empxtpu no existe'});
        return next();
    }

    res.json(empxtpu);
};


// agrega un nuevo empxtpu
exports.nuevoEmpxtpu = async (req, res, next) => {
    const empxtpu = new Empxtpus(req.body);
    try {
        // almacenar el registro
        await empxtpu.save();
        res.json({ mensaje : 'Se agrego un nuevo empxtpu' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarEmpxtpu = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const empxtpu = await Empxtpus.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(empxtpu);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarEmpxtpu = async (req, res, next) => {
    try {
        await Empxtpus.findByIdAndDelete({ _id : req.params.idEmpxtpu });
        res.json({mensaje : 'El Empxtpu se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
