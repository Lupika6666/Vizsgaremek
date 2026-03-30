const express = require('express')
const router = express.Router()
const rentalController = require('../controllers/rentalController')
const { methodNotAllowed } = require('../utils/error')
const {rentalGetByIdValidator, rentalPostValidator, rentalPutValidator, rentalDeleteValidator} = require("../validators/rentalValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', rentalController.getAllRental)
router.get('/:id', rentalGetByIdValidator, rentalController.getRentalById)
router.post('/', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), rentalPostValidator, rentalController.postRental)
router.put ('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), rentalPutValidator, rentalController.putRental)
router.delete('/:id', authMiddleware.varifyToken, authMiddleware.requireRole(["admin"]), rentalDeleteValidator, rentalController.deleteRental)
router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

module.exports = router