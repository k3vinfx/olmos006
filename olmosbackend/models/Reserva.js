const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const ReservaSchema= mongoose.Schema({
    
    checkIn:{ type: Date, required: true },
    checkOut:{type:Date, required:true},
    paquete:{ type: String, required: true },
    invitados:[{
        nombreapellido :{ type: String },
        ci : { type: String },
        edad: { type: Number },
        }],
    petitorio:{type:mongoose.Schema.Types.ObjectId, ref:'Usuarios'},
    voucher:{type:String},
    habitacion: {type:mongoose.Schema.Types.ObjectId, ref:'Habitacion'},
    servicio:{type: Boolean, default: false, required:true}
})



module.exports = mongoose.model("Reserva", ReservaSchema);