const db = require('../config/database')

class Szerzo {
    constructor(data = {}) {
        this.id = data.id || null
        this.nev = data.nev || ''
    }

    validate() {
        const errors = []

        if (!this.nev || this.nev.trim() === '') {
            errors.push('A szerző neve kötelező')
        }
        if (this.nev.length > 30) {
            errors.push('A szerző neve maximum 30 karakter lehet')
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
        const sql = "SELECT * FROM szerzok"
        db.query(sql, [], callback)
    }

    static create(nev, callback) {
        const sql = "INSERT INTO szerzok (nev) VALUES (?)"
        db.query(sql, [nev], callback)
    }

    static update(id, nev, callback) {
        const sql = "UPDATE szerzok SET nev = ? WHERE id = ?"
        db.query(sql, [nev, id], callback)
    }

    static delete(id, callback) {
        const sql = "DELETE FROM szerzok WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = Szerzo
