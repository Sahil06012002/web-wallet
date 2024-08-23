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
  balance: string;
}
let requestId = 1;
async function getBalance(publicKey: string) {
  if (!publicKey) {
    throw new Error("Public key is required");
  }

  try {
    // Prepare the JSON-RPC request payload
    const data = {
      jsonrpc: "2.0",
      method: "getBalance",
      params: [publicKey],
      id: requestId++,
    };

    // Make the POST request using fetch
    const response = await fetch(
      "https://solana-mainnet.g.alchemy.com/v2/Fy7-AJcLNx-Zxv0y20gggD5pIs0yAfZy",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error.message);
    }

    // Convert balance from lamport to sol
    const balanceInLamports = result.result.value;
    const balanceInSol = balanceInLamports / 1e9;

    return balanceInSol.toFixed(4).toString() + " SOL";
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

export default function SolWallet(prop: prop) {
  console.log(prop.seed);
  // const [privateKey,setPrivateKey] = useState("");
  const [keys, setKeys] = useState<keys[]>([]);
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  async function onClickHandler() {
    setCount(count + 1);
    const path = `m/44'/501'/${count}'/0'`;
    if (prop.seed) {
      const derivedSeed = derivePath(path, prop.seed.toString("hex")).key;
      const newPrivateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const newPublicKey =
        Keypair.fromSecretKey(newPrivateKey).publicKey.toBase58();
      setPublicKey([...publicKey, newPublicKey]);
      try {
        const balance = await getBalance(newPublicKey);
        const newKeyPair: keys = {
          privateKey: newPrivateKey,
          publicKey: newPublicKey,
          balance,
        };
        setKeys((prevKeys) => [...prevKeys, newKeyPair]);
      } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
      }
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
            <p className="m-2 font-bold">Current Balance: {keyPair.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
