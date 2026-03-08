const BookCopy = require("../models/bookCopyModel")

const bookCopyController = {
    getAllBookCopy: (req, res, next) => {
        BookCopy.selectAllBookCopy((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    getBookCopyById: (req, res, next) => {
        BookCopy.selectBookCopyById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példámy!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body
        BookCopy.insertBookCopy(hely, konyv_id, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "hely": hely,
                    "konyv_id": konyv_id
                }
            })
        })
    },

    putBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body
        BookCopy.updateBookCopy(req.params.id, hely, konyv_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példány!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "hely": hely,
                    "konyv_id": konyv_id
                }
            })
        })
    },

    deleteBookCopy: (req, res, next) => {
        BookCopy.deleteBookCopy(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példány!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = bookCopyController

