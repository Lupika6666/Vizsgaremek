const db = require('../config/database')

class Nyelv {
    constructor(data = {}) {
        this.id = data.id || null
        this.nev = data.nev || ''
    }

    validate() {
        const errors = []

        if (!this.nev || this.nev.trim() === '') {
            errors.push('A Nyelv neve kötelező')
        }
        if (this.nev.length > 50) {
            errors.push('A Nyelv neve maximum 50 karakter lehet')
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
        const sql = "SELECT * FROM nyelvek"
        db.query(sql, [], callback)
    }

    static create(nev, callback) {
        const sql = "INSERT INTO nyelvek (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static update(id, nev, callback) {
        const sql = "UPDATE nyelvek SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static delete(id, callback) {
        const sql = "DELETE FROM nyelvek WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = Nyelv