const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const PictureSchema= mongoose.Schema({
    img:{
        data:Buffer, 
        contentType:String
    }
})

module.exports = mongoose.model("Picture", PictureSchema);