const { body, param} = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const authorPostValidator = [
    body("nev").isString().trim().isEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
]

const authorPutValidator = [
    param("id").isInt({min: 1}).withMessage("A szerző azonosítója pozitív egész szám kell legyen!"),

    body("nev").isString().trim().isEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
]

const authorDeleteValidator = [
    param("id").isInt({min: 1}).withMessage("A szerző azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]



module.exports = {
    authorPostValidator,
    authorPutValidator,
    authorDeleteValidator
}