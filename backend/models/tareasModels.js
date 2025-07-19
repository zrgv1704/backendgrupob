const mongoose = require ('mongoose')

const tareaSchema = mongoose.Schema({
    descripcion: {
        type: String,
        requiered: [true, 'Por favor teclea una descripcion']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)