import { useWeb3Contract, useMoralis } from "react-moralis"
import { useState, useEffect } from "react"
import { abi, contractAddresses } from "../../../../../constants"
import { useNotification } from "web3uikit"

const LotteryButton = () => {
    const [recentWinner, setRecentWinner] = useState("0")
    const [numPlayer, setnumPlayer] = useState("0")
    const dispatch = useNotification()
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    console.log(contractAddresses[chainId])
    console.log(contractAddresses)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    console.log(`Raffle contract address : ${raffleAddress}`)

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: "10000000000000000", //eth
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        console.log("Updating UI ..")
        const entrenceFee = (await getEntranceFee()).toString()
        console.log(` Entrance Fee : ${entrenceFee}`)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
    }
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "transaction complete",
            title: "Tx transaction",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <span
            aria-disabled={!raffleAddress}
            type="button"
            onClick={async () => {
                await enterRaffle({
                    onSuccess: handleSuccess,
                    onerror: (error) => {
                        console.log(error)
                    },
                })
                console.log("clicked")
            }}
            className="badge badge-pill fs-5 p-2 w-100 badge-success text-white"
        >
            Connect Wallet
        </span>
    )
}

export default LotteryButton
