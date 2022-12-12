import { useContext } from "react";
import { SliderContext } from "../Slider";
import "./Arrows.scss";

const Arrows: React.FC = () => {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="arrows">
            <div className="arrow left" onClick={() => changeSlide(-1)}>&lsaquo;</div>
            <div className="arrow right" onClick={() => changeSlide(1)}>&rsaquo;</div>
        </div>
    );
}

export default Arrows;