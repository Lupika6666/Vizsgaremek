const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const languagePostValidator = [
    body("nev").isString().trim().notEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
]

const languagePutValidator = [
    param("id").isInt({ min: 1 }).withMessage("A nyelv azonosítója pozitív egész szám kell legyen!"),

    body("nev").isString().trim().notEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
]

const languageDeleteValidator = [
    param("id").isInt({ min: 1 }).withMessage("A nyelv azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    languagePostValidator,
    languagePutValidator,
    languageDeleteValidator
}