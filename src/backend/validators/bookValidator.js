const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const bookGetByIdValidator = [
    param("id").isInt({ min: 1 }).withMessage("A könyv azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookPostValidator = [
    body("cim").isString().trim().notEmpty().withMessage("A cím megadása kötelező!"),
    body("isbn").isISBN().withMessage("Az ISBN megadása kötelező (10/13 karakteres formátum adható)!"),
    body("nyelv_id").isInt({ min: 1 }).withMessage("A nyelv azonosítója pozitív egész szám kell legyen!"),
    body("szerzo_id").isInt({ min: 1 }).withMessage("A szerző azonosítója pozitív egész szám kell legyen!"),
    body("mufaj_id").isInt({ min: 1 }).withMessage("A műfaj azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookPutValidator = [
    param("id").isInt({ min: 1 }).withMessage("A könyv azonosítója pozitív egész szám kell legyen!"),

    body("cim").isString().trim().notEmpty().withMessage("A cím megadása kötelező!"),
    body("isbn").isISBN().withMessage("Az ISBN megadása kötelező!"),
    body("nyelv_id").isInt({ min: 1 }).withMessage("A nyelv azonosítója pozitív egész szám kell legyen!"),
    body("szerzo_id").isInt({ min: 1 }).withMessage("A szerző azonosítója pozitív egész szám kell legyen!"),
    body("mufaj_id").isInt({ min: 1 }).withMessage("A műfaj azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookDeleteValidator = [
    param("id").isInt({ min: 1 }).withMessage("A könyv azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    bookGetByIdValidator,
    bookPostValidator,
    bookPutValidator,
    bookDeleteValidator
}
