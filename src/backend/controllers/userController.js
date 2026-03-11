const User = require("../models/userModel")

const userController = {
    /**
     * @swagger
     * tags:
     *   name: Felhasznalok
     *   description: Felhasznalok kezelése.
     */

    /**
     * @swagger
     * /api/felhasznalok/regisztracio:
     *   post:
     *     summary: Új felhasználó regisztrálása.
     *     description: Ez a végpont lehetővé teszi új felhasználó létrehozását az adatbázisban.
     *     tags: ["Felhasznalok"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: "A felhasználó email címe"
     *               jelszo:
     *                 type: string
     *                 description: "A felhasználó jelszava"
     *               nev:
     *                 type: string
     *                 description: "A felhasználó neve"
     *               olvaso_id:
     *                 type: integer
     *                 description: "A felhasználó olvasókártyájának száma"
     *             required:
     *               - email
     *               - jelszo
     *               - nev
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: Belső szerverhiba!
     */
    registerUser: (req, res, next) => {
        
        const {email, jelszo, nev, olvaso_id} = req.body
        
        //jelszó titkosítása
        //TODO
        const hashedJelszo = jelszo;

        User.insertUser(email, hashedJelszo, nev, olvaso_id, (err, result) => {

            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A megadott email címmel már regisztráltak." });
                }
                next(err);
            }

            res.status(201).json({ "valasz": "Sikeres regisztráció!" });
        })
    },

    /**
     * @swagger
     * /api/felhasznalok/bejelentkezes:
     *   post:
     *     summary: Felhasználóval bejelentkezés.
     *     description: Ez a végpont lehetővé teszi a felhasználó bejelentkezését.
     *     tags: ["Felhasznalok"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: "A felhasználó email címe"
     *               jelszo:
     *                 type: string
     *                 description: "A felhasználó jelszava"
     *             required:
     *               - email
     *               - jelszo
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: "Az azonosításhoz szükséges token"
     *                 felhasznalo:
     *                   type: object
     *                   properties:
     *                     nev:
     *                       type: string
     *                       description: "A felhasználó neve"
     *                     szerepkor:
     *                       type: string
     *                       description: "A felhasználó szerepköre"
     *       400:
     *         description: "Validációs hiba!"
     *       401:
     *         description: Hibás email cím vagy jelszó!
     *       403:
     *         description: A fiók deaktiválva van!
     *       500:
     *         description: Belső szerverhiba!
     */
    loginUser: (req, res, next) => {
        const {email, jelszo} = req.body

        User.selectUserByEmail(email, (err, result) => {
            if (err) {
                return next(err);
            }

            if (result.length === 0) {
                return res.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" });
            }

            const felhasznalo = result[0]

            if (felhasznalo.aktiv === 0) {
                return res.status(403).json({ "valasz": "A fiók deaktiválva van!" });
            }

            //helyes jelszó?
            //TODO titkosított jelszó ellenőrzése
            const jelszoHelyes = (jelszo === felhasznalo.jelszo)

            if (!jelszoHelyes) {
                return res.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" })
            }

            const token = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "szerepkor": felhasznalo.szerepkor,
                },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: '1h'
                }
            );

            res.status(200).json({
                "valasz": "Sikeres bejelentkezés",
                "token": token,
                "felhasznalo": {
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor
                }
            })
        })
    }
}

module.exports = userController

