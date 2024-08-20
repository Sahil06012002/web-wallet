import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";

interface prop {
  seed: Buffer | undefined;
}
interface keys {
  privateKey: Uint8Array;
  publicKey: string;
}

export default function SolWallet(prop: prop) {
  console.log(prop.seed);
  // const [privateKey,setPrivateKey] = useState("");
  const [keys, setKeys] = useState<keys[]>([]);
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  function onClickHandler() {
    setCount(count + 1);
    const path = `m/44'/501'/${count}'/0'`;
    if (prop.seed) {
      const derivedSeed = derivePath(path, prop.seed.toString("hex")).key;
      const newPrivateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const newPublicKey =
        Keypair.fromSecretKey(newPrivateKey).publicKey.toBase58();
      const newKeyPair: keys = {
        privateKey: newPrivateKey,
        publicKey: newPublicKey,
      };
      setKeys((prevKeys) => [...prevKeys, newKeyPair]);
      setPublicKey([...publicKey, newPublicKey]);
    }
  }

  return (
    <div className="h-100 w-1/3 bg-slate-200 p-5 rounded-2xl">
      <button
        className="my-5 bg-yellow-500 p-3 rounded-xl font-serif text-xl"
        onClick={onClickHandler}
      >
        Generate Solana Wallet
      </button>
      <div className="text-left">
        {keys.map((keyPair, index) => (
          <div className="bg-gray-300 p-4 rounded-xl my-2" key={index}>
            <p className="font-bold">Wallet {index + 1}: </p>
            <p className="m-2">Public Key: </p>
            <input
              type="text"
              className="w-full p-2 rounded-lg"
              value={keyPair.publicKey}
            />
            <p className="m-2">Private Key: </p>
            <input
              type="text"
              className="w-full p-2 rounded-lg"
              value={bs58.encode(keyPair.privateKey)}
            />
            {/* <p>Private Key: {Array.from(keyPair.privateKey).toString()}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
