const db = require('../config/database')

class BookModel {
    static selectAllBook(callback) {
        const sql = "SELECT k.id, k.cim, k.isbn, k.publikalas_ev, k.leiras, n.nev AS nyelv, s.nev AS szerzo, m.nev AS mufaj FROM konyvek k JOIN nyelvek n ON k.nyelv_id = n.id JOIN szerzok s ON k.szerzo_id = s.id JOIN mufajok m ON k.mufaj_id = m.id"
        db.query(sql, [], callback)
    }

    static selectBookById(id, callback) {
        const sql = "SELECT k.id, k.cim, k.isbn, k.publikalas_ev, k.leiras, n.nev AS nyelv, s.nev AS szerzo, m.nev AS mufaj FROM konyvek k JOIN nyelvek n ON k.nyelv_id = n.id JOIN szerzok s ON k.szerzo_id = s.id JOIN mufajok m ON k.mufaj_id = m.id WHERE k.id = ?"
        db.query(sql, [id], callback)
    }

    static insertBook(cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, callback) {
        const sql = "INSERT INTO konyvek (cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(sql, [cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id], callback)
    }

    static updateBook(id, cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, callback) {
        const sql = "UPDATE konyvek SET cim = ?, publikalas_ev = ?, leiras = ?, nyelv_id = ?, szerzo_id = ?, mufaj_id = ? WHERE id = ?"
        db.query(sql, [cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, id], callback)
    }

    static deleteBook(id, callback) {
        const sql = "DELETE FROM konyvek WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = BookModel