window.onload = function() {

    var slider1 = new TestSlider({
        sliderImg: '#slider-1 img',
        prev: '#slider-1 .test-slider__prev',
        next: '#slider-1 .test-slider__next',
        auto: false,
        timeFlip: 5000
    });

}

function TestSlider(args) {
    this.sliderImg = args['sliderImg'];
    this.btnPrev = args['prev'];
    this.btnNext = args['next'];
    this.auto = args['auto'];
    this.timeFlip = args['timeFlip'];
    var imgCount = 0;

    var sliderImgArr = getElements(this.sliderImg);

    getElement(this.btnPrev).onclick = function() {
        sliderImgArr[imgCount].classList.remove('img-show');

        imgCount--;

        if (imgCount < 0) {
            imgCount = sliderImgArr.length - 1;
        }

        sliderImgArr[imgCount].classList.add('img-show');
    }

    getElement(this.btnNext).onclick = function() {
        sliderImgArr[imgCount].classList.remove('img-show');

        imgCount++;

        if (imgCount > sliderImgArr.length - 1) {
            imgCount = 0;
        }

        sliderImgArr[imgCount].classList.add('img-show');
    }

    if (this.auto == true) {
        setInterval(function() {
            sliderImgArr[imgCount].classList.remove('img-show');
    
            imgCount++;
    
            if (imgCount > sliderImgArr.length - 1) {
                imgCount = 0;
            }
    
            sliderImgArr[imgCount].classList.add('img-show');
        }, this.timeFlip)
    }

}

function getElement(elem) {
    return document.querySelector(elem);
}

function getElements(elem) {
    return document.querySelectorAll(elem);
}