const Szerzo = require("../models/authorModel")

const authorController = {
    getAllAuthor: (req, res, next) => {
        Szerzo.selectAllAuthor((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postAuthor: (req, res, next) => {
        const { nev } = req.body
        Szerzo.insertAuthor(nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        "valasz": "A szerző már korábban hozzá lett adva!" })
                }
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

    putAuthor: (req, res, next) => {
        const { nev } = req.body;
        Szerzo.updateAuthor(req.params.id, nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        "valasz": "Ilyen nevű szerző már hozzá lett adva!" });
                }
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen szerző!"
                });
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

    deleteAuthor: (req, res, next) => {
        Szerzo.deleteAuthor(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen szerző!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = authorController

