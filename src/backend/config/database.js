const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')})
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(err => {
    if(err) {
        console.error('Hiba a MySQL kapcsolódás során: ', err)
        return
    }
    console.log('Kapcsolódás sikeres!')
})

module.exports = db