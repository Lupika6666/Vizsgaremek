const Szerzo = require("../models/authorModel");

const authorController = {
    getAllAuthor: (req, res, next) => {
        Szerzo.selectAllAuthor((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postAuthor: (req, res, next) => {
        const { nev } = req.body;
        Szerzo.insertAuthor(nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putAuthor: (req, res, next) => {
        const { nev } = req.body;
        Szerzo.updateAuthor(req.params.id, nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteAuthor: (req, res, next) => {
        Szerzo.deleteAuthor(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = authorController;

