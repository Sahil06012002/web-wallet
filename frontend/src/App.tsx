import './App.css'
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Sol from './components/sol';
import Eth from './components/eth';
import { useState } from 'react';
function App() {

  const [mnemonic, setMnemonic] = useState("");
  const [seed, setSeed] = useState<Buffer>();

  async function onClickHandler() {
    const newMnemonic = await generateMnemonic()
    const newSeed = mnemonicToSeedSync(newMnemonic)

    setMnemonic(newMnemonic);
    setSeed(newSeed);
  }

  return <div className='text-center'>
    <button onClick={onClickHandler}>Create Seed Phrase</button>
    <div>
    {mnemonic}
    </div>
    <div>
    {seed}
    </div>
    <div className='flex'>
    <Sol seed={seed} ></Sol>
    <Eth></Eth>
    </div>

  </div>
}

export default App
