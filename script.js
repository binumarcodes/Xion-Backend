const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");

async function generateMnemonic() {
    const wallet = await DirectSecp256k1HdWallet.generate(24);
    console.log("Your Mnemonic:", wallet.mnemonic);
}

generateMnemonic();