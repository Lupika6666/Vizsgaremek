const bcrypt = require('bcrypt')

const saltRounds = 10

async function hashPassword(jelszo) {
    return await bcrypt.hash(jelszo, saltRounds)
}

async function comparePassword(jelszo, hash) {
    return await bcrypt.compare(jelszo, hash)
    
}

module.exports = {
    hashPassword,
    comparePassword
}