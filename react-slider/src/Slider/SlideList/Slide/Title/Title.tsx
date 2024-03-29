import "./Title.scss";

interface Props {
    title: string;
}

const Title: React.FC<Props> = ({title}) => <div className="slide-title">{title}</div>;

export default Title;