const express = require('express')
const router = express.Router()
const rentalController = require('../controllers/rentalController')
const { methodNotAllowed } = require('../utils/error')
const {rentalGetByIdValidator, rentalPostValidator, rentalPutValidator, rentalDeleteValidator} = require("../validators/rentalValidator");

router.get('/', rentalController.getAllRental)
router.get('/:id', rentalGetByIdValidator, rentalController.getRentalById)
router.post('/', rentalPostValidator, rentalController.postRental)
router.put ('/:id', rentalPutValidator, rentalController.putRental)
router.delete('/:id', rentalDeleteValidator, rentalController.deleteRental)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router