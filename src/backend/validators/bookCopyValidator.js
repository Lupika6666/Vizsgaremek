const { body, param } = require("express-validator")
const { validateRequest } = require("../utils/validationHelper")

const bookCopyGetByIdValidator = [
    param("id").isInt({ min: 1 }).withMessage("A példány azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookCopyPostValidator = [
    body("hely").isString().trim().notEmpty().withMessage("A hely megadása kötelező!"),
    body("konyv_id").isInt({ min: 1 }).withMessage("A könyv azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookCopyPutValidator = [
    param("id").isInt({ min: 1 }).withMessage("A példány azonosítója pozitív egész szám kell legyen!"),

    body("hely").isString().trim().notEmpty().withMessage("A hely megadása kötelező!"),
    body("konyv_id").isInt({ min: 1 }).withMessage("A könyv azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

const bookCopyDeleteValidator = [
    param("id").isInt({ min: 1 }).withMessage("A példány azonosítója pozitív egész szám kell legyen!"),

    validateRequest
]

module.exports = {
    bookCopyGetByIdValidator,
    bookCopyPostValidator,
    bookCopyPutValidator,
    bookCopyDeleteValidator
}