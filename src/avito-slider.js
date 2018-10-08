function SpecSlider(num, containerName) {
  this.num = num;
  this.containerName = containerName;
  this.container = document.getElementsByClassName(containerName);
  this.containerTabs = document.getElementsByClassName(containerName)[num].children[1];
  this.containerImg = document.getElementsByClassName(containerName)[num].children[2];
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


function specSlider() {
  var slidersCount = document.getElementsByClassName('main-img').length;
  var sliders = [];
  for(i = 0; i < slidersCount; i++) {
    sliders[i] = {
      slide: new SpecSlider(i, 'main-img'),
    };
  }
  sliders.map(function(item){
    item.slide.genTabs(item.slide.containerTabs, item.slide.containerImg);
    item.slide.hoverTabs(item.slide.containerTabs, item.slide.containerImg);
  });
}

specSlider();