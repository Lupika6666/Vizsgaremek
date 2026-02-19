const express = require('express')
const router = express.Router()
const Olvaso = require("../models/Olvaso")

router.get('/', (req, res) => {
    Olvaso.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.getById('/:id', (req, res) => {
    Olvaso.getById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.post('/', (req, res) => {
    const { kartyaszam, nev, email, tel } = req.body
    Olvaso.create(kartyaszam, nev, email, tel, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put('/:id', (req, res) => {
    const { nev, email, tel } = req.body
    Olvaso.update(req.params.id, nev, email, tel, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:id', (req, res) => {
    Olvaso.delete(req.params.id, (err, result) => {
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