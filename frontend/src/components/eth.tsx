// import { Keypair } from "@solana/web3.js";
// import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { Wallet, HDNodeWallet } from "ethers";

interface prop {
  seed: Buffer | undefined;
}
interface keys {
  privateKey: string;
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
      method: "eth_getBalance",
      params: [publicKey, "latest"],
      id: requestId++,
    };

    // Make the POST request using fetch
    const response = await fetch(
      "https://eth-mainnet.g.alchemy.com/v2/Fy7-AJcLNx-Zxv0y20gggD5pIs0yAfZy",
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

    // Convert balance from Wei to Ether
    const balanceInWei = BigInt(result.result);
    const balanceInEther = balanceInWei / BigInt(10 ** 18);

    return balanceInEther.toString() + " ETH";
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

export default function EthWallet(prop: prop) {
  console.log(prop.seed);
  //   const [privateKey, setPrivateKey] = useState("");
  const [keys, setKeys] = useState<keys[]>([]);
  //   const [publicKey, setPublicKey] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  async function onClickHandler() {
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
      try {
        const balance = await getBalance(wallet.address);
        const newKeyPair: keys = {
          privateKey: newPrivateKey,
          publicKey: wallet.address,
          balance,
        };
        setKeys((prevKeys) => [...prevKeys, newKeyPair]);
      } catch (error) {
        console.error("Error updating balance:", error);
      }
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
              readOnly
            />
            <p className="m-2">Private Key: </p>
            <input
              type="text"
              className="w-full p-2 rounded-lg"
              value={keyPair.privateKey}
              readOnly
            />
            <p className="m-2 font-bold">Current Balance: {keyPair.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
