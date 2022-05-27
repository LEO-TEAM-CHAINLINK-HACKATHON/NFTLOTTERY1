import { useWeb3Contract } from "react-moralis";
import abi from "../../../../../constants/abi.json"
import { useState } from "react";


const LotteryButton = ({enterRaffle}) => {
    
    const [recentWinner, setRecentWinner] = useState("0");
    const [numPlayer, setnumPlayer] = useState("0");

    
    // const {runContractFunction: enterRaffle} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress:CONTRACT_ADDRESS,
    //     functionName:"enterRaffle",
    //     msgValue:"100000000000000000", //eth
    //     params: {},
    // })
    // const {runContractFunction:} = useWeb3Contract({
    //     abi:"",
    //     contractAddress:CONTRACT_ADDRESS,
    //     functionName:"",
    //     params:{}
    // })

    // useEffect(() => {
    //   if (isWeb3Enabled)
    
    //   return () => {
    //     second
    //   }
    // }, [isWeb3Enabled])
    
    return (
        <span  
        type="button" 
        onClick={ async () => {
            await enterRaffle()
            console.log("clicked")
        }}
        className="badge badge-pill fs-5 m-2 badge-success text-dark">
         01 ETH
        </span>
    )
}

export default LotteryButton ;