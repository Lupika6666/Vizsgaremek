const Language = require("../models/languageModel");

const languageController = {
    getAllLanguage: (req, res, next) => {
        Language.selectAllLanguage((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    postLanguage: (req, res, next) => {
        const { nev } = req.body;
        Language.insertLanguage(nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putLanguage: (req, res, next) => {
        const { nev } = req.body;
        Language.updateLanguage(req.params.id, nev, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteLanguage: (req, res, next) => {
        Language.deleteLanguage(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = languageController;

