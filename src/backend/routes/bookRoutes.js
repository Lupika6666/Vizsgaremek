const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.get('/', bookController.getAllBook)
router.get('/:id', bookController.getBookById)
router.post('/', bookController.postBook)
router.put('/:id', bookController.putBook)
router.delete('/:id', bookController.deleteBook)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router