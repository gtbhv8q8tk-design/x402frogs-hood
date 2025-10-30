import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET","POST"]);
    return res.status(405).json({ x402Version: 1, status:"error", error:"Method not allowed" });
  }
  const host = req.headers.host;
  const publicUrl = process.env.PUBLIC_URL || (host ? `https://${host}` : "");
  const payload = {
    x402Version: 1,
    type: "x402",
    chainId: 8453,
    id: "offer-1",
    payment: {
      currency: "USDC",
      tokenAddress: process.env.USDC_ADDRESS,
      amount: 1,
      receiver: process.env.TREASURY
    },
    resource: `${publicUrl}/api/mint?id=1`,
    metadata: {
      name: "x402frogs #1",
      description: "Mint x402frogs collectible for 1 USDC",
      image: "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png"
    }
  };
  return res.status(402).json(payload);
}
