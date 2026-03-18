const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const { methodNotAllowed } = require('../utils/error')
const {bookPostValidator, bookPutValidator, bookDeleteValidator, bookGetByIdValidator} = require("../validators/bookValidator");

router.get('/', bookController.getAllBook)
router.get('/:id', bookGetByIdValidator, bookController.getBookById)
router.post('/', bookPostValidator, bookController.postBook)
router.put('/:id', bookPutValidator, bookController.putBook)
router.delete('/:id', bookDeleteValidator, bookController.deleteBook)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router