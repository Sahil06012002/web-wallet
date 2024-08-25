import Eth from "../components/eth";
import Sol from "../components/sol";

export default function Wallet(seed : Buffer | undefined) {
    return <div>
        <div className="flex justify-around">
        <Sol seed={seed}></Sol>
        <Eth seed={seed}></Eth>
      </div>
    </div>
}