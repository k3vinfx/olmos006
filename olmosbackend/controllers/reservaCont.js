const Reserva=require("../models/Reserva")
const Habitacion=require("../models/Habitacion")
const Picture=require("../models/Picture")
const fs = require("fs");
const { encode } = require("punycode");
const { contentType } = require("express/lib/response");
const nodemailer=require('nodemailer')
const Usuarios=require("../models/Usuario")
const hbs = require('nodemailer-express-handlebars')
const path = require('path');
const { resourceLimits } = require("worker_threads");

let mailTransporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_SERVER,
        pass:process.env.PASSWORD
    },
})

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};


exports.crearReserva= async (req,res)=>{
        let reserva;
        reserva= new Reserva(req.body);
        reserva.save().then(
            result=>{
                Habitacion.updateOne({_id:req.body.habitacion},{$set:{estado:'Tomada'}}).then(()=>{
                    Usuarios.findOne({_id:req.body.petitorio}).then(gotIt=>{
                        mailTransporter.use('compile', hbs(handlebarOptions))
                        let details={
                            from: process.env.EMAIL_SERVER,
                            to: gotIt.email,
                            subject: "Correo de confirmación de reserva",
                            template: 'email',
                            context:{
                                name: gotIt.nombre,
                                surname: gotIt.apellido,
                                telefono: 77774601
                            }
                        }
                        mailTransporter.sendMail(details,(err)=>{
                            if(err){
                                res.status(500).send({
                                    mensaje:"Hubo un error",
                                    reserva:null
                                })
                            } else {
                                res.json({
                                    mensaje:"Reserva exitosa",
                                    reserva:result
                                })
                            }
                        })
                    })
                }, err=>{
                    console.log(err)
                    res.status(500).json({
                        mensaje:"Hubo un error",
                        reserva:null
                    })
                })

                
                
            }
        ), err=>{
            console.log(err)
            res.status(500).send("Error")
        }
       
   
}

exports.obtenerReservas= async (req,res)=>{
    try {
       const reserva= await Reserva.find().populate('petitorio').populate('habitacion');
       res.json({
        message:"Mensaje exitoso",
        reserva:reserva});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Hubo un error",
            reserva:null});
    }
    
}

exports.modificarReservas=async(req,res)=>{

    const reservaMod={
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        paquete:req.body.paquete,
        invitados:req.body.invitados,
        petitorio:req.body.petitorio,
        voucher:req.body.voucher,
        habitacion: req.body.habitacion,
        servicio:req.body.servicio
    }
        Reserva.updateOne({_id:req.params.id},reservaMod).then(result=>{
            if(req.body.voucher){
                Habitacion.updateOne({_id:req.body.habitacion},{$set:{estado:'Reservada'}}).then(()=>{
                    res.status(200).json({
                        message:"Se modificó el registro",
                        reserva:result
                    })
                }, err=>{
                    console.log(err)
                    res.status(500).json({
                        message:"Hubo un error",
                        reserva:null
                    })
                })
            } 
        }), err=>{
            console.log(err)
            res.status(500).json({
                message:"Hubo un error",
                reserva:null
            })
        }

}


exports.borrarReserva=async(req,res)=>{
    Reserva.findOne({_id:req.params.id}).then(result=>{
        console.log(result.habitacion)
        Habitacion.findOneAndUpdate({_id:result.habitacion},{$set:{estado:'Disponible'}}).then(resulte=>{
            console.log(resulte)
        })
        Reserva.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Se borró la reserva!" });
        });
    })
    
}



