const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const HabitacionSchema= mongoose.Schema({
    nombre:{ type: String, required: true },
    precio:{type:Number, required:true},
    categoria:{ type: String, required: true },
    piso:{ type: Number, required: true },
    bloque: {type: String, required: true },
    capacidad: { type: Number, required: true },
   imagenes: [{ type: String}],
   estado:{type: String,default:'Disponible'}
})



module.exports = mongoose.model("Habitacion", HabitacionSchema);