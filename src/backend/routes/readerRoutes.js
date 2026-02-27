const express = require('express')
const router = express.Router()
const readerController = require('../controllers/readerController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', readerController.getAllReader)
router.get('/:id', readerController.getReaderById)
router.post('/', readerController.postReader)
router.put('/:id', readerController.putReader)
router.delete('/:id', readerController.deleteReader)
router.all('/', methodNotAllowed)

module.exports = router