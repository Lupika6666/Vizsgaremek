const db = require('../config/database')

class Peldany {
    constructor(data = {}) {
        this.id = data.id || null //AUTO-INCREMENT, PRYMARI-KEY
        this.hely = data.hely || ''
        this.konyv_id = data.konyv_id || null
    }

    validate() {
        const errors = []

        if (!this.hely || this.hely.trim() === '') {
            errors.push('A Hely kötelező')
        }

        if (this.hely.length > 50) {
            errors.push('A Hely maximum 50 karakter lehet')
        }

        if (!this.konyv_id || this.konyv_id.trim() === '') {
            errors.push('A Konyv kötelező')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    toJSON() {
        return {
            id: this.id,
            hely: this.hely,
            konyv_id: this.konyv_id
        }
    }

    static getAll(callback) {
        const sql = 'SELECT * FROM peldanyok'
        db.query(sql, [], callback)
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM peldanyok WHERE id = ?'
        db.query(sql, [id], callback)
    }

    static create(hely, konyv_id, callback) {
        const sql = 'INSERT INTO peldanyok (hely, konyv_id) VALUES (?, ?)'
        db.query(sql, [hely, konyv_id], callback)
    }

    static update(id, hely, konyv_id, callback) {
        const sql = 'UPDATE peldanyok SET hely = ?, konyv_id = ? WHERE id = ?'
        db.query(sql, [hely, konyv_id, id], callback)
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM peldanyok WHERE id = ?'
        db.query(sql, [id], callback)
    }
}

module.exports = Peldany