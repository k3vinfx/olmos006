const Usuarios=require("../models/Usuario")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.crearUsuario= async (req,res)=>{
    const check= await Usuarios.find({email:req.body.email});
    console.log(check)
    if(check.length>0){
        res.json({
            message: "Email ya utilizado",
            result:null
        });
    } else {
        bcrypt.hash(req.body.password,10).then(hash=>{
            const user= new Usuario({
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                ci:req.body.ci,
                email: req.body.email,
                password: hash,
                access:req.body.access,
                edad:req.body.edad
            });
        user.save().then(
            result=>{
                res.status(201).json({
                    message: "Se creó el usuario",
                    result:result
                });
            }).catch(err=>{
                console.log(err)
                res.json({
                    message: "Hubo un error",
                    result:null
                });
            })
        
        })
    }

    
}



exports.obtenerUsuario= async (req,res)=>{
    try {
       const usuarios= await Usuarios.find();
       res.json({
        message:"users fetched succesfully",
        users:usuarios
       }
       );
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}



exports.editarUsuario=async(req,res)=>{

    const usuarioEd={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        ci:req.body.ci,
        email: req.body.email,
        password: req.body.password,
        access: req.body.access
    }
    try{
        const usuario= await Usuarios.updateOne({email:req.params.email},usuarioEd,{
            new:true
        }).then(result=>{
            res.status(200).json({message:"Actualización realizada", usuario:result})
        });
    } catch(e){
        console.log(error)
        res.status(500).send("Error")
    }
}


exports.eliminarUsuario=async (req,res)=>{
 try {
    Usuarios.deleteOne({ email: req.params.email }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Usuario fuera!" });
      });
 } catch (error) {
    console.log(error)
    res.status(500).send("Error")
 }   
}


exports.logUsuario= async (req,res)=>{
    try {
       let usuarioFetched;
       Usuarios.findOne({email:req.body.email})
       .then(usuario=>{
           if(!usuario){
               return res.status(200).json({
                   message: "Fallo de Autenticación 1"
               });
           }
           usuarioFetched=usuario;
           console.log(bcrypt.compare(req.body.password, usuario.password))
           return bcrypt.compare(req.body.password, usuario.password)
       })
       .then(result=>{
           if (!result){
               return res.status(200).json({
                    message: "Fallo de Autenticación 2"
               })
           }
           const token= jwt.sign(
               {email: usuarioFetched.email, userId: usuarioFetched._id},
               "secret_this_should_be_longer",
               {expiresIn: "1h"}
           );
           res.status(200).json({
               usuarioSuccess:usuarioFetched,
               token: token,
               usuarioId:usuarioFetched._id,
               expiresIn: 3600,
               message:"Bienvenido"
           });
       })
       .catch(err=>{
           
       });
       
    } catch (error) {
        console.log(error)
        res.status(200).send("Error")
    }
}

