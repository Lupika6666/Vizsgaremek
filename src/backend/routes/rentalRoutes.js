const express = require('express')
const router = express.Router()
const Kolcsonzes = require("../models/rentalModel")
const rentalController = require('../controllers/rentalController')

router.get('/', rentalController.getAllRental)

router.get('/:id', rentalController.getRentalById)
//TODO a konkrét olvasóhoz tartozó kölcsönzések lekérdezés
router.get('/:kartyaszam', rentalController.getRentalByReaderId)

router.post('/', rentalController.postRental)

router.put ('/:id', rentalController.putRental)

router.delete('/:id', rentalController.deleteRental)

router.all('/', (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
});

module.exports = router