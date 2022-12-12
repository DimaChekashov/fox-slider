export interface SliderContext {
    goToSlide: (position: number) => void;
    changeSlide: (direction: number) => void;
    slidesCount: number;
    slideNumber: number;
    items: any;
}

export interface Slide {
    index: number;
    slide: {
        title: string;
        url: string;
    };
}