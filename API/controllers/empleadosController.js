const Empleados = require('../models/Empleados');

exports.mostrarEmpleados = async (req, res, next) => {
    try {
        const empleados = await Empleados.find({});
        res.json(empleados);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarEmpleado = async (req, res, next) => {
    const empleado = await Empleados.findById(req.params.idEmpleado);

    if(!empleado) {
        res.json({mensaje : 'Ese Empleado no existe'});
        return next();
    }

    // Mostrar el curso
    res.json(empleado);
};


// agrega un nuevo empleado
exports.nuevoEmpleado = async (req, res, next) => {
    const empleado = new Empleados(req.body);
    try {
        // almacenar el registro
        await empleado.save();
        res.json({ mensaje : 'Se agrego un nuevo empleado' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarEmpleado = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const empleado = await Empleados.findOneAndUpdate(
            { _id : req.body.id }, 
            req.body, 
            {new : true}
        );
        res.json(empleado);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarEmpleado = async (req, res, next) => {
    try {
        await Empleados.findByIdAndDelete({ _id : req.params.idEmpleado });
        res.json({mensaje : 'El Empleado se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
