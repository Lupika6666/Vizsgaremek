const express = require('express')
const router = express.Router()
const readerController = require('../controllers/readerController')
const { methodNotAllowed } = require('../utils/error')
const {readerGetByIdValidator, readerPostValidator, readerPutValidator, readerDeleteValidator} = require("../validators/readerValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', readerController.getAllReader)
router.get('/:id', readerGetByIdValidator, readerController.getReaderById)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), readerPostValidator, readerController.postReader)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), readerPutValidator, readerController.putReader)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), readerDeleteValidator, readerController.deleteReader)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router