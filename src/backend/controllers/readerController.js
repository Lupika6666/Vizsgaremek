const Reader = require("../models/readerModel");

const readerController = {
    getAllReader: (req, res, next) => {
        Reader.selectAllReader((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    getReaderById: (req, res, next) => {
        Reader.selectReaderById(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postReader: (req, res, next) => {
        const { kartyaszam, nev, email, tel } = req.body;
        Reader.insertReader(kartyaszam, nev, email, tel, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putReader: (req, res, next) => {
        const { nev, email, tel } = req.body;
        Reader.updateReader(req.params.id, nev, email, tel, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteReader: (req, res, next) => {
        Reader.deleteReader(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = readerController;

