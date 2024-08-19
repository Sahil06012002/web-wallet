import "./App.css";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Sol from "./components/sol";
import Eth from "./components/eth";
import { useState } from "react";
function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [seed, setSeed] = useState<Buffer>();

  async function onClickHandler() {
    const newMnemonic = generateMnemonic();
    const newSeed = mnemonicToSeedSync(newMnemonic);

    setMnemonic(newMnemonic);
    setSeed(newSeed);
  }

  return (
    <div className="text-center">
      <button className="my-5" onClick={onClickHandler}>
        Create Seed Phrase
      </button>
      <div>{mnemonic}</div>
      <div>{seed}</div>
      <div className="flex justify-around">
        <Sol seed={seed}></Sol>
        <Eth seed={seed}></Eth>
      </div>
    </div>
  );
}

export default App;
