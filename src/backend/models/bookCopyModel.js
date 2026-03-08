const db = require('../config/database')

class BookCopyModel {
    static selectAllBookCopy(callback) {
        const sql = 'SELECT * FROM peldanyok'
        db.query(sql, [], callback)
    }

    static selectBookCopyById(id, callback) {
        const sql = 'SELECT * FROM peldanyok WHERE id = ?'
        db.query(sql, [id], callback)
    }

    static insertBookCopy(hely, konyv_id, callback) {
        const sql = 'INSERT INTO peldanyok (hely, konyv_id) VALUES (?, ?)'
        db.query(sql, [hely, konyv_id], callback)
    }

    static updateBookCopy(id, hely, konyv_id, callback) {
        const sql = 'UPDATE peldanyok SET hely = ?, konyv_id = ? WHERE id = ?'
        db.query(sql, [hely, konyv_id, id], callback)
    }

    static deleteBookCopy(id, callback) {
        const sql = 'DELETE FROM peldanyok WHERE id = ?'
        db.query(sql, [id], callback)
    }
}

module.exports = BookCopyModel