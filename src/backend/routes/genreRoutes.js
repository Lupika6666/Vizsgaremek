const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')
const { methodNotAllowed } = require('../utils/error')
const {genrePostValidator, genrePutValidator, genreDeleteValidator} = require("../validators/genreValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', genreController.getAllGenre)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), genrePostValidator, genreController.postGenre)
router.put('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), genrePutValidator, genreController.putGenre)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), genreDeleteValidator, genreController.deleteGenre)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router