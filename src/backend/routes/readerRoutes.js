const express = require('express')
const router = express.Router()
const readerController = require('../controllers/readerController')
const { methodNotAllowed } = require('../utils/error')
const {readerGetByIdValidator, readerPostValidator, readerPutValidator, readerDeleteValidator} = require("../validators/readerValidator");

router.get('/', readerController.getAllReader)
router.get('/:id', readerGetByIdValidator, readerController.getReaderById)
router.post('/', readerPostValidator, readerController.postReader)
router.put('/:id', readerPutValidator, readerController.putReader)
router.delete('/:id', readerDeleteValidator, readerController.deleteReader)
router.all('/', methodNotAllowed)

module.exports = router