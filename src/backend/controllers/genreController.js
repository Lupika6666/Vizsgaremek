const Genre = require("../models/genreModel")

const genreController = {
    /**
     * @swagger
     * tags:
     *   name: Műfajok
     *   description: Műfajok kezelése.
     */

    /**
     * @swagger
     * /api/mufajok:
     *   get:
     *     summary: Az összes műfaj lekérése.
     *     description: Ez a végpont lehetővé teszi az összes műfaj lekérdezését az adatbázisból.
     *     tags: ["Műfajok"]
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
     *                     description: A műfaj egyedi azonosítója.
     *                   nev:
     *                     type: string
     *                     description: A műfaj neve.
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllGenre: (req, res, next) => {
        Genre.selectAllGenre((err, result) => {
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
     * /api/mufajok:
     *   post:
     *     summary: Új műfaj létrehozása.
     *     description: Ez a végpont lehetővé teszi egy új műfaj létrehozását az adatbázisban.
     *     tags: ["Műfajok"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nev:
     *                 type: string
     *                 description: A műfaj neve.
     *             required:
     *               - nev
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 nev:
     *                   type: string
     *                   description: A műfaj neve.
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: Belső szerverhiba!
     */
    postGenre: (req, res, next) => {
        const { nev } = req.body
        Genre.insertGenre(nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A név foglalt!" });
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
     * /api/mufajok/{id}:
     *   put:
     *     summary: "Műfaj módosítása."
     *     description: "Ez a végpont lehetővé teszi egy meglévő műfaj adatainak módosítását az adatbázisban."
     *     tags: ["Műfajok"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A műfaj egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "A műfaj új neve"
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
     *                     description: "A műfaj egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A műfaj új neve"
     *       400:
     *         description: "Validációs hiba!"
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    putGenre: (req, res, next) => {
        const { nev } = req.body
        Genre.updateGenre(req.params.id, nev, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A név foglalt!" });
                }
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen műfaj!"
                })
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
     * /api/mufajok/{id}:
     *   delete:
     *     summary: "Műfaj törlése."
     *     description: "Ez a végpont lehetővé teszi egy műfaj törlését az adatbázisból a megadott azonosító alapján."
     *     tags: ["Műfajok"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A műfaj egyedi azonosítója."
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    deleteGenre: (req, res, next) => {
        Genre.deleteGenre(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen műfaj!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = genreController

