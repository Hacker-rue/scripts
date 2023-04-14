const fs = require('fs/promises')

module.exports = {
    readCertUser,
    readKeyUser
}

async function readCertUser() {
    const credentials = await fs.readFile(__dirname + "/../user/cert.pem")
    return credentials.toString()
}

async function readKeyUser() {
    const key = await fs.readFile(__dirname + "/../user/key.pem")
    return key.toString()
}