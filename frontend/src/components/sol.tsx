import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

interface prop{
    seed : Buffer | undefined
}
interface keys{
    privateKey : string,
    publickey : string
}

export default function SolWallet(prop : prop){
    console.log(prop.seed)
    // const [privateKey,setPrivateKey] = useState("");
    const [keys,setKeys] = useState<keys[]>([]);
    const [publicKey,setPublicKey] = useState<string[]>([]);
    const [count,setCount] = useState(0);
    function onClickHandler()
    {
        setCount(count +1)
        const path = `m/44'/501'/${count}'/0'`;
        if(prop.seed)
        {
            const derivedSeed = derivePath(path, prop.seed.toString("hex")).key;
            const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const newPublicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58()
            keys.
            setKeys([...keys,(privateKey,publicKey)])
            setPublicKey([...publicKey,newPublicKey ])
        }
        
    }
    
    return <div>
        <button onClick={onClickHandler}>Add Solana Wallet</button>
        <div>{publicKey}</div>
    </div>
}

