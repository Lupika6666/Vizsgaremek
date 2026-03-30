const { hashPassword, comparePassword } = require("../middleware/bcryptHandler");
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

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
     *               - olvaso_id
     *     responses:
     *       201:
     *         description: Sikeres létrehozás!
     *       400:
     *         description: "Validációs hiba!"
     *       500:
     *         description: Belső szerverhiba!
     */
    registerUser: async (req, res, next) => {

        const { email, jelszo, nev, olvaso_id } = req.body

        const hashedJelszo = await hashPassword(jelszo);

        User.insertUser(email, hashedJelszo, nev, olvaso_id, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ "valasz": "A megadott email címmel már regisztráltak." });
                }
                return next(err);
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
     *       200:
     *         description: Sikeres bejelentkezés
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
     *                     id:
     *                       type: integer
     *                       description: "A felhasználó azonosítója"
     *                     email:
     *                       type: string
     *                       description: "A felhasználó email címe"
     *                     nev:
     *                       type: string
     *                       description: "A felhasználó neve"
     *                     szerepkor:
     *                       type: string
     *                       description: "A felhasználó szerepköre"
     *                     olvaso_id:
     *                       type: integer
     *                       description: "A felhasználó olvasói kártyaszáma"
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
        const { email, jelszo } = req.body

        User.selectUserByEmail(email, async (err, result) => {
            if (err) {
                return next(err);
            }

            if (result.length === 0) {
                return res.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" });
            }

            const felhasznalo = result[0]

            if (felhasznalo.aktiv === 0) {
                return res.status(403).json({ "valasz": "A fiók deaktiválva van!" })
            }

            const jelszoHelyes = await comparePassword(jelszo, felhasznalo.jelszo)

            if (!jelszoHelyes) {
                return res.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" })
            }

            const accessToken = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                    "olvaso_id": felhasznalo.olvaso_id
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: 900
                }
            )

            const refreshToken = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                    "olvaso_id": felhasznalo.olvaso_id
                },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: "1d"
                }
            )

            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: false,
                sameSite: true,
                maxAge: 1 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({
                "valasz": "Sikeres bejelentkezés",
                "accessToken": accessToken,
                "felhasznalo": {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                    "olvaso_id": felhasznalo.olvaso_id
                }
            })
        })
    },

    /**
     * @swagger
     * /api/felhasznalok/token-frissites:
     *   post:
     *     summary: Token frissítése.
     *     description: Ez a végpont lehetővé teszi a felhasználó tokenének frissítését.
     *     tags: ["Felhasznalok"]
     *     responses:
     *       200:
     *         description: Sikeres frissítés
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *                   description: "Az azonosításhoz szükséges token"
     *       401:
     *         description: Nincs refresh token! Új access token nem generálható!
     *       403:
     *         description: Érvénytelen vagy lejárt refresh token!
     *       500:
     *         description: Belső szerverhiba!
     */
    refreshToken: (req, res, next) => {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(401).json({
                "valasz": "Nincs refresh token! Új access token nem generálható!"
            })
        }

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)

            const accessToken = jwt.sign(
                {
                    "id": decodedRefreshToken.id,
                    "email": decodedRefreshToken.email,
                    "nev": decodedRefreshToken.nev,
                    "szerepkor": decodedRefreshToken.szerepkor,
                    "olvaso_id": decodedRefreshToken.olvaso_id
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: 900
                }
            )

            res.status(200).json({
                "accessToken": accessToken
            })
        } catch (error) {
            return res.status(403).json({
                "valasz": "Érvénytelen vagy lejárt refresh token!"
            })
        }
    },

    /**
     * @swagger
     * /api/felhasznalok/kijelentkezes:
     *   post:
     *     summary: Felhasználóval kijelentkezés.
     *     description: Ez a végpont lehetővé teszi a felhasználó kijelentkezését.
     *     tags: ["Felhasznalok"]
     *     responses:
     *       200:
     *         description: Sikeres kijelentkezés
     *       500:
     *         description: Belső szerverhiba!
     */
    logoutUser: (req, res, next) => {
        res.clearCookie("refreshToken", {
            httpOnly: false,
            secure: false,
            sameSite: true
        })

        res.status(200).json({
            "valasz": "Sikeres kijelentkezés"
        })
    }
}

module.exports = userController
