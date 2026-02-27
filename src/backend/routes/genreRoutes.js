const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')

router.get('/', genreController.getAllGenre)
router.post('/', genreController.postGenre)
router.put('/:id', genreController.putGenre)
router.delete('/:id', genreController.deleteGenre)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router