import RaffleItemCard from "./src/components/raffleItemCard"

function Upcoming({ myLoader }) {
    return (
        <div className="container-fluid my-4">
            <div className="container text-center">
                <h1 className="text-white">Upcoming Raffles</h1>
            </div>
            <div className="container">
                <div className="row place-content-center">
                    <RaffleItemCard myLoader={myLoader} />
                    {/* <RaffleItemCard myLoader={myLoader} />
                    <RaffleItemCard myLoader={myLoader} />
                    <RaffleItemCard myLoader={myLoader} /> */}
                </div>
            </div>
        </div>
    )
}

export default Upcoming
