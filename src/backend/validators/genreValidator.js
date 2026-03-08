const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const genrePostValidator = [
    body("nev").isString().trim().notEmpty().withMessage("A műfaj megnevezése kötelező!"),

    validateRequest
]

const genrePutValidator = [
    param("id").isInt({ min: 1 }).withMessage("A műfaj azonosítója pozitív egész szám kell legyen!"),

    body("nev").isString().trim().notEmpty().withMessage("A műfaj megnevezése kötelező!"),

    validateRequest
]

const genreDeleteValidator = [
    param("id").isInt({ min: 1 }).withMessage("A műfaj azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    genrePostValidator,
    genrePutValidator,
    genreDeleteValidator
}