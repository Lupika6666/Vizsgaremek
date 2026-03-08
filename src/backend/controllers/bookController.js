const Book = require("../models/bookModel")

const bookController = {
    getAllBook: (req, res, next) => {
        Book.selectAllBook((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    getBookById: (req, res, next) => {
        Book.selectBookById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postBook: (req, res, next) => {
        const { cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body;
        Book.insertBook(cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "cim": cim,
                    "isbn": isbn,
                    "publikalas_ev": publikalas_ev,
                    "leiras": leiras,
                    "nyelv_id": nyelv_id,
                    "szerzo_id": szerzo_id,
                    "mufaj_id": mufaj_id
                }
            })
        })
    },

    putBook: (req, res, next) => {
        const { cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body;
        Book.updateBook(req.params.id, cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "cim": cim,
                    "publikalas_ev": publikalas_ev,
                    "leiras": leiras,
                    "nyelv_id": nyelv_id,
                    "szerzo_id": szerzo_id,
                    "mufaj_id": mufaj_id
                }
            })
        })
    },

    deleteBook: (req, res, next) => {
        Book.deleteBook(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = bookController

