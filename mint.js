const {enroll} = require('./lib/FabricCa')
const {mintToken, startGateway} = require('./lib/FabricGateway')

const channel = "mychannel"
const tokenContract = "HLTst2"
const amount = 12345678900000000

async function main() {
    var _tokenContract
    var _amount
    if(process.argv[2]) _tokenContract = process.argv[2]
    else _tokenContract = tokenContract
    if(process.argv[3]) _amount = process.argv[3]
    else _amount = amount
    const user = await enroll("user1", "user1pw")
    const gateway = await startGateway(user)
    const result = await mintToken(gateway, "mychannel", _tokenContract, _amount)
    console.log(Boolean(result))
}

main()