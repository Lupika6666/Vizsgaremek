const Book = require("../models/bookModel");

const bookController = {
    getAllBook: (req, res, next) => {
        Book.selectAllBook((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    getBookById: (req, res, next) => {
        Book.selectBookById(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postBook: (req, res, next) => {
        const { cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body;
        Book.insertBook(cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putBook: (req, res, next) => {
        const { cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body;
        Book.updateBook(req.params.id, cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteBook: (req, res, next) => {
        Book.deleteBook(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = bookController;

