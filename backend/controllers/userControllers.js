const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const registrar =asyncHandler( async(req, res)=>{
    // desestructurar el body

    const {nombre, email,password} = req.body

    // verificar que nos pasen todos los datos
    if(!nombre || !email || !password){
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

    const {email, password} = req.body

    //verificamos que el usuario exista

    const user = await User.findOne({email})

    // si el usuario existe vamos a verificar su password
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            nombre:user.nombre,
            email: user.email,
            token: generarToken(user.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }    
})

const misDatos = asyncHandler(async (req, res) =>{
    res.status(200).json(res.user)
})

//funcion para generar el token
const generarToken = (id_usuario) =>{
    return jwt.sign({id_usuario}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    registrar,
    login,
    misDatos
}