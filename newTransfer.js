const {enroll} = require('./lib/FabricCa')
const {startGateway, transferToken, newTransfer} = require('./lib/FabricGateway')

const releId = "x509::/C=US/ST=North Carolina/O=Hyperledger/OU=admin/CN=org1admin::/C=US/ST=North Carolina/L=Durham/O=org1.example.com/CN=ca.org1.example.com"

const channel = "mychannel"
const tokenContract = "HLTst2"
const amount = 123456789000
const to = "0:e0ba35748c663038889e73d7a25d772092847d910970b8c04ea70adb1a6895a9"

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
    const transactionNewTransfer = await newTransfer(gateway, channel, _to, _amount, _tokenContract, transactionTransfer)
    console.log(transactionNewTransfer)
}

main()