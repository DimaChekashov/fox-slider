import { createContext, useEffect, useState } from "react";
import Arrows from "./Arrows/Arrows";
import Dots from "./Dots/Dots";
import SlideList from "./SlideList/SlideList";
import { Slide, SliderContext as ISliderContext } from "./types";
import "./Slider.scss";

interface Props {
    autoPlay: boolean;
    autoPlayTime: number;
    width: "%" | "px";
    height: "%" | "px";
}

export const SliderContext = createContext<ISliderContext>({} as ISliderContext);

const Slider: React.FC<Props> = ({autoPlay, autoPlayTime, width, height}) => {
    const [items, setItems] = useState<Slide[]>([]);
    const [slide, setSlide] = useState<number>(0);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    useEffect(() => {
        setItems([
            {
                index: 1,
                slide: {
                    title: "accusamus beatae ad facilis cum similique qui sunt",
                    url: "https://via.placeholder.com/600/92c952"
                }
            },
            {
                index: 2,
                slide: {
                    title: "reprehenderit est deserunt velit ipsam",
                    url: "https://via.placeholder.com/600/771796"
                }
            },
            {
                index: 3,
                slide: {
                    title: "officia porro iure quia iusto qui ipsa ut modi",
                    url: "https://via.placeholder.com/600/24f355"
                }
            },
            {
                index: 4,
                slide: {
                    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
                    url: "https://via.placeholder.com/600/d32776"
                }
            },
        ]);
    }, []);

    const changeSlide = (direction: number = 1) => {
        const slideNumber: number = (slide + direction < 0) ? 
            items.length - 1 : (slide + direction) % items.length;

        setSlide(slideNumber);
    };

    const goToSlide = (position: number) => setSlide(position % items.length);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchPosition === null) return;

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