import Image from "./Image/Image";
import Title from "./Title/Title";
import { Slide as ISlide } from "../../types";
import "./Slide.scss";

interface Props {
    data: ISlide;
    animation: boolean;
}

const Slide: React.FC<Props> = ({data: {slide: {title, url}}, animation}) => {
    return (
        <div className={`slide ${animation && 'fadeInAnimation'}`}>
            <Image src={url} alt={title} />
            <Title title={title} />
        </div>
    );
}

export default Slide;