const Book = require("../models/bookModel")

const bookController = {
    /**
     * @swagger
     * tags:
     *   name: Könyvek
     *   description: Könyvek kezelése.
     */

    /**
     * @swagger
     * /api/konyvek:
     *   get:
     *     summary: Az összes könyv lekérése.
     *     description: Ez a végpont lehetővé teszi az összes könyv lekérdezését az adatbázisból.
     *     tags: ["Könyvek"]
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
     *                     description: "A könyv egyedi azonosítója"
     *                   cim:
     *                     type: string
     *                     description: "A könyv címe"
     *                   isbn:
     *                     type: integer
     *                     description: "A könyv ISBN száma"
     *                   publikalas_ev:
     *                     type: integer
     *                     description: "A könyv publikálásának éve"
     *                   leiras:
     *                     type: string
     *                     description: "A könyv leírása"
     *                   nyelv_id:
     *                     type: integer
     *                     description: "A könyv nyelvének azonosítója"
     *                   szerzo_id:
     *                     type: integer
     *                     description: "A könyv szerzőjének azonosítója"
     *                   mufaj_id:
     *                     type: integer
     *                     description: "A könyv műfajának azonosítója"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllBook: (req, res, next) => {
        Book.selectAllBook((err, result) => {
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
     * /api/konyvek/{id}:
     *   get:
     *     summary: Egy könyv lekérése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy adott könyv lekérdezését az adatbázisból az ID alapján.
     *     tags: ["Könyvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: A könyv egyedi azonosítója.
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
     *                   description: "A könyv egyedi azonosítója"
     *                 cim:
     *                   type: string
     *                   description: "A könyv címe"
     *                 isbn:
     *                   type: integer
     *                   description: "A könyv ISBN száma"
     *                 publikalas_ev:
     *                   type: integer
     *                   description: "A könyv publikálásának éve"
     *                 leiras:
     *                   type: string
     *                   description: "A könyv leírása"
     *                 nyelv_id:
     *                   type: integer
     *                   description: "A könyv nyelvének azonosítója"
     *                 szerzo_id:
     *                   type: integer
     *                   description: "A könyv szerzőjének azonosítója"
     *                 mufaj_id:
     *                   type: integer
     *                   description: "A könyv műfajának azonosítója"
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    getBookById: (req, res, next) => {
        Book.selectBookById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
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
     * /api/konyvek:
     *   post:
     *     summary: Új könyv létrehozása.
     *     description: Ez a végpont lehetővé teszi egy új könyv létrehozását az adatbázisban.
     *     tags: ["Könyvek"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               cim:
     *                 type: string
     *                 description: "A könyv címe"
     *               isbn:
     *                 type: integer
     *                 description: "A könyv ISBN száma"
     *               publikalas_ev:
     *                 type: integer
     *                 description: "A könyv publikálásának éve"
     *               leiras:
     *                 type: string
     *                 description: "A könyv leírása"
     *               nyelv_id:
     *                 type: integer
     *                 description: "A könyv nyelvének azonosítója"
     *               szerzo_id:
     *                 type: integer
     *                 description: "A könyv szerzőjének azonosítója"
     *               mufaj_id:
     *                 type: integer
     *                 description: "A könyv műfajának azonosítója"
     *             required:
     *               - cim
     *               - isbn
     *               - nyelv_id
     *               - szerzo_id
     *               - mufaj_id
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
     *                   description: "A létrehozott könyv egyedi azonosítója"
     *                 cim:
     *                   type: string
     *                   description: "A könyv címe"
     *                 isbn:
     *                   type: integer
     *                   description: "A könyv ISBN száma"
     *                 publikalas_ev:
     *                   type: integer
     *                   description: "A könyv publikálásának éve"
     *                 leiras:
     *                   type: string
     *                   description: "A könyv leírása"
     *                 nyelv_id:
     *                   type: integer
     *                   description: "A könyv nyelvének azonosítója"
     *                 szerzo_id:
     *                   type: integer
     *                   description: "A könyv szerzőjének azonosítója"
     *                 mufaj_id:
     *                   type: integer
     *                   description: "A könyv műfajának azonosítója"
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: Belső szerverhiba!
     */
    postBook: (req, res, next) => {
        const { cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body
        Book.insertBook(cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "Az ISBN azonosító foglalt!" });
                }
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "cim": cim,
                    "isbn": isbn,
                    "publikalas_ev": publikalas_ev,
                    "leiras": leiras,
                    "nyelv_id": nyelv_id,
                    "szerzo_id": szerzo_id,
                    "mufaj_id": mufaj_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/konyvek/{id}:
     *   put:
     *     summary: Egy könyv módosítása ID alapján.
     *     description: Ez a végpont lehetővé teszi egy adott könyv módosítását az adatbázisban az ID alapján.
     *     tags: ["Könyvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: A könyv egyedi azonosítója.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               cim:
     *                 type: string
     *                 description: "A könyv címe"
     *               publikalas_ev:
     *                 type: integer
     *                 description: "A könyv publikálásának éve"
     *               leiras:
     *                 type: string
     *                 description: "A könyv leírása"
     *               nyelv_id:
     *                 type: integer
     *                 description: "A könyv nyelvének azonosítója"
     *               szerzo_id:
     *                 type: integer
     *                 description: "A könyv szerzőjének azonosítója"
     *               mufaj_id:
     *                 type: integer
     *                 description: "A könyv műfajának azonosítója"
     *             required:
     *               - cim
     *               - nyelv_id
     *               - szerzo_id
     *               - mufaj_id
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
     *                   description: "A módosított könyv egyedi azonosítója"
     *                 cim:
     *                   type: string
     *                   description: "A könyv címe"
     *                 isbn:
     *                   type: integer
     *                   description: "A könyv ISBN száma"
     *                 publikalas_ev:
     *                   type: integer
     *                   description: "A könyv publikálásának éve"
     *                 leiras:
     *                   type: string
     *                   description: "A könyv leírása"
     *                 nyelv_id:
     *                   type: integer
     *                   description: "A könyv nyelvének azonosítója"
     *                 szerzo_id:
     *                   type: integer
     *                   description: "A könyv szerzőjének azonosítója"
     *                 mufaj_id:
     *                   type: integer
     *                   description: "A könyv műfajának azonosítója"
     *       400:
     *         description: "Validációs hiba!"
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    putBook: (req, res, next) => {
        const { cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id } = req.body
        Book.updateBook(req.params.id, cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "cim": cim,
                    "publikalas_ev": publikalas_ev,
                    "leiras": leiras,
                    "nyelv_id": nyelv_id,
                    "szerzo_id": szerzo_id,
                    "mufaj_id": mufaj_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/konyvek/{id}:
     *   delete:
     *     summary: Egy könyv törlése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy adott könyv törlését az adatbázisból az ID alapján.
     *     tags: ["Könyvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: A könyv egyedi azonosítója.
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    deleteBook: (req, res, next) => {
        Book.deleteBook(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen könyv!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = bookController

