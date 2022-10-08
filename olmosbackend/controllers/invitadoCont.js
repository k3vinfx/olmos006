const Invitados = require("../models/Invitados");


exports.crearInvitado= async (req,res)=>{
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

exports.obtenerInvitados= async (req,res)=>{
    try {
       const habitacion= await Habitacion.find();
       console.log(habitacion)
       res.json({message:"Las habitaciones se exportaron",habitacion:habitacion});
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    
}

exports.deleteInvitados=async(req,res)=>{
    try {
        
    } catch(error){

    }
}

