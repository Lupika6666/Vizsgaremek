const db = require('../config/database')

class UserModel {
    static selectUserByNevANDJelszo(nev, jelszo, callback) {
        const sql = "SELECT * FROM userek WHERE nev = ? AND jelszo = ?"
        db.query(sql, [nev, jelszo], callback)
    }

    static insertUser(nev, jelszo, olvaso_id, callback) {
        const sql = "INSERT INTO userek (nev, jelszo, role, olvaso_id) VALUES (?, ?, \"user\", ?)"
        db.query(sql, [nev, jelszo, olvaso_id], callback)
    }

    static updateUser(nev, ujnev, jelszo, olvaso_id, callback) {
        const sql = "UPDATE userek SET nev = ?, jelszo = ?, olvaso_id = ? WHERE nev = ?"
        db.query(sql, [ujnev, jelszo, olvaso_id, nev], callback)
    }

    static deleteUser(nev, callback) {
        const sql = "DELETE FROM userek WHERE nev = ?"
        db.query(sql, [nev], callback)
    }
}

module.exports = UserModel