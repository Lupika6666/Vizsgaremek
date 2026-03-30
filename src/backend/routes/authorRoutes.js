const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const { methodNotAllowed } = require('../utils/error')
const {authorPostValidator, authorPutValidator, authorDeleteValidator} = require("../validators/authorValidator");
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authorController.getAllAuthor)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), authorPostValidator, authorController.postAuthor)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(['admin']), authorPutValidator, authorController.putAuthor)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(['admin']), authorDeleteValidator, authorController.deleteAuthor)
router.all('/', methodNotAllowed )
router.all('/:id', methodNotAllowed )

module.exports = router