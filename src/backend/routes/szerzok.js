const express = require('express')
const router = express.Router()
const Szerzo = require("../models/Szerzo")

router.get('/', (req, res) => {
    Szerzo.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.post('/', (req, res) => {
    const { nev } = req.body
    Szerzo.create(nev, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put('/:id', (req, res) => {
    const { nev } = req.body
    Szerzo.update(req.params.id, nev, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:id', (req, res) => {
    Szerzo.delete(req.params.id, (err, result) => {
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