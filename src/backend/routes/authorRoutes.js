const express = require('express')
const router = express.Router()
const szerzoController = require('../controllers/authorController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', szerzoController.getAllAuthor)
router.post('/', szerzoController.postAuthor)
router.put('/:id', szerzoController.putAuthor)
router.delete('/:id', szerzoController.deleteAuthor)
router.all('/', methodNotAllowed )

module.exports = router