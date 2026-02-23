const express = require('express')
const router = express.Router()
const Peldany = require("../models/Peldany")
//TODO Valószínű szükségetelen (törlésre kerül majd)
router.get('/', (req, res) => {
    Peldany.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})
//TODO Valószínű szükségetelen (törlésre kerül majd)
router.get('/:id', (req, res) => {
    Peldany.getById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})
//TODO a konkrét könyvhöz tartozó példányok lekérdezése
router.get('/:konyv_id', (req, res) => {
    Peldany.getByKonyvId(req.params.konyv_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.post('/', (req, res) => {
    const { hely, konyv_id } = req.body
    Peldany.create(hely, konyv_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put('/:id', (req, res) => {
    const { hely, konyv_id } = req.body
    Peldany.update(req.params.id, hely, konyv_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:id', (req, res) => {
    Peldany.delete(req.params.id, (err, result) => {
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