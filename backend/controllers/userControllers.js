const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const asyncHandler = requiere('express-async-handler')
const User = require('../models/userModel')

const registrar =asyncHandler( async(req, res)=>{
    // desestructurar el body

    const {nombre, email,password} = req.body

    // verificar que nos pasen todos los datos
    if(!nombre || !email || password){
        res.status(400)
        throw new Error('Faltan datos')

    }
// Hacemos el HASH del password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

// Creamos el usuario
const user = await User.create({
    nombre,
    email,
    password:hashedPassword
})
    if(user){
        res.status(201).json({
            _id:user.id,
            nombre:user.nombre,
            email:user.email,
        })}
    else{
        res.status(400)
        throw new Error('No se pudo crear el usuario')
    }
    
})

const login = asyncHandler( async(req, res) =>{

})

const misDatos = asyncHandler(async (req, resp) =>{

})

module.exports = {
    registrar,
    login,
    misDatos
}