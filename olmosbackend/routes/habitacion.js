const express=require('express');
const router=express.Router();
const habitacionController=require('../controllers/habitacionCont');


router.post('/',habitacionController.crearHabitacion);
router.get('/',habitacionController.obtenerHabitaciones);


module.exports=router;