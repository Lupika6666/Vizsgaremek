const express = require('express')
const router = express.Router()
const szerzoController = require('../controllers/authorController')

router.get('/', szerzoController.getAllAuthor)
router.post('/', szerzoController.postAuthor)
router.put('/:id', szerzoController.putAuthor)
router.delete('/:id', szerzoController.deleteAuthor)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router