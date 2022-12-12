import "./Image.scss";

interface Props {
    src: string;
    alt: string;
}

const Image: React.FC<Props> = ({src, alt}) => <img src={src} alt={alt} className="slide-image" />;

export default Image;