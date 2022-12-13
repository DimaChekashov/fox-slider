import { createContext, useEffect, useState } from "react";
import Arrows from "./Arrows/Arrows";
import Dots from "./Dots/Dots";
import { Slide, SliderContext as ISliderContext } from "./types";
import SlideComponent from "./SlideList/Slide/Slide";
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
    const [animation, setAnimation] = useState<boolean>(true);

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

    const preloadImages = () => {
        const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
        const nextItemIndex = (slide + 1) % items.length;

        new Image().src = items[slide].slide.url;
        new Image().src = items[prevItemIndex].slide.url;
        new Image().src = items[nextItemIndex].slide.url;
    }

    useEffect(() => {
        if (items.length) preloadImages();
    }, [slide, items]);

    const changeSlide = (direction: number = 1) => {
        setAnimation(false);
        const slideNumber: number = (slide + direction < 0) ? 
            items.length - 1 : (slide + direction) % items.length;


        setSlide(slideNumber);

        const timeout = setTimeout(() => {
            setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

    const goToSlide = (position: number) => {
        setAnimation(false);
        setSlide(position % items.length);

        const timeout = setTimeout(() => {
           setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

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
        <div style={{ width, height }} className="slider">
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                }}
            >
                <Arrows />
                {
                items.length ? (
                    <SlideComponent data={items[slide]} animation={animation} />
                ) : null
                }
                <Dots />
            </SliderContext.Provider>
        </div>
    )
}

export default Slider;