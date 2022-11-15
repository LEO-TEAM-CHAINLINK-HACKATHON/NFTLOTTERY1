import Image from "next/image"
import LotteryButton from "../entrenceButton/lotteryButton"
const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}
function Banner() {
    return (
        <div className="container overflow-hidden">
            <div className="row justify-content-center">
                <div className="col-lg-4 bg-light p-3">
                    <Image
                        className="d-block w-100 img-fluid"
                        src={
                            "https://images.ctfassets.net/x7j9qwvpvr5s/5NZiCJjSLwzWA7wdaVzJsM/0f79df9fa80aa87b872685d76cf991c7/Panigale-MY22-Overview-02-Grid-Imgtext-432x230.jpg"
                        }
                        layout="responsive"
                        loader={myLoader}
                        height={"100%"}
                        width={"100%"}
                    />
                </div>
                <div className="col-lg-6 bg-light p-3">
                    <div className="row gy-4 row-cols-2">
                        <div className="col-12">
                            <h3>Prize Name</h3>
                        </div>
                        <div className="col-12">
                            <strong>Description :</strong>
                            <p>
                                Superleggera (Italian for Superlight) is a custom tube and alloy
                                panel automobile coachwork construction technology developed by
                                Felice Bianchi Anderloni of Italian coachbuilder Carrozzeria
                                Touring Superleggera. A separate chassis was still required.
                            </p>
                        </div>
                    </div>
                    <div className="row gy-lg-5 row-cols-lg-2">
                        <div className="col-md-6">
                            <h3 className="badge badge-success fs-4 w-100">#Tickets</h3>
                        </div>
                        <div className="col-md-6">
                            <h3 className="badge badge-success fs-4 w-100">Price: 0,01 ETH</h3>
                        </div>
                        <div className="col-lg-12">
                            <LotteryButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
