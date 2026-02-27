const express = require('express')
const router = express.Router()
const bookCopyController = require('../controllers/bookCopyController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', bookCopyController.getAllBookCopy)
router.get('/:id', bookCopyController.getBookCopyById)
router.get('/konyv/:konyv_id', bookCopyController.getBookCopyByBookId)
router.post('/', bookCopyController.postBookCopy)
router.put('/:id', bookCopyController.putBookCopy)
router.delete('/:id', bookCopyController.deleteBookCopy)
router.all('/', methodNotAllowed)

module.exports = router