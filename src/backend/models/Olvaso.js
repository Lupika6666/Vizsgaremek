const db = require('../config/database')

class Olvaso {
    constructor(data = {}) {
        this.kartyaszam = data.kartyaszam || null
        this.nev = data.nev || ''
        this.email = data.email || ''
        this.tel = data.tel || ''
    }

    validate() {
        const errors = []

        if (!this.kartyaszam || this.kartyaszam.trim() === '') {
            errors.push('A Kártyaszám kötelező')
        }

        if (!this.nev || this.nev.trim() === '') {
            errors.push('A Név kötelező')
        }

        if (!this.email || this.email.trim() === '') {
            errors.push('Az Email kötelező')
        }

        if (!this.tel || this.tel.trim() === '') {
            errors.push('A Telefon kötelező')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    toJSON() {
        return {
            kartyaszam: this.kartyaszam,
            nev: this.nev,
            email: this.email,
            tel: this.tel
        }
    }

    static getAll(callback) {
        const sql = 'SELECT * FROM olvasok'
        db.query(sql, [], callback)
    }

    static getById(kartyaszam, callback) {
        const sql = 'SELECT * FROM olvasok WHERE kartyaszam = ?'
        db.query(sql, [kartyaszam], callback)
    }

    static create(kartyaszam, nev, email, tel, callback) {
        const sql = 'INSERT INTO olvasok (kartyaszam, nev, email, tel) VALUES (?, ?, ?, ?)'
        db.query(sql, [kartyaszam, nev, email, tel], callback)
    }

    static update(kartyaszam, nev, email, tel, callback) {
        const sql = 'UPDATE olvasok SET nev = ?, email = ?, tel = ? WHERE kartyaszam = ?'
        db.query(sql, [nev, email, tel, kartyaszam], callback)
    }

    static delete(kartyaszam, callback) {
        const sql = 'DELETE FROM olvasok WHERE kartyaszam = ?'
        db.query(sql, [kartyaszam], callback)
    }
}

module.exports = Olvaso

