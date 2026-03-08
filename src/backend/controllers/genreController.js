const Genre = require("../models/genreModel")

const genreController = {
    getAllGenre: (req, res, next) => {
        Genre.selectAllGenre((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    postGenre: (req, res, next) => {
        const { nev } = req.body
        Genre.insertGenre(nev, (err, result) => {
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

    putGenre: (req, res, next) => {
        const { nev } = req.body
        Genre.updateGenre(req.params.id, nev, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen műfaj!"
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

    deleteGenre: (req, res, next) => {
        Genre.deleteGenre(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen műfaj!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = genreController

