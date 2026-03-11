const User = require("../models/userModel")

const userController = {
registerUser: (req, res, next) => {
        
        const email = req.body.email;
        const jelszo = req.body.jelszo;
        const nev = req.body.nev;
        const olvaso_id = req.body.olvaso_id;
        
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

    loginUser: (req, res, next) => {
        const email = req.body.email;
        const jelszo = req.body.jelszo;

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

