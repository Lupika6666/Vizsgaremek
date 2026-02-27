const db = require('../config/database')

class ReaderModel {
    static selectAllReader(callback) {
        const sql = 'SELECT * FROM olvasok'
        db.query(sql, [], callback)
    }

    static selectReaderById(kartyaszam, callback) {
        const sql = 'SELECT * FROM olvasok WHERE kartyaszam = ?'
        db.query(sql, [kartyaszam], callback)
    }

    static insertReader(kartyaszam, nev, email, tel, callback) {
        const sql = 'INSERT INTO olvasok (kartyaszam, nev, email, tel) VALUES (?, ?, ?, ?)'
        db.query(sql, [kartyaszam, nev, email, tel], callback)
    }

    static updateReader(kartyaszam, nev, email, tel, callback) {
        const sql = 'UPDATE olvasok SET nev = ?, email = ?, tel = ? WHERE kartyaszam = ?'
        db.query(sql, [nev, email, tel, kartyaszam], callback)
    }

    static deleteReader(kartyaszam, callback) {
        const sql = 'DELETE FROM olvasok WHERE kartyaszam = ?'
        db.query(sql, [kartyaszam], callback)
    }
}

module.exports = ReaderModel

