const {startGateway, initERC} = require('./lib/FabricGateway')
const { readCertUser, readKeyUser } = require('./lib/utils')

async function main() {
    var _contractName
    var _name = ""
    var _symbol
    var _decimals
    if(process.argv[2]) _contractName = process.argv[2]
    else throw Error("сontractName cannot be empty")
    if(process.argv[3]) {
        var split = process.argv[3].split('/')
        split.forEach((element) => {
            _name += element + " "
        })
        _name = _name.trim()
    }
    else throw Error("name cannot be empty")
    if(process.argv[4]) _symbol = process.argv[4]
    else throw Error("symbol cannot be empty")
    if(process.argv[5]) _decimals = process.argv[5]
    else throw Error("decimals cannot be empty")

    const user = {
        userCert: await readCertUser(),
        userKey: await readKeyUser()
    }

    const gateway = await startGateway(user)

    const result = await initERC(gateway, "mychannel", _contractName, _name, _symbol, _decimals)
    console.log("Result init: " + result)
}

main().catch(console.log)