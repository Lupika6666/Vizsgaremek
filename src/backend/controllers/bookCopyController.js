const BookCopy = require("../models/bookCopyModel");

const bookCopyController = {
    getAllBookCopy: (req, res, next) => {
        BookCopy.selectAllBookCopy((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    getBookCopyById: (req, res, next) => {
        BookCopy.selectBookCopyById(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    getBookCopyByBookId: (req, res, next) => {
        BookCopy.selectBookCopyByBookId(req.params.konyv_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body;
        BookCopy.insertBookCopy(hely, konyv_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body;
        BookCopy.updateBookCopy(req.params.id, hely, konyv_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteBookCopy: (req, res, next) => {
        BookCopy.deleteBookCopy(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = bookCopyController;

