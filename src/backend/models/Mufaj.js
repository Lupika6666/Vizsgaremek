const db = require('../config/database')

class Mufaj {
    constructor(data = {}) {
        this.id = data.id || null
        this.nev = data.nev || ''
    }

    validate() {
        const errors = []

        if (!this.nev || this.nev.trim() === '') {
            errors.push('A Mufaj neve kötelező')
        }
        if (this.nev.length > 50) {
            errors.push('A Mufaj neve maximum 30 karakter lehet')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    toJSON() {
        return {
            id: this.id,
            nev: this.nev
        }
    }

    static getAll(callback) {
        const sql = "SELECT * FROM mufajok"
        db.query(sql, [], callback)
    }

    static create(nev, callback) {
        const sql = "INSERT INTO mufajok (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static update(id, nev, callback) {
        const sql = "UPDATE mufajok SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static delete(id, callback) {
        const sql = "DELETE FROM mufajok WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = Mufaj