const db = require('../config/database')

class Kolcsonzes {
    constructor(data = {}) {
        this.id = data.id || null
        this.kolcsonzes_ideje = data.kolcsonzes_ideje || null
        this.hatarido = data.hatarido || null
        this.peldany_id = data.peldany_id || null
        this.olvaso_id = data.olvaso_id || null
    }

    validate() {
        const errors = []

        if (!this.kolcsonzes_ideje) {
            errors.push('A kölcsönzés ideje kötelező')
        }

        if (this.kolcsonzes_ideje > new Date()) {
            errors.push('A kölcsönzés ideje nem lehet a jövőben')
        }

        if (!this.hatarido) {
            errors.push('A határidő kötelező')
        }

        if (this.hatarido < new Date()) {
            errors.push('A határidő nem lehet a múltban')
        }

        if (this.hatarido < this.kolcsonzes_ideje) {
            errors.push('A határidő nem lehet a kölcsönzés ideje előtt')
        }

        if (!this.peldany_id) {
            errors.push('A példány ID kötelező')
        }

        if (!this.olvaso_id) {
            errors.push('Az olvasó ID kötelező')
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        }
    }

    toJSON() {
        return {
            id: this.id,
            kolcsonzes_ideje: this.kolcsonzes_ideje,
            hatarido: this.hatarido,
            peldany_id: this.peldany_id,
            olvaso_id: this.olvaso_id
        }
    }

    static getAll(callback) {
        const query = 'SELECT * FROM kolcsonzesek'
        db.query(query, [], callback)
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM kolcsonzesek WHERE id = ?'
        db.query(query, [id], callback)
    }

    static create(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, callback) {
        const query = 'INSERT INTO kolcsonzesek (kolcsonzes_ideje, hatarido, peldany_id, olvaso_id) VALUES (?, ?, ?, ?)'
        db.query(query, [kolcsonzes_ideje, hatarido, peldany_id, olvaso_id], callback)
    }

    static update(id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, callback) {
        const query = 'UPDATE kolcsonzesek SET kolcsonzes_ideje = ?, hatarido = ?, peldany_id = ?, olvaso_id = ? WHERE id = ?'
        db.query(query, [kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, id], callback)
    }

    static delete(id, callback) {
        const query = 'DELETE FROM kolcsonzesek WHERE id = ?'
        db.query(query, [id], callback)
    }
}

module.exports = Kolcsonzes
