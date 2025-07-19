const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModels')

const getTareas = asyncHandler( async (req,res)=> {
   
   const tareas = await Tarea.find({})
    res.status(200).json(tareas)
})

const createTareas =asyncHandler( async(req,res)=> {

    if(!req.body.descripcion){
        res.status(400)
        throw new Error('Por favor teclee una descripcion')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion

    })

    res.status(201).json(tarea)

})

const updateTareas = asyncHandler(async(req,res)=> {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(404)
        throw new Error('No se encontro la tarea')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler(async(req,res)=> {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(404)
        throw new Error('No se encontro la tarea')
    }

    await Tarea.deleteOne(tarea)

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}

