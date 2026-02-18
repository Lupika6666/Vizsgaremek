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
    
    // Adatok validálása
    const konyv = new Konyv({
        cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam
    })
    
    const validation = konyv.validate()
    if (!validation.isValid) {
        return res.status(400).json({ 
            error: 'Validációs hiba',
            errors: validation.errors 
        })
    }
    
    Konyv.create(cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Könyv sikeresen létrehozva',
            id: result.insertId 
        });
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
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Könyv nem található' })
        }
        res.status(200).json({ message: 'Könyv sikeresen törlve' })
    })
})

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router