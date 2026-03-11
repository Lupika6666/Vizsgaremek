const db = require('../config/database')

class UserModel {
    static insertUser(email, jelszo, nev, olvaso_id, callback) {
        const sql = "INSERT INTO felhasznalok (`email`, `jelszo`, `nev`, olvaso_id) VALUES (?, ?, ?, ?)"
        db.query(sql, [email, jelszo, nev, olvaso_id], callback);
    }

    static selectUserByEmail(email, callback) {
        const sql = "SELECT * FROM `felhasznalok` WHERE `email` = ?"
        db.query(sql, [email], callback);
    }

    static updateUserLastLogin(id, callback) {
        const sql = "UPDATE `felhasznalok` SET `legutobbi_bejelentkezes`=CURRENT_TIMESTAMP WHERE `id`= ?"
        db.query(sql, [id], callback);
    }
}

module.exports = UserModel