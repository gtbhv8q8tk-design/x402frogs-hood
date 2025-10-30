import { useState, useEffect } from "react";
export default function Home() {
  const [endpoint,setEndpoint]=useState("");
  useEffect(()=>{ const host=typeof window!=="undefined"?window.location.host:""; setEndpoint(`https://${host}/api/mint?id=1`);},[]);
  return (
    <main style={{maxWidth:860,margin:"40px auto",padding:16,fontFamily:"sans-serif"}}>
      <h1>x402frogs — hood</h1>
      <p>Mint NFT for 1 USDC on Base (ERC-1155, mintFor)</p>
      <div style={{border:"1px solid #eee",borderRadius:8,padding:16,marginTop:16}}>
        <h3>x402frogs #1</h3>
        <img src="https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png" alt="nft" width={220}/>
        <p>Price: <b>1 USDC</b></p>
        <p>Chain: <b>Base (8453)</b></p>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{navigator.clipboard.writeText(endpoint); alert("Endpoint copied!");}}>Copy x402 endpoint</button>
          <a href={`https://x402scan.com/developer?endpoint=${encodeURIComponent(endpoint)}`} target="_blank" rel="noreferrer">
            <button>Open in x402scan</button>
          </a>
        </div>
        <p style={{marginTop:12,fontSize:12,color:"#666"}}>x402 endpoint: {endpoint}</p>
      </div>
    </main>
  );
}
