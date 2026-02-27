const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', languageController.getAllLanguage)
router.post('/', languageController.postLanguage)
router.put('/:id', languageController.putLanguage)
router.delete('/:id', languageController.deleteLanguage)
router.all('/', methodNotAllowed)

module.exports = router