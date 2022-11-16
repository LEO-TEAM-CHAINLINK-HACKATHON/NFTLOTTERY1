import { useWeb3Contract, useMoralis } from "react-moralis"
import { useState, useEffect } from "react"
import { abi, contractAddresses } from "../../../../../constants"

const LotteryButton = () => {
    const [recentWinner, setRecentWinner] = useState("0")
    const [numPlayer, setnumPlayer] = useState("0")
    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdhex)
    console.log(chainId)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    console.log(raffleAddress.toString())

    // const { runContractFunction: enterRaffle } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddresses,
    //     functionName: "enterRaffle",
    //     params: {},
    //     msgValue: "100000000000000000", //eth
    // })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    async function updateUI() {
        const something = (await getEntranceFee()).toString()
        console.log(something)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <span
            type="button"
            onClick={async () => {
                await enterRaffle()
                console.log("clicked")
            }}
            className="badge badge-pill fs-5 p-2 w-100 badge-success text-white"
        >
            Connect Wallet
        </span>
    )
}

export default LotteryButton
