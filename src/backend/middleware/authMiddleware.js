const jwt = require("jsonwebtoken")

const authMiddleware = {
    varifyToken: (req, res, next) => {
        const auth = req.headers['authorization']
        token = auth

        if(auth.startsWith('Bearer')) {
            token = auth.split(' ')[1]
        }

        if(!token) {
            return res.status(401).json({
                "valasz": "Hozzáférés megtagadva!"
            })
        }

        try{
            const dekodoltToken = jwt.verify(token, process.env.JWT_TOKEN_KEY)
            req.felhasznalo = dekodoltToken
            next()
        } catch (err) {
            return res.status(403).json({
                "valasz": "Nincs jogosultságod!"
            })
        }
    },

    requireRole: (elvartSzerepkorok) => {
        return (req, res, next) => {
            const felhasznalo = req.felhasznalo
            if(!felhasznalo || !elvartSzerepkorok.includes(felhasznalo.szerepkor)) {
                return res.status(403).json({
                    "valasz": "Nincs jogosultságod!"
                })
            }
            next()
        }
    }
}

module.exports = authMiddleware