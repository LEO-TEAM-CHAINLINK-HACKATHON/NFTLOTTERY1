
import FeatBanner from "./src/components/raffle/FeatBanner"
import RaffleItem from "./src/components/raffle/RaffleItem"
import {isWeb3Enabled} from "react-moralis"
 
const Waffles = () => {
    return (
        <div className="section waffle">
            <div className="container">
            <h1 className="text-center text-white m-3">Raffles</h1>
            </div>
           <FeatBanner isWeb3Enabled={isWeb3Enabled} />
           <RaffleItem />
        </div>
    )
}

export default Waffles