import Image from "next/image";
import { useWeb3Contract } from "react-moralis";
import abi from "../../../../constants/abi.json"
import moto from "../../../../public/ducati.svg";
import EntryButton from "../entrenceButton";

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const FeatBanner = () => { 
    // enter raffle 
    const {runContractFunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress:CONTRACT_ADDRESS,
        functionName:"enterRaffle",
        msgValue:"100000000000000000", //eth
        params: {},
    })

    // view functions

    const {runContractFunction:getPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress:CONTRACT_ADDRESS,
        functionName:"s_recentWinner",
        params:{},
        
    })
    

    return (
        <div className="container bg-light">
        <div className="row p-4">
            <div className="col-lg-6 bg-dark">
                <div className="container-fluid">

                <Image 
                src={moto} 
                alt="prize" 
                height={1000} 
                layout="responsive" 
                width={1200} 
                loader={myLoader}
                priority 
                />
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <h4>Featured Raffle</h4>
                <h1>Ducati SuperLeggera</h1>
                <p>
                    Superleggera (Italian for Superlight) is a custom tube and alloy panel automobile coachwork construction technology developed by Felice Bianchi Anderloni of Italian coachbuilder Carrozzeria Touring Superleggera. A separate chassis was still required.
                </p>
                <div className=" d-flex justif-content-around flex-column flex-wrap">

                    <span className="badge badge-pill fs-5 m-2 badge-success text-dark">Tickets: 300
                    </span>
                    <EntryButton 
                       onClick={ async () => {
                        await enterRaffle()
                        console.log("clicked")
                    }}
                    getPlayers={getPlayers}
                     enterRaffle={enterRaffle} />
                    <span className="badge badge-pill fs-5 m-2  badge-raffle text-dark">Raffle House price: 50%
                    </span>
                </div>
            </div>
        </div>

    </div>
    )
 }

export default FeatBanner;