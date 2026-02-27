const express = require('express')
const router = express.Router()
const readerController = require('../controllers/readerController')

router.get('/', readerController.getAllReader)
router.get('/:id', readerController.getReaderById)
router.post('/', readerController.postReader)
router.put('/:id', readerController.putReader)
router.delete('/:id', readerController.deleteReader)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router