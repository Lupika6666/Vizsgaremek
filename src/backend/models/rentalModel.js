const db = require('../config/database')

class RentalModel {
    static selectAllRental(callback) {
        const query = 'SELECT * FROM kolcsonzesek'
        db.query(query, [], callback)
    }

    static selectRentalById(id, callback) {
        const query = 'SELECT * FROM kolcsonzesek WHERE id = ?'
        db.query(query, [id], callback)
    }

    static insertRental(kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, callback) {
        const query = 'INSERT INTO kolcsonzesek (kolcsonzes_ideje, hatarido, peldany_id, olvaso_id) VALUES (?, ?, ?, ?)'
        db.query(query, [kolcsonzes_ideje, hatarido, peldany_id, olvaso_id], callback)
    }

    static updateRental(id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, callback) {
        const query = 'UPDATE kolcsonzesek SET kolcsonzes_ideje = ?, hatarido = ?, peldany_id = ?, olvaso_id = ? WHERE id = ?'
        db.query(query, [kolcsonzes_ideje, hatarido, peldany_id, olvaso_id, id], callback)
    }

    static deleteRental(id, callback) {
        const query = 'DELETE FROM kolcsonzesek WHERE id = ?'
        db.query(query, [id], callback)
    }
}

module.exports = RentalModel
