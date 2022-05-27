import LotteryButton from "./lotteryButton";

const EntryButton = ({enterRaffle, getRecentWinner}) => {
    return (
        <LotteryButton enterRaffle={enterRaffle} getRecentWinner={getRecentWinner} />
    )
}

export default EntryButton;