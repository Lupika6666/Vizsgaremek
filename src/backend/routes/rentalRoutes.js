const express = require('express')
const router = express.Router()
const Kolcsonzes = require("../models/rentalModel")
const rentalController = require('../controllers/rentalController')
const { methodNotAllowed } = require('../utils/error')

router.get('/', rentalController.getAllRental)
router.get('/:id', rentalController.getRentalById)
//TODO a konkrét olvasóhoz tartozó kölcsönzések lekérdezés
router.get('/:kartyaszam', rentalController.getRentalByReaderId)
router.post('/', rentalController.postRental)
router.put ('/:id', rentalController.putRental)
router.delete('/:id', rentalController.deleteRental)
router.all('/', methodNotAllowed)

module.exports = router