const Rental = require("../models/rentalModel")

const rentalController = {
    /**
     * @swagger
     * tags:
     *   name: Kölcsönzések
     *   description: Kölcsönzések kezelése.
     */

    /**
     * @swagger
     * /api/kolcsonzesek:
     *   get:
     *     summary: Az összes kölcsönzés lekérése.
     *     description: Ez a végpont lehetővé teszi az összes kölcsönzés lekérdezését az adatbázisból.
     *     tags: ["Kölcsönzések"]
     *     responses:
     *       200:
     *         description: Sikeres lekérdezés!
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: "A kölcsönzés egyedi azonosítója"
     *                   kolcsonzes_ideje:
     *                     type: string
     *                     format: date
     *                     description: "A kölcsönzés ideje"
     *                   hatarido:
     *                     type: string
     *                     format: date
     *                     description: "A kölcsönzés határideje"
     *                   peldany_id:
     *                     type: integer
     *                     description: "A kölcsönzéshez tartozó példány azonosítója"
     *                   olvaso_id:
     *                     type: integer
     *                     description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllRental: (req, res, next) => {
        Rental.selectAllRental((err, result) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    /**
     * @swagger
     * /api/kolcsonzesek/{id}:
     *  get:
     *     summary: Egy kölcsönzés lekérése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy kölcsönzés lekérdezését az adatbázisból az ID alapján.
     *     tags: ["Kölcsönzések"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A kölcsönzés egyedi azonosítója"
     *     responses:
     *       200:
     *         description: Sikeres lekérdezés!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: "A kölcsönzés egyedi azonosítója"
     *                 kolcsonzes_ideje:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés ideje"
     *                 hatarido:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés határideje"
     *                 peldany_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó példány azonosítója"
     *                 olvaso_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    getRentalById: (req, res, next) => {
        Rental.selectRentalById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres lekérdezés!",
                "adatok": result
            })
        })
    },

    /**
     * @swagger
     * /api/kolcsonzesek:
     *   post:
     *     summary: Új kölcsönzés létrehozása.
     *     description: Ez a végpont lehetővé teszi egy új kölcsönzés létrehozását az adatbázisban.
     *     tags: ["Kölcsönzések"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               kolcsonzes_ideje:
     *                 type: string
     *                 format: date
     *                 description: "A kölcsönzés ideje"
     *               hatarido:
     *                 type: string
     *                 format: date
     *                 description: "A kölcsönzés határideje"
     *               peldany_id:
     *                 type: integer
     *                 description: "A kölcsönzéshez tartozó példány azonosítója"
     *               olvaso_id:
     *                 type: integer
     *                 description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *             required:
     *               - kolcsonzes_ideje
     *               - hatarido
     *               - peldany_id
     *               - olvaso_id
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: "A létrehozott kölcsönzés egyedi azonosítója"
     *                 kolcsonzes_ideje:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés ideje"
     *                 hatarido:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés határideje"
     *                 peldany_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó példány azonosítója"
     *                 olvaso_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *       400:
     *         description: Validációs hiba!
     *       500:
     *         description: Belső szerverhiba!
     */
    postRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.insertRental(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "kolcsonzes_ideje": kolcsonzes_ideje,
                    "hatarido": hatarido,
                    "peldany_id": peldany_id,
                    "olvaso_id": olvaso_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/kolcsonzesek/{id}:
     *   put:
     *     summary: Egy kölcsönzés módosítása ID alapján.
     *     description: Ez a végpont lehetővé teszi egy kölcsönzés módosítását az adatbázisban az ID alapján.
     *     tags: ["Kölcsönzések"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A kölcsönzés egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               kolcsonzes_ideje:
     *                 type: string
     *                 format: date
     *                 description: "A kölcsönzés ideje"
     *               hatarido:
     *                 type: string
     *                 format: date
     *                 description: "A kölcsönzés határideje"
     *               peldany_id:
     *                 type: integer
     *                 description: "A kölcsönzéshez tartozó példány azonosítója"
     *               olvaso_id:
     *                 type: integer
     *                 description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *             required:
     *               - kolcsonzes_ideje
     *               - hatarido
     *               - peldany_id
     *               - olvaso_id
     *     responses:
     *       200:
     *         description: Sikeres módosítás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: "A módosított kölcsönzés egyedi azonosítója"
     *                 kolcsonzes_ideje:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés ideje"
     *                 hatarido:
     *                   type: string
     *                   format: date
     *                   description: "A kölcsönzés határideje"
     *                 peldany_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó példány azonosítója"
     *                 olvaso_id:
     *                   type: integer
     *                   description: "A kölcsönzéshez tartozó olvasó azonosítója"
     *       400:
     *         description: Validációs hiba!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    putRental: (req, res, next) => {
        const {kolcsonzes_ideje, hatarido, peldany_id, olvaso_id} = req.body
        Rental.updateRental(req.params.id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "kolcsonzes_ideje": kolcsonzes_ideje,
                    "hatarido": hatarido,
                    "peldany_id": peldany_id,
                    "olvaso_id": olvaso_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/kolcsonzesek/{id}:
     *   delete:
     *     summary: Egy kölcsönzés törlése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy kölcsönzés törlését az adatbázisból az ID alapján.
     *     tags: ["Kölcsönzések"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A kölcsönzés egyedi azonosítója"
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    deleteRental: (req, res, next) => {
        Rental.deleteRental(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen kölcsönzés!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = rentalController