const db = require('../config/database')

class Konyv {
    constructor(data = {}) {
        this.id = data.id || null //AUTO-INCREMENT, PRYMARI-KEY
        this.cim = data.cim || ''
        this.isbn = data.isbn //UNIQUE kell legyen
        this.publikalas_ev = data.publikalas_ev  || ''
        this.leiras = data.leiras || ''
        this.nyelv_id = data.nyelv_id || null
        this.szerzo_id = data.szerzo_id  || null
        this.mufaj_id = data.mufaj_id || null
    }

    validate() {
        const errors = []

        if (!this.cim || this.cim.trim() === '') {
            errors.push('A Cím kötelező')
        }
        if (this.cim.length > 50) {
            errors.push('A Cím maximum 50 karakter lehet')
        }

        if (!this.isbn || this.isbn.trim() === '') {
            errors.push('Az ISBN kód kötelező')
        }
        if (this.isbn.length !== 13) {
            errors.push('Az ISBN kód csak 13 karakteres lehet')
        }

        if (!this.publikalas_ev || this.publikalas_ev.trim() === '') {
            errors.push('A publikálás éve kötelező')
        }

        if (this.publikalas_ev < new Date().getFullYear()) {
            errors.push('Adjon meg valós évszámot')
        }

        if (!this.leiras || this.leiras.trim() === '') {
            errors.push('A Leiras kötelező')
        }
        if (this.leiras.length > 50) {
            errors.push('A Leiras maximum 255 karakter lehet')
        }

        if (!this.szerzo_id || this.szerzo_id.trim() === '') {
            errors.push('A Szerzo kötelező')
        }

        if (!this.nyelv_id || this.nyelv_id.trim() === '') {
            errors.push('A Nyelv kötelező')
        }

        if (this.mufaj_id || this.mufaj_id.trim() === '') {
            errors.push('A Mufaj kötelező')
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            id: this.id,
            cim: this.cim,
            isbn: this.isbn,
            publikalas_ev: this.publikalas_ev,
            leiras: this.leiras,
            nyelv_id: this.nyelv_id,
            szerzo_id: this.szerzo_id,
            mufaj_id: this.mufaj_id

        }
    }

    static getAll(callback) {
        const sql = "SELECT k.id, k.cim, k.isbn, k.publikalas_ev, k.leiras, n.nev AS nyelv, s.nev AS szerzo, m.nev AS mufaj FROM konyvek k JOIN nyelvek n ON k.nyelv_id = n.id JOIN szerzok s ON k.szerzo_id = s.id JOIN mufajok m ON k.mufaj_id = m.id"
        db.query(sql, [], callback)
    }

    static getById(id, callback) {
        const sql = "SELECT k.id, k.cim, k.isbn, k.publikalas_ev, k.leiras, n.nev AS nyelv, s.nev AS szerzo, m.nev AS mufaj FROM konyvek k JOIN nyelvek n ON k.nyelv_id = n.id JOIN szerzok s ON k.szerzo_id = s.id JOIN mufajok m ON k.mufaj_id = m.id WHERE id = ?"
        db.query(sql, [id], callback)
    }

    static create(cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, callback) {
        const sql = "INSERT INTO konyvek (cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(sql, [cim, isbn, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id], callback)
    }

    static update(id, cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, callback) {
        const sql = "UPDATE konyvek SET cim = ?, publikalas_ev = ?, leiras = ?, nyelv_id = ?, szerzo_id = ?, mufaj_id = ? WHERE id = ?"
        db.query(sql, [cim, publikalas_ev, leiras, nyelv_id, szerzo_id, mufaj_id, id], callback)
    }

    static delete(id, callback) {
        const sql = "DELETE FROM konyvek WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = Konyv