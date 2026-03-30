const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const { methodNotAllowed } = require('../utils/error')
const {bookPostValidator, bookPutValidator, bookDeleteValidator, bookGetByIdValidator} = require("../validators/bookValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', bookController.getAllBook)
router.get('/:id', bookGetByIdValidator, bookController.getBookById)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookPostValidator, bookController.postBook)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookPutValidator, bookController.putBook)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), bookDeleteValidator, bookController.deleteBook)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router