const User = require("../models/userModel");

const userController = {
    login: (req, res, next) => {
        const { nev, jelszo } = req.body;
        User.selectUserByNevANDJelszo(nev, jelszo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            req.session.user = {
                nev: result[0].nev,
                role: result[0].role,
                jelszo: result[0].jelszo,
                olvaso_id: result[0].olvaso_id
            };
            res.status(200).json({ message: 'Login successful', user: req.session.user });
        });
    },

    logout: (req, res, next) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    },

    getMe: (req, res, next) => {
        res.status(200).json({ user: req.session.user });
    },

    registerUser: (req, res, next) => {
        const { nev, jelszo, olvaso_id } = req.body;
        User.insertUser(nev, jelszo, olvaso_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    putUser: (req, res, next) => {
        const { ujnev, jelszo, olvaso_id } = req.body;
        User.updateUser(req.session.user.nev, ujnev, jelszo, olvaso_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    deleteUser: (req, res, next) => {
        User.deleteUser(req.session.user.user, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).json(result);
        });
    }
};

module.exports = userController;

