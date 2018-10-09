function SpecSlider(num, containerName) {
  this.num = num;
  this.containerName = containerName;
  this.container = document.getElementsByClassName(containerName)[num];
  this.containerTabs = document.getElementsByClassName(containerName)[num].children[1];
  this.containerImg = document.getElementsByClassName(containerName)[num].children[2];
  this.lastImg = document.getElementsByClassName(containerName)[num].children[3]
  this.loaded = (this.container.getAttribute('completed') === 'false' || this.container.getAttribute('completed') === null);
}

SpecSlider.prototype.genTabs = function(tab, img) {
  if(img.childElementCount >= 5) {
    var imgSize = 5;
  } else {
    var imgSize = img.childElementCount;
  }
  function createElem(index) {
    var widthElem = (240 - 10) / imgSize;
    var element = document.createElement('span');
    element.classList.add('img-tab');
    element.setAttribute('tab', index);
    element.style.width = widthElem + 'px'; 
    return element;
  }
  for(i = 0; i < imgSize; i++) {
    tab.appendChild(createElem(i));
  }
}

SpecSlider.prototype.hoverTabs = function(tab, img) {
  function mouseOver(e) {
    img.children[e.target.getAttribute('tab')].classList.add('img-hover');
  }
  function mouseOut(e) {
    img.children[e.target.getAttribute('tab')].classList.remove('img-hover');
  }
  tab.addEventListener( "mouseover", mouseOver);
  tab.addEventListener( "mouseout", mouseOut);
}

SpecSlider.prototype.getLastImg = function(tab, img, lastImg) {
  var sizeImg = img.childElementCount;
  lastImg.children[0].children[1].innerText = sizeImg - 5;
  if(sizeImg > 5) {
    function mouseOverLast() {
      lastImg.classList.add('show-last');
    }
    function mouseOutLast() {
      lastImg.classList.remove('show-last');
    }
    tab.children[4].addEventListener( "mouseover", mouseOverLast);
    tab.children[4].addEventListener( "mouseout", mouseOutLast);
  }
}

function specSlider() {
  var slidersCount = document.getElementsByClassName('main-img').length;
  var sliders = [];
  for(i = 0; i < slidersCount; i++) {
    sliders[i] = {
      slide: new SpecSlider(i, 'main-img'),
    };
  }
  sliders.map(function(item){
    if(item.slide.loaded) {
      item.slide.genTabs(item.slide.containerTabs, item.slide.containerImg);
      item.slide.hoverTabs(item.slide.containerTabs, item.slide.containerImg);
      item.slide.getLastImg(item.slide.containerTabs, item.slide.containerImg, item.slide.lastImg);
      item.slide.container.setAttribute('completed', true);
      item.slide.loaded = true;
    } else {
      return 0;
    }
  });
}

specSlider();