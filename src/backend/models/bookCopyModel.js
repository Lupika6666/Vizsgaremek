const db = require('../config/database')

class BookCopyModel {
    //TODO Valószínű szükségetelen (törlésre kerül majd)
    static selectAllBookCopy(callback) {
        const sql = 'SELECT * FROM peldanyok'
        db.query(sql, [], callback)
    }
    //TODO Valószínű szükségetelen (törlésre kerül majd)
    static selectBookCopyById(id, callback) {
        const sql = 'SELECT * FROM peldanyok WHERE id = ?'
        db.query(sql, [id], callback)
    }
    //TODO a konkrét könyvhöz tartozó példányok lekérdezése
    static selectBookCopyByBookId(konyv_id, callback) {
        const sql = 'SELECT * FROM peldanyok WHERE konyv_id = ?'
        db.query(sql, [konyv_id], callback)
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