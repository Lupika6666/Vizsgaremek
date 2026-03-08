const Reader = require("../models/readerModel")

const readerController = {
    /**
     * @swagger
     * tags:
     *   name: Olvasók
     *   description: Olvasók kezelése.
     */

    /**
     * @swagger
     * /api/olvasok:
     *   get:
     *     summary: Az összes olvasó lekérése.
     *     description: Ez a végpont lehetővé teszi az összes olvasó lekérdezését az adatbázisból.
     *     tags: ["Olvasók"]
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
     *                   kartyaszam:
     *                     type: integer
     *                     description: "Az olvasó egyedi kártyaszáma"
     *                   nev:
     *                     type: string
     *                     description: "Az olvasó neve"
     *                   email:
     *                     type: string
     *                     description: "Az olvasó email címe"
     *                   tel:
     *                     type: string
     *                     description: "Az olvasó telefonszáma"
     *       500:
     *         description: Belső szerverhiba!
     */
    getAllReader: (req, res, next) => {
        Reader.selectAllReader((err, result) => {
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
     * /api/olvasok/{id}:
     *  get:
     *     summary: Egy olvasó lekérése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy olvasó lekérdezését az adatbázisból az ID alapján.
     *     tags: ["Olvasók"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "Az olvasó egyedi kártyaszáma"
     *     responses:
     *       200:
     *         description: Sikeres lekérdezés!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 kartyaszam:
     *                   type: integer
     *                   description: "Az olvasó egyedi kártyaszáma"
     *                 nev:
     *                   type: string
     *                   description: "Az olvasó neve"
     *                 email:
     *                   type: string
     *                   description: "Az olvasó email címe"
     *                 tel:
     *                   type: string
     *                   description: "Az olvasó telefonszáma"
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    getReaderById: (req, res, next) => {
        Reader.selectReaderById(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.length < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
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
     * /api/olvasok:
     *   post:
     *     summary: Új olvasó létrehozása.
     *     description: Ez a végpont lehetővé teszi egy új olvasó létrehozását az adatbázisban.
     *     tags: ["Olvasók"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               kartyaszam:
     *                 type: integer
     *                 description: "Az olvasó egyedi kártyaszáma"
     *               nev:
     *                 type: string
     *                 description: "Az olvasó neve"
     *               email:
     *                 type: string
     *                 description: "Az olvasó email címe"
     *               tel:
     *                 type: string
     *                 description: "Az olvasó telefonszáma"
     *             required:
     *               - kartyaszam
     *               - nev
     *               - email
     *               - tel
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 kartyaszam:
     *                   type: integer
     *                   description: "Az olvasó egyedi kártyaszáma"
     *                 nev:
     *                   type: string
     *                   description: "Az olvasó neve"
     *                 email:
     *                   type: string
     *                   description: "Az olvasó email címe"
     *                 tel:
     *                   type: string
     *                   description: "Az olvasó telefonszáma"
     *       400:
     *         description: Validációs hiba!
     *       500:
     *         description: Belső szerverhiba!
     */
    postReader: (req, res, next) => {
        const { kartyaszam, nev, email, tel } = req.body
        Reader.insertReader(kartyaszam, nev, email, tel, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A kártyaszám foglalt!" });
                }
                return next(err)
            }
            res.status(201).json({
                "valasz": "Sikeres létrehozás!",
                "adatok": {
                    "kartyaszam": kartyaszam,
                    "nev": nev,
                    "email": email,
                    "tel": tel
                }
            })
        })
    },

    /**
     * @swagger
     * /api/olvasok/{id}:
     *   put:
     *     summary: Egy olvasó módosítása ID alapján.
     *     description: Ez a végpont lehetővé teszi egy olvasó módosítását az adatbázisban az ID alapján.
     *     tags: ["Olvasók"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "Az olvasó egyedi kártyaszáma"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nev:
     *                 type: string
     *                 description: "Az olvasó neve"
     *               email:
     *                 type: string
     *                 description: "Az olvasó email címe"
     *               tel:
     *                 type: string
     *                 description: "Az olvasó telefonszáma"
     *             required:
     *               - nev
     *               - email
     *               - tel
     *     responses:
     *       200:
     *         description: Sikeres módosítás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 kartyaszam:
     *                   type: integer
     *                   description: "Az olvasó egyedi kártyaszáma"
     *                 nev:
     *                   type: string
     *                   description: "Az olvasó neve"
     *                 email:
     *                   type: string
     *                   description: "Az olvasó email címe"
     *                 tel:
     *                   type: string
     *                   description: "Az olvasó telefonszáma"
     *       400:
     *         description: Validációs hiba!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    putReader: (req, res, next) => {
        const { nev, email, tel } = req.body
        Reader.updateReader(req.params.id, nev, email, tel, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
                })
            }
            res.status(200).json({
                "valasz": "Sikeres módosítás!",
                "adatok": {
                    "kartyaszam": req.params.id,
                    "nev": nev,
                    "email": email,
                    "tel": tel
                }
            })
        })
    },

    /**
     * @swagger
     * /api/olvasok/{id}:
     *   delete:
     *     summary: Egy olvasó törlése ID alapján.
     *     description: Ez a végpont lehetővé teszi egy olvasó törlését az adatbázisból az ID alapján.
     *     tags: ["Olvasók"]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: "Az olvasó egyedi kártyaszáma"
     *     responses:
     *       204:
     *         description: Sikeres törlés!
     *       404:
     *         description: A megadott azonosítóval nem létezik rekord!
     *       500:
     *         description: Belső szerverhiba!
     */
    deleteReader: (req, res, next) => {
        Reader.deleteReader(req.params.id, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.affectedRows < 1) {
                return res.status(404).json({
                    "valasz": "Nincs ilyen olvasó!"
                })
            }
            res.status(204).json({
                "valasz": "Sikeres törlés!"
            })
        })
    }
}

module.exports = readerController

