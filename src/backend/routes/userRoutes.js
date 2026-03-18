const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { methodNotAllowed } = require('../utils/error')
const { userRegisterValidator, userLoginValidator } = require('../validators/userValidator')

router.post('/regisztracio', userRegisterValidator, userController.registerUser)
router.post('/bejelentkezes', userLoginValidator, userController.loginUser)
router.post("/token-frissites", userController.refreshToken)
router.post("/kijelentkezes", userController.logoutUser)
router.all('/regisztracio', methodNotAllowed)
router.all('/bejelentkezes', methodNotAllowed)
router.all('/token-frissites', methodNotAllowed)
router.all('/kijelentkezes', methodNotAllowed)

module.exports = router