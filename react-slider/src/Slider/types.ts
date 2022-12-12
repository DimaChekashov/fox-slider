export interface SliderContext {
    goToSlide: (position: number) => void;
    changeSlide: (direction: number) => void;
    slidesCount: number;
    slideNumber: number;
    items: any;
}