import About from "./About"
import Banner from "./src/components/banner"
import CarouselItem from "./src/components/Carousel"
import Upcoming from "./Upcoming"

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}
const Home = () => {
    return (
        <div className="container d-flex flex-column justify-center mt-4">
            <div className="container text-center text-white p-3">
                <h1>Current Raffle</h1>
            </div>
            <Banner />
            <Upcoming myLoader={myLoader} />
            <About />
        </div>
    )
}

export default Home
