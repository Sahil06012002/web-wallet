import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

interface prop{
    seed : Buffer
}

export default function SolWallet(prop : prop){
    // const [privateKey,setPrivateKey] = useState("");
    const [publicKey,setPublicKey] = useState("");
    const [count,setCount] = useState(0);
    function onClickHandler()
    {
        setCount(count +1)
        const path = `m/44'/501'/${count}'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, prop.seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const newPrivateKey = Keypair.fromSecretKey(secret).publicKey.toBase58()
        setPublicKey(newPrivateKey)
        console.log();
    }
    
    return <div>
        <button onClick={onClickHandler}>Add Solana Wallet</button>
        <div>{publicKey}</div>
    </div>
}

