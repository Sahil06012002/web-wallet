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
    <div className="h-100 w-1/3 bg-slate-200 p-5 rounded-2xl">
      <button
        className="my-5 bg-yellow-500 p-3 rounded-xl font-serif text-xl"
        onClick={onClickHandler}
      >
        Generate Etherium Wallet
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
              value={keyPair.privateKey}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
