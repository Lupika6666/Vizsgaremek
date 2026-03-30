const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController')
const { methodNotAllowed } = require('../utils/error')
const {languagePostValidator, languagePutValidator, languageDeleteValidator} = require("../validators/languageValidator")
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', languageController.getAllLanguage)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), languagePostValidator, languageController.postLanguage)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), languagePutValidator, languageController.putLanguage)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), languageDeleteValidator, languageController.deleteLanguage)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router