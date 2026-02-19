const db = require('../config/database')

class User {
    constructor(data = {}) {
        this.nev = data.nev
        this.jelszo = data.jelszo
        this.role = data.role || 'user'
        this.olvaso_id = data.olvaso_id || null
    }

    validate() {
        const errors = []

        if (!this.nev || this.nev.trim() === '') {
            errors.push('A név kötelező')
        }

        if (!this.jelszo || this.jelszo.trim() === '') {
            errors.push('A jelszó kötelező')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    toJSON() {
        return {
            nev: this.nev,
            jelszo: this.jelszo,
            role: this.role,
            olvaso_id: this.olvaso_id
        }
    }

    static getByNev(nev, callback) {
        const sql = "SELECT * FROM userek WHERE nev = ?"
        db.query(sql, [nev], callback)
    }

    static login(nev, jelszo, callback) {
        const sql = "SELECT * FROM userek WHERE nev = ? AND jelszo = ?"
        db.query(sql, [nev, jelszo], callback)
    }

    static register(nev, jelszo, olvaso_id, callback) {
        const sql = "INSERT INTO userek (nev, jelszo, role, olvaso_id) VALUES (?, ?, \"user\", ?)"
        db.query(sql, [nev, jelszo, olvaso_id], callback)
    }

    static update(nev, ujnev, jelszo, olvaso_id, callback) {
        const sql = "UPDATE userek SET nev = ?, jelszo = ?, olvaso_id = ? WHERE nev = ?"
        db.query(sql, [ujnev, jelszo, olvaso_id, nev], callback)
    }

    static delete(nev, callback) {
        const sql = "DELETE FROM userek WHERE nev = ?"
        db.query(sql, [nev], callback)
    }
}

module.exports = User