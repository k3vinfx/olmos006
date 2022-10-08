

const express=require('express');
const router=express.Router();
const reservaController=require('../controllers/reservaCont');


router.post('/',reservaController.crearReserva);
router.put('/:id', reservaController.modificarReservas);
router.get('/',reservaController.obtenerReservas);
router.delete('/:id', reservaController.borrarReserva);
module.exports=router;