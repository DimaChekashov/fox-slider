export interface SliderContext {
    goToSlide: (position: number) => void;
    changeSlide: (direction: number) => void;
    slidesCount: number;
    slideNumber: number;
}

export interface Slide {
    index: number;
    slide: {
        title: string;
        url: string;
    };
}