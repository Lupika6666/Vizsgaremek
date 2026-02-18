const db = require('../config/database')

class Konyv {
    constructor(data = {}) {
        this.id = data.id || null //AUTO-INCREMENT, PRYMARI-KEY
        this.cim = data.cim || data.konyvcim || ''
        this.szerzo = data.szerzo || data.konyvszerzo || ''
        this.isbn = data.isbn //UNIQUE kell legyen
        this.publikalas_ev = data.publikalas_ev || data.konyvpublikalas_ev || ''
        this.leiras = data.leiras || data.konyvleiras || ''
        this.kiado = data.kiado || data.konyvkiado || ''
        this.nyelv = data.nyelv || data.konyvnyelv || ''
        this.oldalszam = data.oldalszam || data.konyvoldalszam || ''
    }

    validate() {
        const errors = []

        if (!this.cim || this.cim.trim() === '') {
            errors.push('A Cím kötelező')
        }
        if (this.cim.length > 50) {
            errors.push('A Cím maximum 50 karakter lehet')
        }

        if (!this.szerzo || this.szerzo.trim() === '') {
            errors.push('A Szerzo kötelező')
        }
        if (this.szerzo.length > 50) {
            errors.push('A Szerzo maximum 50 karakter lehet')
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

        if (!this.kiado || this.kiado.trim() === '') {
            errors.push('A Kiado kötelező')
        }
        if (this.kiado.length > 50) {
            errors.push('A Kiado maximum 50 karakter lehet')
        }

        if (!this.nyelv || this.nyelv.trim() === '') {
            errors.push('A Nyelv kötelező')
        }
        if (this.nyelv.length > 15) {
            errors.push('A Nyelv maximum 15 karakter lehet')
        }

        if (!this.oldalszam || this.oldalszam.trim() === '') {
            errors.push('Az oldalszám kötelező')
        }
        if (this.oldalszam <= 0) {
            errors.push('Adjon meg valós oldalszámot')
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
            szerzo: this.szerzo,
            isbn: this.isbn,
            publikalas_ev: this.publikalas_ev,
            leiras: this.leiras,
            kiado: this.kiado,
            nyelv: this.nyelv,
            oldalszam: this.oldalszam
        }
    }

    static getAll(callback) {
        const sql = "SELECT * FROM konyvek"
        db.query(sql, [], callback)
    }

    static getById(id, callback) {
        const sql = "SELECT * FROM konyvek WHERE id = ?"
        db.query(sql, [id], callback)
    }

    static create(cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam, callback) {
        const sql = "INSERT INTO konyvek (cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        db.query(sql, [cim, szerzo, isbn, publikalas_ev, leiras, kiado, nyelv, oldalszam], callback)
    }

    static update(id, cim, szerzo, publikalas_ev, leiras, kiado, nyelv, oldalszam, callback) {
        const sql = "UPDATE konyvek SET cim = ?, szerzo = ?, publikalas_ev = ?, leiras = ?, kiado = ?, nyelv = ?, oldalszam = ? WHERE id = ?"
        db.query(sql, [cim, szerzo, publikalas_ev, leiras, kiado, nyelv, oldalszam, id], callback)
    }

    static delete(id, callback) {
        const sql = "DELETE FROM konyvek WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = Konyv