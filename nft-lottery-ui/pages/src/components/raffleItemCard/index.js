import Image from "next/image"
import { AiOutlineArrowRight } from "react-icons/ai"
function RaffleItemCard({ myLoader }) {
    return (
        <div className="col-12 col-lg-3 m-2 bg-light p-3">
            <div className="card">
                <Image
                    className="d-block w-100 img-fluid"
                    src="https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_620/hobo-handbag-yellow-wool-jersey-gold-tone-metal-wool-jersey-gold-tone-metal-packshot-artistique-vue1-as3690b09748nl710-9516413681694.jpg"
                    layout="responsive"
                    height="100%"
                    width="100%"
                    loader={myLoader}
                />
            </div>
            <div className="card-body px-2 overflow-hidden">
                <strong className="badge badge-success fs-6">Upcoming</strong>
                <h4 className="card-title py-2">HOBO HANDBAG</h4>
                <div className="row justify-items-center">
                    <div className="col-sm-12 col-md-6 card-subtitle">Tickets:</div>
                    <div className="col-sm-12 col-md-6 card-subtitle">Price:</div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <h5>
                    More details{" "}
                    <span className="p-2">
                        {" "}
                        <AiOutlineArrowRight type="button" />{" "}
                    </span>
                </h5>
            </div>
        </div>
    )
}

export default RaffleItemCard
