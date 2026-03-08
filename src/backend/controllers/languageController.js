const Language = require("../models/languageModel")

const languageController = {
    getAllLanguage: (req, res, next) => {
        Language.selectAllLanguage((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postLanguage: (req, res, next) => {
        const { nev } = req.body
        Language.insertLanguage(nev, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "nev": nev
                }
            })
        })
    },

    putLanguage: (req, res, next) => {
        const { nev } = req.body
        Language.updateLanguage(req.params.id, nev, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen nyelv!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "nev": nev
                }
            })
        })
    },

    deleteLanguage: (req, res, next) => {
        Language.deleteLanguage(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen nyelv!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = languageController

