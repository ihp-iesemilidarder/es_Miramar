const express = require('express');
const router = express.Router();

const empleadosController = require('../controllers/empleadosController');
const tpuestosController = require('../controllers/tpuestosController');
const horariosController = require('../controllers/horariosController');
const empxtpusController = require('../controllers/empxtpusController');
const pedidosController = require('../controllers/pedidosController');
const mesasController = require('../controllers/mesasController.js');
const tbebidasController = require('../controllers/tbebidasController');
const ingredienteController = require('../controllers/ingredienteController');
const tplatosController = require('../controllers/tplatosController');
const platosController = require('../controllers/platosController');
const bebidasController = require('../controllers/bebidasController.js');
const pedxbebsController = require('../controllers/pedxbebsController');
const ingredientesController = require('../controllers/ingredientesController.js');
const pedxplasController = require('../controllers/pedxplasController.js');

module.exports = function() {
     
    /*EMPLEADO*/
    router.get('/miramar/empleados/',empleadosController.mostrarEmpleados);
    router.get('/miramar/empleados/:idEmpleado',  empleadosController.mostrarEmpleado);
    router.post('/miramar/empleados/', empleadosController.nuevoEmpleado);    
    router.put('/miramar/empleados/', empleadosController.actualizarEmpleado);
    router.delete('/miramar/empleados/:idEmpleado', empleadosController.eliminarEmpleado);

    /*TPUESTO*/
    router.get('/miramar/tpuestos/',tpuestosController.mostrarTpuestos);
    router.get('/miramar/tpuestos/:idTpuesto',  tpuestosController.mostrarTpuesto);
    router.post('/miramar/tpuestos/', tpuestosController.nuevoTpuesto);    
    router.put('/miramar/tpuestos/', tpuestosController.actualizarTpuesto);
    router.delete('/miramar/tpuestos/:idTpuesto', tpuestosController.eliminarTpuesto);

    /*HORARIO*/
    router.get('/miramar/horarios/',horariosController.mostrarHorarios);
    router.get('/miramar/horarios/:idHorario',  horariosController.mostrarHorario);
    router.post('/miramar/horarios/', horariosController.nuevoHorario);    
    router.put('/miramar/horarios/', horariosController.actualizarHorario);
    router.delete('/miramar/horarios/:idHorario', horariosController.eliminarHorario);

    /*EMPXTPU*/
    router.get('/miramar/empxtpus/',empxtpusController.mostrarEmpxtpus);
    router.get('/miramar/empxtpus/:idEmpxtpu',  empxtpusController.mostrarEmpxtpu);
    router.post('/miramar/empxtpus/', empxtpusController.nuevoEmpxtpu);    
    router.put('/miramar/empxtpus/', empxtpusController.actualizarEmpxtpu);
    router.delete('/miramar/empxtpus/:idEmpxtpu', empxtpusController.eliminarEmpxtpu);

    /*PEDIDO*/
    router.get('/miramar/pedidos/',pedidosController.mostrarPedidos);
    router.get('/miramar/pedidos/:idPedido',pedidosController.mostrarPedido);
    router.post('/miramar/pedidos/', pedidosController.nuevoPedido);    
    router.put('/miramar/pedidos/', pedidosController.actualizarPedido);
    router.delete('/miramar/pedidos/:idPedido', pedidosController.eliminarPedido);

    /*MESA*/
    router.get('/miramar/mesas/',mesasController.mostrarMesas);
    router.get('/miramar/mesas/:idMesa',mesasController.mostrarMesa);
    router.post('/miramar/mesas/',mesasController.nuevoMesa);    
    router.put('/miramar/mesas/', mesasController.actualizarMesa);
    router.delete('/miramar/mesas/:idMesa', mesasController.eliminarMesa);

    /*TBEBIDA*/
    router.get('/miramar/tbebidas/',tbebidasController.mostrarTbebidas);
    router.get('/miramar/tbebidas/:idTbebida',tbebidasController.mostrarTbebida);
    router.post('/miramar/tbebidas/',tbebidasController.nuevoTbebida);    
    router.put('/miramar/tbebidas/', tbebidasController.actualizarTbebida);
    router.delete('/miramar/tbebidas/:idTbebida', tbebidasController.eliminarTbebida);

    /*INGREDIENTE*/
    router.get('/miramar/ingrediente/',ingredienteController.mostrarIngredientes);
    router.get('/miramar/ingrediente/:idIngrediente',ingredienteController.mostrarIngrediente);
    router.post('/miramar/ingrediente/',ingredienteController.nuevoIngrediente);    
    router.put('/miramar/ingrediente/', ingredienteController.actualizarIngrediente);
    router.delete('/miramar/ingrediente/:idIngrediente', ingredienteController.eliminarIngrediente);

    /*TPLATO*/
    router.get('/miramar/tplatos/',tplatosController.mostrarTplatos);
    router.get('/miramar/tplatos/:idTplato',tplatosController.mostrarTplato);
    router.post('/miramar/tplatos/',tplatosController.nuevoTplato);    
    router.put('/miramar/tplatos/', tplatosController.actualizarTplato);
    router.delete('/miramar/tplatos/:idTplato', tplatosController.eliminarTplato);

    /*PLATOS*/
    router.get('/miramar/platos/',platosController.mostrarPlatos);
    router.get('/miramar/platos/:idPlato',platosController.mostrarPlato);
    router.post('/miramar/platos/',platosController.nuevoPlato);    
    router.put('/miramar/platos/', platosController.actualizarPlato);
    router.delete('/miramar/platos/:idPlato', platosController.eliminarPlato);

    /*BEBIDA*/
    router.get('/miramar/bebidas/',bebidasController.mostrarBebidas);
    router.get('/miramar/bebidas/:idBebida',bebidasController.mostrarBebida);
    router.post('/miramar/bebidas/',bebidasController.nuevoBebida);    
    router.put('/miramar/bebidas/', bebidasController.actualizarBebida);
    router.delete('/miramar/bebidas/:idBebida', bebidasController.eliminarBebida);

    /*PEDXBEB*/
    router.get('/miramar/pedxbebs/',pedxbebsController.mostrarPedxbebs);
    router.get('/miramar/pedxbebs/:idPedxbeb',pedxbebsController.mostrarPedxbeb);
    router.post('/miramar/pedxbebs/',pedxbebsController.nuevoPedxbeb);    
    router.put('/miramar/pedxbebs/', pedxbebsController.actualizarPedxbeb);
    router.delete('/miramar/pedxbebs/:idPedxbeb', pedxbebsController.eliminarPedxbeb);

    /*INGREDIENTES*/
    router.get('/miramar/ingredientes/',ingredientesController.mostrarIngredientes);
    router.get('/miramar/ingredientes/:idIngrediente',ingredientesController.mostrarIngrediente);
    router.post('/miramar/ingredientes/',ingredientesController.nuevoIngrediente);    
    router.put('/miramar/ingredientes/', ingredientesController.actualizarIngrediente);
    router.delete('/miramar/ingredientes/:idIngrediente', ingredientesController.eliminarIngrediente);

    /*PEDXPLA*/
    router.get('/miramar/pedxplas/',pedxplasController.mostrarPedxplas);
    router.get('/miramar/pedxplas/:idPedxpla',pedxplasController.mostrarPedxpla);
    router.post('/miramar/pedxplas/',pedxplasController.nuevoPedxpla);    
    router.put('/miramar/pedxplas/', pedxplasController.actualizarPedxpla);
    router.delete('/miramar/pedxplas/:idPedxpla', pedxplasController.eliminarPedxpla);


    return router;
};
