const Habitacion = require("../models/Habitacion");


exports.crearHabitacion= async (req,res)=>{
    try {
        let habitacion;
        habitacion= new Habitacion(req.body);
        await habitacion.save();
        res.send(habitacion)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}

exports.obtenerHabitaciones= async (req,res)=>{
    try {
       const habitacion= await Habitacion.find();
       res.json({message:"Las habitaciones se exportaron",habitacion:habitacion});
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    
}



