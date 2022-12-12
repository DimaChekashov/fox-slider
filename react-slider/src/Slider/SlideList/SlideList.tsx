import { useContext } from "react";
import { SliderContext } from "../Slider";
import Slide from "./Slide/Slide";
import "./SlideList.scss";

const SlideList: React.FC = () => {
    const { slideNumber, items } = useContext(SliderContext);

    return (
        <div
            className="slide-list"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {items.map((slide: any, index: any) => (
                <Slide key={index} data={slide} />
            ))}
        </div>
    );
}

export default SlideList;