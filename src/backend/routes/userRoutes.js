const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { methodNotAllowed } = require('../utils/error')

//TODO Session-based authentication middleware ideiglenes!!!
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ error: 'Not authenticated' })
    }
}

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/me', requireAuth, userController.getMe)
router.post('/register', userController.registerUser)
router.put('/update', requireAuth, userController.putUser)
router.delete('/delete', requireAuth, userController.deleteUser)
router.all('/', methodNotAllowed)

module.exports = router