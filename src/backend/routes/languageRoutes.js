const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController')
const { methodNotAllowed } = require('../utils/error')
const {languagePostValidator, languagePutValidator, languageDeleteValidator} = require("../validators/languageValidator")

router.get('/', languageController.getAllLanguage)
router.post('/', languagePostValidator, languageController.postLanguage)
router.put('/:id', languagePutValidator, languageController.putLanguage)
router.delete('/:id', languageDeleteValidator, languageController.deleteLanguage)
router.all('/', methodNotAllowed)

module.exports = router