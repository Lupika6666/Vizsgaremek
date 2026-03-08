const Rental = require("../models/rentalModel")

const rentalController = {

    getAllRental: (req, res, next) => {
        Rental.selectAllRental((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    getRentalById: (req, res, next) => {
        Rental.selectRentalById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.insertRental(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "kolcsonzes_ideje": kolcsonzes_ideje,
                    "hatarido": hatarido,
                    "peldany_id": peldany_id,
                    "olvaso_id": olvaso_id
                }
            })
        })
    },

    putRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.updateRental(req.params.id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "kolcsonzes_ideje": kolcsonzes_ideje,
                    "hatarido": hatarido,
                    "peldany_id": peldany_id,
                    "olvaso_id": olvaso_id
                }
            })
        })
    },

    deleteRental: (req, res, next) => {
        Rental.deleteRental(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = rentalController