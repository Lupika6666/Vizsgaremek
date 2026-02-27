const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', bookController.getAllBook)
router.get('/:id', bookController.getBookById)
router.post('/', bookController.postBook)
router.put('/:id', bookController.putBook)
router.delete('/:id', bookController.deleteBook)
router.all('/', methodNotAllowed)

module.exports = router