import { createContext, useEffect, useState } from "react";
import "Slider.scss";
import Arrows from "./Arrows/Arrows";
import Dots from "./Dots/Dots";
import SlideList from "./SlideList/SlideList";
import { SliderContext as ISliderContext } from "./types";

interface Props {
    autoPlay: boolean;
    autoPlayTime: number;
    width: "%" | "px";
    height: "%" | "px";
}

export const SliderContext = createContext<ISliderContext>({} as ISliderContext);

const Slider: React.FC<Props> = ({autoPlay, autoPlayTime, width, height}) => {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const images = await getImages();
            setItems(images);
        };
        loadData();
    }, []);

    const changeSlide = (direction: number = 1) => {
        const slideNumber: number = (slide + direction < 0) ? 
            items.length - 1 : (slide + direction) % items.length;

        setSlide(slideNumber);
    };

    const goToSlide = (position: number) => setSlide(position % items.length);

    const handleTouchStart = (e: any) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e: any) => {
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    }

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide]);

    
    return (
        <div
            style={{ width, height }}
            className="slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
        <SliderContext.Provider
            value={{
                goToSlide,
                changeSlide,
                slidesCount: items.length,
                slideNumber: slide,
                items,
            }}
        >
            <Arrows />
            <SlideList />
            <Dots />
        </SliderContext.Provider>
        </div>
    )
}

export default Slider;