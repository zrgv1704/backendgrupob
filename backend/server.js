const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')

const port = process.env.PORT || 8000

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))