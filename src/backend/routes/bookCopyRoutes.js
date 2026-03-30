const express = require('express')
const router = express.Router()
const bookCopyController = require('../controllers/bookCopyController')
const { methodNotAllowed } = require('../utils/error')
const {bookCopyGetByIdValidator, bookCopyPostValidator, bookCopyPutValidator, bookCopyDeleteValidator} = require("../validators/bookCopyValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', bookCopyController.getAllBookCopy)
router.get('/:id', bookCopyGetByIdValidator, bookCopyController.getBookCopyById)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookCopyPostValidator, bookCopyController.postBookCopy)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookCopyPutValidator, bookCopyController.putBookCopy)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookCopyDeleteValidator, bookCopyController.deleteBookCopy)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router