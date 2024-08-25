import "./App.css";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Sol from "./components/sol";
import Eth from "./components/eth";
import { useState } from "react";
import Button from "./components/Buttun";

function App() {
  const options = [
    { value: 'Solana', label: 'Solana' },
    { value: 'Ethereum', label: 'Solana' },
  ];
  const [mnemonic, setMnemonic] = useState<string[]>(Array(12).fill(" "));
  const [seed, setSeed] = useState<Buffer>();

  async function onClickHandler() {
    const newMnemonic = generateMnemonic();
    const newSeed = mnemonicToSeedSync(newMnemonic);
    const words = newMnemonic.split(" ");
    setMnemonic(words);
    setSeed(newSeed);
  }

  return (
    <div className="  ">
      <div className="text-white">
      <div className="text-5xl font-bold mb-4">
        Multi Chain Wallet
      </div>
      <p className="border-b mb-2 font-medium text-m">A wallet to create accounts on multiple blockchains</p>
      </div>


      <button
        className="mb-5 bg-white p-2 rounded-lg text-sm"
        onClick={onClickHandler}
      >
        Get Mnemonics
      </button>
      {mnemonic.every((item) => item.trim() != "") ? (
        <div className="mb-5 bg-zinc-900 rounded-lg px-2 py-10">
          <div className="w-auto mx-100 grid grid-cols-4 gap-4">
            {mnemonic.map((word, index) => (
              <p
                key={index}
                className="p-4 bg-slate-200 rounded-md text-sm flex justify-center"
              >
                {word}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex justify-center">
      <Button onclick={()=>{
        //navigate to the wallet section now
      }}>Generate Wallet</Button>
      </div>
    </div>
  );
}

export default App;
