const BookCopy = require("../models/bookCopyModel")

const bookCopyController = {
    /**
     * @swagger
     * tags:
     *   name: Példányok
     *   description: Példányok kezelése.
     */

    /**
     * @swagger
     * /api/peldanyok:
     *   get:
     *     summary: Az összes példány lekérése.
     *     description: Ez a végpont lehetővé teszi az összes példány lekérdezését az adatbázisból.
     *     tags: ["Példányok"]
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
     *                     description: "A példány egyedi azonosítója"
     *                   hely:
     *                     type: string
     *                     description: "A példány helye"
     *                   konyv_id:
     *                     type: integer
     *                     description: "A példányhoz tartozó könyv azonosítója"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllBookCopy: (req, res, next) => {
        BookCopy.selectAllBookCopy((err, result) => {
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
     * /api/peldanyok/{id}:
     *  get:
     *     summary: Egy példány lekérése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy példány lekérdezését az adatbázisból az ID alapján.
     *     tags: ["Példányok"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A példány egyedi azonosítója"
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
     *                   description: "A példány egyedi azonosítója"
     *                 hely:
     *                   type: string
     *                   description: "A példány helye"
     *                 konyv_id:
     *                   type: integer
     *                   description: "A példányhoz tartozó könyv azonosítója"
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    getBookCopyById: (req, res, next) => {
        BookCopy.selectBookCopyById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példámy!"
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
     * /api/peldanyok:
     *   post:
     *     summary: Új példány létrehozása.
     *     description: Ez a végpont lehetővé teszi egy új példány létrehozását az adatbázisban.
     *     tags: ["Példányok"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               hely:
     *                 type: string
     *                 description: "A példány helye"
     *               konyv_id:
     *                 type: integer
     *                 description: "A példányhoz tartozó könyv azonosítója"
     *             required:
     *               - hely
     *               - konyv_id
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
     *                   description: "A létrehozott példány egyedi azonosítója"
     *                 hely:
     *                   type: string
     *                   description: "A példány helye"
     *                 konyv_id:
     *                   type: integer
     *                   description: "A példányhoz tartozó könyv azonosítója"
     *       400:
     *         description: Validációs hiba!
     *       500:
     *         description: Belső szerverhiba!
     */
    postBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body
        BookCopy.insertBookCopy(hely, konyv_id, (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "hely": hely,
                    "konyv_id": konyv_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/peldanyok/{id}:
     *   put:
     *     summary: Egy példány módosítása ID alapján.
     *     description: Ez a végpont lehetővé teszi egy példány módosítását az adatbázisban az ID alapján.
     *     tags: ["Példányok"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A példány egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               hely:
     *                 type: string
     *                 description: "A példány helye"
     *               konyv_id:
     *                 type: integer
     *                 description: "A példányhoz tartozó könyv azonosítója"
     *             required:
     *               - hely
     *               - konyv_id
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
     *                   description: "A módosított példány egyedi azonosítója"
     *                 hely:
     *                   type: string
     *                   description: "A példány helye"
     *                 konyv_id:
     *                   type: integer
     *                   description: "A példányhoz tartozó könyv azonosítója"
     *       400:
     *         description: Validációs hiba!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    putBookCopy: (req, res, next) => {
        const { hely, konyv_id } = req.body
        BookCopy.updateBookCopy(req.params.id, hely, konyv_id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példány!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "hely": hely,
                    "konyv_id": konyv_id
                }
            })
        })
    },


    /**
     * @swagger
     * /api/peldanyok/{id}:
     *   delete:
     *     summary: Egy példány törlése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy példány törlését az adatbázisból az ID alapján.
     *     tags: ["Példányok"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "A példány egyedi azonosítója"
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    deleteBookCopy: (req, res, next) => {
        BookCopy.deleteBookCopy(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen példány!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = bookCopyController

