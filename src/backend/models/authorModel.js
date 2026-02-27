const db = require('../config/database')

class AuthorModel {
    static selectAllAuthor(callback) {
        const sql = "SELECT * FROM szerzok"
        db.query(sql, [], callback)
    }

    static insertAuthor(nev, callback) {
        const sql = "INSERT INTO szerzok (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static updateAuthor(id, nev, callback) {
        const sql = "UPDATE szerzok SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static deleteAuthor(id, callback) {
        const sql = "DELETE FROM szerzok WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = AuthorModel
