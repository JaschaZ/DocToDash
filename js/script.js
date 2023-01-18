/*
Observed Element Tracker, for JS to see what the viewer sees
*/

let animationStarted = false;
const observedElement = document.querySelector('.typewrite');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !animationStarted) {
    animationStarted = true;
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }
});
observer.observe(observedElement);

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    this.stop();
};

/*
Observed Element Tracker, for JS to see what the viewer sees
*/




/*
Contact Typing animation. Only plays once and only plays when the viewer sees it 
*/

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } 
    // Check if current loop is the last one
    if (this.loopNum === this.toRotate.length - 1) {
      this.isDeleting = false;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }
    setTimeout(function() {
    that.tick();
    }, delta);
};

/*
Contact Typing animation. Only plays once and only plays when the viewer sees it 
*/

/*
UP Arrow animation at the Bottom of the page. Works together with both html and css. hover over icon to make it interactive
*/

upInteractive = false;

function autoToggle() {
  $('.arrow').toggleClass('auto');
}

$('.arrow').hover(function() {
  upInteractive = true;
  $('.arrow').removeClass('auto');
});

setInterval(function(){ 
  
  console.log(upInteractive);
  
  if(upInteractive === false) {
    autoToggle();
  }

},2000);

/*
UP Arrow animation at the Bottom of the page. Works together with both html and css 
*/



