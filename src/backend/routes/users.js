const express = require('express')
const router = express.Router()
const User = require("../models/User")

// Session-based authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ error: 'Not authenticated' })
    }
}

router.post('/login', (req, res) => {
    const { nev, jelszo } = req.body
    User.login(nev, jelszo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        // Store user info in session
        req.session.user = {
            nev: result[0].nev,
            role: result[0].role,
            jelszo: result[0].jelszo,
            olvaso_id: result[0].olvaso_id
        }
        res.status(200).json({ message: 'Login successful', user: req.session.user })
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' })
        }
        res.status(200).json({ message: 'Logout successful' })
    })
})

// Example protected route
router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ user: req.session.user })
})

router.post('/register', (req, res) => {
    const { nev, jelszo, olvaso_id } = req.body
    User.register(nev, jelszo, olvaso_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put('/update', requireAuth, (req, res) => {
    const { ujnev, jelszo, olvaso_id } = req.body
    User.update(req.session.user.nev, ujnev, jelszo, olvaso_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/delete', requireAuth, (req, res) => {
    User.delete(req.session.user.user, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).json(result)
    })
})

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router