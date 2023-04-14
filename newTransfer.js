const {enroll} = require('./lib/FabricCa')
const {startGateway, transferToken, newTransfer} = require('./lib/FabricGateway')

const releId = "x509::/C=US/ST=North Carolina/O=Hyperledger/OU=admin/CN=org1admin::/C=US/ST=North Carolina/L=Durham/O=org1.example.com/CN=ca.org1.example.com"

const channel = "mychannel"
const tokenContract = "GTS"
const amount = 1000000000
const to = "0:4ffbcfe8c1a4e5ba6cbfb749d4804cc725fc60dd8e9963827e3852ed285f519c"

async function main() {
    var _tokenContract
    var _amount
    var _to
    if(process.argv[2]) _tokenContract = process.argv[2]
    else _tokenContract = tokenContract
    if(process.argv[3]) _amount = process.argv[3]
    else _amount = amount
    if(process.argv[4]) _to = process.argv[4]
    else _to = to
    const user = await enroll("user1", "user1pw")
    const gateway = await startGateway(user)
    const transactionTransfer = await transferToken(gateway, channel, _tokenContract, releId, _amount)

    console.log(transactionTransfer)
    const transactionNewTransfer = await newTransfer(gateway, channel, _to, _amount, _tokenContract, transactionTransfer, "", "test message")
    console.log(transactionNewTransfer)


}

main().catch(console.log)