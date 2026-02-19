const express = require('express')
const router = express.Router()
const Kolcsonzes = require("../models/Kolcsonzes")

router.get('/', (req, res) => {
    Kolcsonzes.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.get('/:id', (req, res) => {
    Kolcsonzes.getById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.post('/', (req, res) => {
    const { kolcsonzes_ideje, hatarido, peldany_id, olvaso_id } = req.body
    Kolcsonzes.create(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put ('/:id', (req, res) => {
    const { kolcsonzes_ideje, hatarido, peldany_id, olvaso_id } = req.body
    Kolcsonzes.update(req.params.id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:id', (req, res) => {
    Kolcsonzes.delete(req.params.id, (err, result) => {
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