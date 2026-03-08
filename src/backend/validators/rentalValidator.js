const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const rentalGetByIdValidator = [
    param("id").isInt({ min: 1 }).withMessage("A kölcsönzés azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const rentalPostValidator = [
    body("kolcsonzes_ideje").isISO8601().withMessage("A kölcsönzés idejének megadása kötelező (ÉÉÉÉ-HH-NN)!"),
    body("hatarido").isISO8601().withMessage("A határidő megadása kötelező (ÉÉÉÉ-HH-NN)!"),
    body("peldany_id").isInt({ min: 1 }).withMessage("A példány azonosítója pozitív egész szám kell legyen!"),
    body("olvaso_id").isInt({ min: 1 }).withMessage("Az olvasó azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const rentalPutValidator = [
    param("id").isInt({ min: 1 }).withMessage("A kölcsönzés azonosítója pozitív egész szám kell legyen!"),

    body("kolcsonzes_ideje").isISO8601().withMessage("A kölcsönzés idejének megadása kötelező (ÉÉÉÉ-HH-NN)!"),
    body("hatarido").isISO8601().withMessage("A határidő megadása kötelező (ÉÉÉÉ-HH-NN)!"),
    body("peldany_id").isInt({ min: 1 }).withMessage("A példány azonosítója pozitív egész szám kell legyen!"),
    body("olvaso_id").isInt({ min: 1 }).withMessage("Az olvasó azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const rentalDeleteValidator = [
    param("id").isInt({ min: 1 }).withMessage("A kölcsönzés azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    rentalGetByIdValidator,
    rentalPostValidator,
    rentalPutValidator,
    rentalDeleteValidator
}