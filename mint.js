const {enroll} = require('./lib/FabricCa')
const {mintToken, startGateway} = require('./lib/FabricGateway')

async function main() {
    const user = await enroll("user1", "user1pw")
    const gateway = await startGateway(user)
    const result = await mintToken(gateway, "mychannel", "HLTst2", 12345678900000000)
    console.log(Boolean(result))
}

main()