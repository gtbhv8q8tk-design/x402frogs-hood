import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Mint x402frogs NFT for 1 USDC on Base"/>
        <meta property="og:title" content="x402frogs NFT"/>
        <meta property="og:description" content="Mint x402frogs collectible for 1 USDC"/>
        <meta property="og:image" content="https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png"/>
        <link rel="icon" href="https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
