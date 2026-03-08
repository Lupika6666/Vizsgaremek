const Language = require("../models/languageModel")

const languageController = {
    /**
     * @swagger
     * tags:
     *   name: Nyelvek
     *   description: Nyelvek kezelése.
     */

    /**
     * @swagger
     * /api/nyelvek:
     *   get:
     *     summary: Az összes nyelvek lekérése.
     *     description: Ez a végpont lehetővé teszi az összes nyelv lekérdezését az adatbázisból.
     *     tags: ["Nyelvek"]
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
     *                     description: "A nyelv egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A nyelv neve"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllLanguage: (req, res, next) => {
        Language.selectAllLanguage((err, result) => {
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
     * /api/nyelvek:
     *   post:
     *     summary: "Nyelv létrehozása."
     *     description: "Ez a végpont lehetővé teszi egy új nyelv létrehozását az adatbázisba."
     *     tags: ["Nyelvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A nyelv egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "A nyelv neve"
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
     *                     description: "A nyelv egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A nyelv neve"
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    postLanguage: (req, res, next) => {
        const { nev } = req.body
        Language.insertLanguage(nev, (err, result) => {
            if (err) {
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
     * /api/nyelvek/{id}:
     *   put:
     *     summary: "Nyelv módosítása."
     *     description: "Ez a végpont lehetővé teszi egy meglévő nyelv módosítását az adatbázisban."
     *     tags: ["Nyelvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A nyelv egyedi azonosítója"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "A nyelv új neve"
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
     *                     description: "A nyelv egyedi azonosítója"
     *                   nev:
     *                     type: string
     *                     description: "A nyelv új neve"
     *       400:
     *         description: "Validációs hiba!"
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    putLanguage: (req, res, next) => {
        const { nev } = req.body
        Language.updateLanguage(req.params.id, nev, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen nyelv!"
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
     * /api/myelvek/{id}:
     *   delete:
     *     summary: "Nyelv törlése."
     *     description: "Ez a végpont lehetővé teszi egy meglévő nyelv törlését az adatbázisból."
     *     tags: ["Nyelvek"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: "A nyelv egyedi azonosítója"
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: "A megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren!"
     */
    deleteLanguage: (req, res, next) => {
        Language.deleteLanguage(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen nyelv!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = languageController

