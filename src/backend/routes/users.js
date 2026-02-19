const express = require('express')
const router = express.Router()
const User = require("../models/User")

router.post('/login', (req, res) => {
    const { nev, jelszo } = req.body
    User.login(nev, jelszo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        res.status(200).json(result[0])
    })
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

router.get('/:nev', (req, res) => {
    User.getByNev(req.params.nev, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(result[0])
    })
})

router.put('/:nev', (req, res) => {
    const { ujnev, jelszo, olvaso_id }                                                                                               = req.body
    User.update(req.params.nev, ujnev, jelszo, olvaso_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:nev', (req, res) => {
    User.delete(req.params.nev, (err, result) => {
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