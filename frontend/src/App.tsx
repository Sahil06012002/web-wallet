import "./App.css";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Sol from "./components/sol";
import Eth from "./components/eth";
import { useState } from "react";

function App() {
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
    <div className="w-full min-h-screen text-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <button
        className="my-5 bg-white p-3 rounded-xl font-serif text-xl"
        onClick={onClickHandler}
      >
        Generate Mnemonics
      </button>

      {mnemonic.every((item) => item.trim() != "") ? (
        <div className=" bg-white rounded-lg m-4 p-4">
          <div className="w-auto mx-10 grid grid-cols-4 gap-4">
            {mnemonic.map((word, index) => (
              <p
                key={index}
                className="p-4 bg-slate-200 rounded-xl text-lg font-serif"
              >
                {word}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex justify-around">
        <Sol seed={seed}></Sol>
        <Eth seed={seed}></Eth>
      </div>
    </div>
  );
}

export default App;
