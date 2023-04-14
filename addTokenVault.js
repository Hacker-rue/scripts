const {startGateway, addTokenVault} = require('./lib/FabricGateway')
const {readCertUser, readKeyUser} = require('./lib/utils')

async function main() {
    var _tokenName
    var _type
    if(process.argv[2]) _tokenName = process.argv[2]
    else throw Error("tokenName cannot be empty")
    if(process.argv[3]) {
        if(process.argv[3] == "1") {
            _type = "hl"
        } else if(process.argv[3] == "2") {
            _type = "ever"
        } else {
            throw Error("You have specified the wrong token type")
        }
    } else throw Error("type cannot be empty")

    const user = {
        userCert: await readCertUser(),
        userKey: await readKeyUser()
    }

    const gateway = await startGateway(user)
    const result = await addTokenVault(gateway, "mychannel", _tokenName, _type)

    console.log("Result: " + result)
}

main().catch(console.log)