const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "valasz": "Validációs hiba!",
            "hibak": errors.array().map(err => (
                { "mezo": err.path, "uzenet": err.msg }
            ))
        })
    }
    next();
}

module.exports = {
    validateRequest
}