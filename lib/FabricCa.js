const FabricCaServices = require("fabric-ca-client")
const config = require('./../config/connection-org1.json')
var certificateAuthorities = config.certificateAuthorities[reqName(config.certificateAuthorities)]

const caClient = new FabricCaServices(certificateAuthorities.url, {
    trustedRoots: certificateAuthorities.tlsCACerts.pem[0],
    verify: certificateAuthorities.httpOptions.verify
}, certificateAuthorities.caName)

async function enroll(login, password) {
    const user = await caClient.enroll({
        enrollmentID: login,
        enrollmentSecret: password
    })

    return {
        userCert: user.certificate,
        userKey: user.key.toBytes()
    }
}

function reqName(obj) {
    for(var x in obj) {
        if(x) {
            return x
        }
    }
    return undefined
}

module.exports = {
    enroll
}