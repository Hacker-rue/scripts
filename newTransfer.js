const {enroll} = require('./lib/FabricCa')
const {startGateway, transferToken, newTransfer} = require('./lib/FabricGateway')

const releId = "x509::/C=US/ST=North Carolina/O=Hyperledger/OU=admin/CN=org1admin::/C=US/ST=North Carolina/L=Durham/O=org1.example.com/CN=ca.org1.example.com"

async function main() {
    const user = await enroll("user1", "user1pw")
    const gateway = await startGateway(user)
    const transactionTransfer = await transferToken(gateway, "mychannel", "HLTst2", releId, 123456789000)
    const transactionNewTransfer = await newTransfer(gateway, "mychannel", "0:e0ba35748c663038889e73d7a25d772092847d910970b8c04ea70adb1a6895a9", 123456789000, "HLTst2", transactionTransfer)
    console.log(transactionNewTransfer)
}

main()