const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { methodNotAllowed } = require('../utils/error')
const { userRegisterValidator, userLoginValidator } = require('../validators/userValidator')

router.post('/regisztracio', userRegisterValidator, userController.registerUser)
router.post('/bejelentkezes', userLoginValidator, userController.loginUser)
router.post("/token-frissites", userController.refreshToken)

//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all('/regisztracio', methodNotAllowed)
router.all('/bejelentkezes', methodNotAllowed)

module.exports = router