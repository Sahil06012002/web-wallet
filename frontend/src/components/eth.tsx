// import { Keypair } from "@solana/web3.js";
// import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { Wallet, HDNodeWallet } from "ethers";
// import nacl from "tweetnacl";

interface prop {
  seed: Buffer | undefined;
}
interface keys {
  privateKey: string;
  publicKey: string;
}

export default function EthWallet(prop: prop) {
  console.log(prop.seed);
  //   const [privateKey, setPrivateKey] = useState("");
  const [keys, setKeys] = useState<keys[]>([]);
  //   const [publicKey, setPublicKey] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  function onClickHandler() {
    setCount(count + 1);
    const derivationPath = `m/44'/60'/${count}'/0'`;
    if (prop.seed) {
      const hdNode = HDNodeWallet.fromSeed(prop.seed);
      const child = hdNode.derivePath(derivationPath);
      const newPrivateKey = child.privateKey;
      //   setPrivateKey(newPrivateKey);
      const wallet = new Wallet(newPrivateKey);
      setAddresses([...addresses, wallet.address]);
      //   setPublicKey([wallet.address]);
      const newKeyPair: keys = {
        privateKey: newPrivateKey,
        publicKey: wallet.address,
      };
      setKeys((prevKeys) => [...prevKeys, newKeyPair]);
    }
  }

  return (
    <div className="h100 w-100 border-black">
      <button onClick={onClickHandler}>Add Etherium Wallet</button>
      <div>
        {keys.map((keyPair, index) => (
          <div key={index}>
            <p>Public Key: {keyPair.publicKey}</p>
            <p>Private Key: {Array.from(keyPair.privateKey).toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
