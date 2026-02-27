const express = require('express')
const router = express.Router()
const bookCopyController = require('../controllers/bookCopyController')

router.get('/', bookCopyController.getAllBookCopy)
router.get('/:id', bookCopyController.getBookCopyById)
router.get('/konyv/:konyv_id', bookCopyController.getBookCopyByBookId)
router.post('/', bookCopyController.postBookCopy)
router.put('/:id', bookCopyController.putBookCopy)
router.delete('/:id', bookCopyController.deleteBookCopy)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router