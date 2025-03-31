require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

/**
 * Generate a new wallet
 */
app.get("/generate-wallet", async (req, res) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "xion" });
    const [account] = await wallet.getAccounts();
    res.json({ mnemonic: wallet.mnemonic, address: account.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get address from a provided mnemonic
 */
app.post("/get-address", async (req, res) => {
  try {
    const { mnemonic } = req.body;
    if (!mnemonic) return res.status(400).json({ error: "Mnemonic is required" });

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "xion" });
    const [account] = await wallet.getAccounts();
    res.json({ address: account.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get the wallet address from the backend's stored mnemonic
 */
app.get("/my-address", async (req, res) => {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, { prefix: "xion" });
    const [account] = await wallet.getAccounts();
    res.json({ address: account.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
