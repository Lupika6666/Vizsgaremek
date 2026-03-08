const express = require('express')
const router = express.Router()
const szerzoController = require('../controllers/authorController')
const { methodNotAllowed } = require('../utils/error')
const {authorPostValidator, authorPutValidator, authorDeleteValidator} = require("../validators/authorValidator");

router.get('/', szerzoController.getAllAuthor)
router.post('/', authorPostValidator, szerzoController.postAuthor)
router.put('/:id', authorPutValidator, szerzoController.putAuthor)
router.delete('/:id', authorDeleteValidator, szerzoController.deleteAuthor)
router.all('/', methodNotAllowed )

module.exports = router