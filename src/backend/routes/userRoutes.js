const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { methodNotAllowed } = require('../utils/error')
const { userRegisterValidator } = require('../validators/userValidator')

router.post('/regisztracio', userRegisterValidator, userController.registerUser)
router.post('/bejelentkezes', userController.loginUser)

//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all('/regisztacio', methodNotAllowed)
router.all('/bejelentkezes', methodNotAllowed)

module.exports = router