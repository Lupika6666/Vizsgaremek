const db = require('../config/database')

class GenreModel {
    static selectAllGenre(callback) {
        const sql = "SELECT * FROM mufajok"
        db.query(sql, [], callback)
    }

    static insertGenre(nev, callback) {
        const sql = "INSERT INTO mufajok (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static updateGenre(id, nev, callback) {
        const sql = "UPDATE mufajok SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static deleteGenre(id, callback) {
        const sql = "DELETE FROM mufajok WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = GenreModel