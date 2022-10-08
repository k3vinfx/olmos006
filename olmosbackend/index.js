const express=require('express')
const conectarDB=require('./config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var multer = require('multer');
const cors=require("cors");
const bodyParser = require("body-parser");



const app= express();


conectarDB();
app.use(cors())


app.use(express.json())
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/reserva', require('./routes/reserva'));
app.use('/api/invitado', require('./routes/invitado'));
app.use('/api/habitacion', require('./routes/habitacion'));
app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
app.use(multer({dest:'./uploads/'}).single('image'));

const PORT= process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is runnin on port ',PORT)
})