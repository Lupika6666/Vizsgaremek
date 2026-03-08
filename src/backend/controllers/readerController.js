const Reader = require("../models/readerModel")

const readerController = {
    getAllReader: (req, res, next) => {
        Reader.selectAllReader((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    getReaderById: (req, res, next) => {
        Reader.selectReaderById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postReader: (req, res, next) => {
        const { kartyaszam, nev, email, tel } = req.body
        Reader.insertReader(kartyaszam, nev, email, tel, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A kártyaszám foglalt!" });
                }
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "kartyaszam": kartyaszam,
                    "nev": nev,
                    "email": email,
                    "tel": tel
                }
            })
        })
    },

    putReader: (req, res, next) => {
        const { nev, email, tel } = req.body
        Reader.updateReader(req.params.id, nev, email, tel, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "kartyaszam": req.params.id,
                    "nev": nev,
                    "email": email,
                    "tel": tel
                }
            })
        })
    },

    deleteReader: (req, res, next) => {
        Reader.deleteReader(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = readerController

