import Image from "next/image"
import bike from "../../../public/ducati.svg"
import art1 from "../../../public/bequiet1.svg"
import art2 from "../../../public/bequiet2.svg"
import art3 from "../../../public/iamGood1.svg"
import art4 from "../../../public/iamGood2.svg"
import art5 from "../../../public/stepper.svg"
import Carousel from "react-bootstrap/Carousel"
const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

const CarouselItem = () => {
    return (
        <div className="section mt-4">
            <div className="container">
                <div className="container-fluid">
                    <Carousel>
                        <Carousel.Item interval={1000}>
                            <div className="card w-1/3 h-auto p-5">
                                <Image
                                    priority
                                    alt="prize"
                                    layout="responsive"
                                    // objectFit="contain"
                                    // position="fixed"
                                    // objectPosition={"50% 50%"}
                                    className="d-block w-100"
                                    loader={myLoader}
                                    src={
                                        "https://images.ctfassets.net/x7j9qwvpvr5s/73GHbDWvYgnWXoGq6gy8ht/cb84c21b56d2e451d91acba49b6a77e9/Panigale-MY22-Accessoriate-17-Gallery-1920x1080.jpg"
                                    }
                                    height={"100%"}
                                    width={"100%"}
                                />
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5 className="text-center">Ducati Panigale V4</h5>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className="mh-50" interval={500}>
                            <Image
                                priority
                                position="fixed"
                                objectFit="contain"
                                objectPosition={"50% 50%"}
                                alt="prize"
                                className="d-block w-100 vh-25"
                                layout="responsive"
                                loader={myLoader}
                                src={
                                    "https://www.chanel.com/images//t_one///e_brightness:-3/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1920/large-classic-handbag-black-grained-calfskin-gold-tone-metal-grained-calfskin-gold-tone-metal-packshot-other-a58600y01864c3906-8855285235742.jpg"
                                }
                                height={"100%"}
                                width={"100%"}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                priority
                                alt="prize"
                                position="fixed"
                                objectFit="contain"
                                objectPosition={"50% 50%"}
                                className="d-block w-100 vh-25"
                                layout="responsive"
                                loader={myLoader}
                                src={art2}
                                height={"100%"}
                                width={"100%"}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                priority
                                alt="prize"
                                className="d-block w-100 mh-25"
                                layout="responsive"
                                position="fixed"
                                objectFit="contain"
                                objectPosition={"50% 50%"}
                                loader={myLoader}
                                src={art3}
                                height={"100%"}
                                width={"100%"}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                priority
                                alt="prize"
                                className="d-block w-100"
                                position="fixed"
                                objectFit="contain"
                                objectPosition={"50% 50%"}
                                layout="responsive"
                                loader={myLoader}
                                src={art4}
                                height={"100%"}
                                width={"100%"}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default CarouselItem
