const Szerzo = require("../models/authorModel")

const authorController = {
    /**
     * @swagger
     * tags:
     *   name: Szerzők
     *   description: Szerzők kezelése.
     */

    /**
     * @swagger
     * /api/szerzok:
     *   get:
     *     summary: Az összes szerző lekérése.
     *     description: Ez a végpont lehetővé teszi az összes szerző lekérdezését az adatbázisból.
     *     tags: ["Szerzők"]
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
     *                     description: "A szerző egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A szerző neve"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllAuthor: (req, res, next) => {
        Szerzo.selectAllAuthor((err, result) => {
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
     * /api/szerzok:
     *   post:
     *     summary: "Szerző létrehozása."
     *     description: "Ez a végpont lehetővé teszi egy új szerző létrehozását az adatbázisba."
     *     tags: ["Szerzők"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A szerző egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "A szerző neve"
     *             required:
     *               - nev
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: "A szerző egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A szerző neve"
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    postAuthor: (req, res, next) => {
        const { nev } = req.body
        Szerzo.insertAuthor(nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        "valasz": "A szerző már korábban hozzá lett adva!" })
                }
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "id": result.insertId,
                    "nev": nev
                }
            })
        })
    },

    /**
     * @swagger
     * /api/szerzok/{id}:
     *   put:
     *     summary: "Szerző módosítása."
     *     description: "Ez a végpont lehetővé teszi egy meglévő szerző adatainak módosítását az adatbázisban."
     *     tags: ["Szerzők"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A szerző egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "A szerző új neve"
     *             required:
     *               - nev
     *     responses:
     *       200:
     *         description: Sikeres módosítás!
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: "A szerző egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A szerző új neve"
     *       400:
     *         description: "Validációs hiba!"
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    putAuthor: (req, res, next) => {
        const { nev } = req.body
        Szerzo.updateAuthor(req.params.id, nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        "valasz": "Ilyen nevű szerző már hozzá lett adva!" })
                }
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen szerző!"
                });
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "id": req.params.id,
                    "nev": nev
                }
            })
        })
    },

    /**
     * @swagger
     * /api/szerzok/{id}:
     *   delete:
     *     summary: "Szerző törlése."
     *     description: "Ez a végpont lehetővé teszi egy szerző törlését az adatbázisból a megadott azonosító alapján."
     *     tags: ["Szerzők"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A szerző egyedi azonosítója."
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    deleteAuthor: (req, res, next) => {
        Szerzo.deleteAuthor(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen szerző!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = authorController

