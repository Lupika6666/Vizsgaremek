const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')
const { methodNotAllowed } = require('../utils/error')
const {genrePostValidator, genrePutValidator, genreDeleteValidator} = require("../validators/genreValidator");

router.get('/', genreController.getAllGenre)
router.post('/', genrePostValidator, genreController.postGenre)
router.put('/:id', genrePutValidator, genreController.putGenre)
router.delete('/:id', genreDeleteValidator, genreController.deleteGenre)
router.all('/', methodNotAllowed)

module.exports = router