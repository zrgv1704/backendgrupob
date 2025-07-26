const express = require('express')
const router = express.Router()
const {misDatos, login,registrar} = require ('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')


router.get('/datos', protect,misDatos)

router.post('/login', login)

router.post('/', registrar)




module.exports = router