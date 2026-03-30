const path = require('path')
const mysql = require('mysql2')

const envFile = process.env.NODE_ENV === 'test' ? './.env.test' : './.env';

require('dotenv').config({path: path.join(__dirname, envFile)})

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