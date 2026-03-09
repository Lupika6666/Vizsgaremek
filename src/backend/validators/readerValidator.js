const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const readerGetByIdValidator = [
    param("id").isInt({ min: 100000, max: 999999 }).withMessage("Az olvasó azonosítója pozitív 6 számjegyű egész szám kell legyen!"),

    validateRequest
]

const readerPostValidator = [
    body("kartyaszam").isInt({ min: 100000, max: 999999 }).withMessage("A kártyaszám (6 számjegyű egész szám) megadása kötelező!"),
    body("nev").isString().trim().notEmpty().withMessage("A név megadása kötelező!"),
    body("email").isEmail().withMessage("Az email cím megadása kötelező!"),
    body("tel").isMobilePhone("hu-HU").withMessage("A telefonszám megadása kötelező!"),

    validateRequest
]

const readerPutValidator = [
    param("id").isInt({ min: 100000, max: 999999 }).withMessage("Az olvasó azonosítója pozitív egész szám kell legyen!"),

    body("nev").isString().trim().notEmpty().withMessage("A név megadása kötelező!"),
    body("email").isEmail().withMessage("Az email cím megadása kötelező!"),
    body("tel").isMobilePhone("hu-HU").withMessage("A telefonszám megadása kötelező!"),

    validateRequest
]

const readerDeleteValidator = [
    param("id").isInt({ min: 100000, max: 999999 }).withMessage("Az olvasó azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    readerGetByIdValidator,
    readerPostValidator,
    readerPutValidator,
    readerDeleteValidator
}