import howtoplay from "../public/raffle_house.svg"
import Image from "next/image"
const HowToPlay = (params) => {
    return (
        <div className="section">
            <div className="container">
                <h1 className="text-white">How To Play</h1>
            </div>
            <div className="container how-to-play h-100" style={{backgroundImage:"../public/raffle_house.svg", vheight:"100", width:"100%"}}>
                 
            </div>
        </div>
    )
}

export default HowToPlay;