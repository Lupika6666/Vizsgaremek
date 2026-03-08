const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { methodNotAllowed } = require('../utils/error')



module.exports = router