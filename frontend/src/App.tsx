import "./App.css";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Sol from "./components/sol";
import Eth from "./components/eth";
import { useState } from "react";

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
      <p className="border-b mb-2">A wallet to create accounts on multiple blockchains</p>
      </div>


      <button
        className="mb-5 bg-white p-2 rounded-lg text-sm"
        onClick={onClickHandler}
      >
        Get Mnemonics
      </button>
      {/* {mnemonic.every((item) => item.trim() != "") ? (
        <div className="mb-5 bg-white rounded-lg p-2">
          <div className="w-auto mx-10 grid grid-cols-4 gap-4">
            {mnemonic.map((word, index) => (
              <p
                key={index}
                className="p-4 bg-slate-200 rounded-xl text-sm"
              >
                {word}
              </p>
            ))}
          </div>
        </div>
      ) : null} */}

      <div className="flex justify-around">
        <Sol seed={seed}></Sol>
        <Eth seed={seed}></Eth>
      </div>
    </div>
  );
}

export default App;
