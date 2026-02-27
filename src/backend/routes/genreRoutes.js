const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', genreController.getAllGenre)
router.post('/', genreController.postGenre)
router.put('/:id', genreController.putGenre)
router.delete('/:id', genreController.deleteGenre)
router.all('/', methodNotAllowed)

module.exports = router