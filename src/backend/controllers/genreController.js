const Genre = require("../models/genreModel");

const genreController = {
    getAllGenre: (req, res, next) => {
        Genre.selectAllGenre((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postGenre: (req, res, next) => {
        const { nev } = req.body;
        Genre.insertGenre(nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putGenre: (req, res, next) => {
        const { nev } = req.body;
        Genre.updateGenre(req.params.id, nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteGenre: (req, res, next) => {
        Genre.deleteGenre(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = genreController;

