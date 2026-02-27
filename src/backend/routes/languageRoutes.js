const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController')

router.get('/', languageController.getAllLanguage)
router.post('/', languageController.postLanguage)
router.put('/:id', languageController.putLanguage)
router.delete('/:id', languageController.deleteLanguage)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router