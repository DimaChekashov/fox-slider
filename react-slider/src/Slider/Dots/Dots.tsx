import { useContext } from "react";
import { SliderContext } from "../Slider";
import Dot from "./Dot/Dot";
import "./Dots.scss";

const Dots: React.FC = () => {
    const { slidesCount } = useContext(SliderContext);

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < slidesCount; i++) {
            dots.push(<Dot key={`dot-${i}`} position={i} />);
        }
        return dots;
    };

    return <div className="dots">{renderDots()}</div>;
}

export default Dots;