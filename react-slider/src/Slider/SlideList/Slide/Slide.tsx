import Image from "./Image/Image";
import Title from "./Title/Title";
import "./Slide.scss";

interface Props {
    data: {
        title: string;
        url: string;
    }
}

const Slide: React.FC<Props> = ({data: {title, url}}) => {
    return (
        <div className="slide">
            <Image src={url} alt={title} />
            <Title title={title} />
        </div>
    );
}

export default Slide;