const express = require('express')
const router = express.Router()
const bookCopyController = require('../controllers/bookCopyController')
const { methodNotAllowed } = require('../utils/error')
const {bookCopyGetByIdValidator, bookCopyPostValidator, bookCopyPutValidator, bookCopyDeleteValidator} = require("../validators/bookCopyValidator");

router.get('/', bookCopyController.getAllBookCopy)
router.get('/:id', bookCopyGetByIdValidator, bookCopyController.getBookCopyById)
router.post('/', bookCopyPostValidator, bookCopyController.postBookCopy)
router.put('/:id', bookCopyPutValidator, bookCopyController.putBookCopy)
router.delete('/:id', bookCopyDeleteValidator, bookCopyController.deleteBookCopy)
router.all('/', methodNotAllowed)

module.exports = router