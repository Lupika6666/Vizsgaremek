const db = require('../config/database')

class LanguageModel {
    static selectAllLanguage(callback) {
        const sql = "SELECT * FROM nyelvek"
        db.query(sql, [], callback)
    }

    static insertLanguage(nev, callback) {
        const sql = "INSERT INTO nyelvek (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static updateLanguage(id, nev, callback) {
        const sql = "UPDATE nyelvek SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static deleteLanguage(id, callback) {
        const sql = "DELETE FROM nyelvek WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = LanguageModel