import { useContext } from "react";
import { SliderContext } from "../../Slider";
import "./Dot.scss";

interface Props {
    position: number;
}

const Dot: React.FC<Props> = ({position}) => {
    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div 
            className={`dot ${slideNumber === position ? "selected" : ""}`} 
            onClick={() => goToSlide(position)}
        />
    );
}

export default Dot;