const express = require('express')
const router = express.Router()
const Konyv = require("../models/Konyv")

router.get('/', (req, res) => {
    Konyv.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.get('/:id', (req, res) => {
    Konyv.getById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(result)
    })
})

router.post('/', (req, res) => {
    const { cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam } = req.body
    //Ide írt valami validációt Tamás?
    Konyv.create(cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    })
})

router.put('/:id', (req, res) => {
    const { cim, szerzo, publikalas_ev, leiras, kiado, nyelv, oldalszam } = req.body
    Konyv.update(req.params.id, cim, szerzo, publikalas_ev, leiras, kiado, nyelv, oldalszam, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/:id', (req, res) => {
    Konyv.delete(req.params.id, (err, result) => {
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