require("dotenv").config();
const { ethers } = require("ethers");
const { isTxProcessed, recordTx } = require("../../lib/sales");

const ERC20_ABI = ["event Transfer(address indexed from,address indexed to,uint256 value)"];

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ x402Version:1,id:"offer-1",status:"error",error:"Method not allowed"});
    }
    const { txHash, buyer } = req.body || {};
    if (!txHash || !buyer) {
      return res.status(400).json({ x402Version:1,id:"offer-1",status:"error",error:"txHash and buyer required"});
    }
    if (isTxProcessed(txHash)) {
      return res.status(409).json({ x402Version:1,id:"offer-1",status:"error",error:"Transaction already processed"});
    }
    const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC);
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) return res.status(400).json({ x402Version:1,id:"offer-1",status:"error",error:"Transaction not found"});
    const USDC=(process.env.USDC_ADDRESS||"").toLowerCase();
    const TREASURY=(process.env.TREASURY||"").toLowerCase();
    const iface=new ethers.utils.Interface(ERC20_ABI);
    const ONE_USDC=ethers.BigNumber.from(10).pow(6);
    let paid=false;
    for (const log of receipt.logs||[]) {
      if ((log.address||"").toLowerCase()===USDC) {
        try {
          const parsed=iface.parseLog(log);
          if (parsed?.name==="Transfer") {
            const to=String(parsed.args[1]||"").toLowerCase();
            const value=parsed.args[2];
            if (to===TREASURY && value.gte(ONE_USDC)) { paid=true; break; }
          }
        } catch {}
      }
    }
    if (!paid) return res.status(402).json({ x402Version:1,id:"offer-1",status:"error",error:"Payment not detected"});
    const signer=new ethers.Wallet(String(process.env.PRIVATE_KEY),provider);
    const collection=new ethers.Contract(String(process.env.COLLECTION_ADDRESS),["function mintFor(address to,uint256 id,uint256 amount,bytes data) external"],signer);
    const mintTx=await collection.mintFor(String(buyer),1,1,"0x");
    const mined=await mintTx.wait();
    recordTx(txHash);
    return res.status(200).json({ x402Version:1,id:"offer-1",status:"success",mintTx:mined.transactionHash});
  } catch(err) {
    return res.status(500).json({ x402Version:1,id:"offer-1",status:"error",error:err.message});
  }
};
