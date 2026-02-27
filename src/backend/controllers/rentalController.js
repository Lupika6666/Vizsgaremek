const Rental = require("../models/rentalModel");

const rentalController = {

    getAllRental: (req, res, next) => {
        Rental.selectAllRental((err, result) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }
            res.status(200).json(result)
        })
    },

    getRentalById: (req, res, next) => {
        Rental.selectRentalById(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }
            res.status(200).json(result)
        })
    },

    getRentalByReaderId: (req, res, next) => {
        Rental.selectRentalByReaderId(req.params.kartyaszam, (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }
            res.status(200).json(result)
        })
    },

    postRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.insertRental(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.status(201).json(result);
        })
    },

    putRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.updateRental(req.params.id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.status(200).json(result)
        })
    },

    deleteRental: (req, res, next) => {
        Rental.deleteRental(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result)
        })
    }
}

module.exports = rentalController