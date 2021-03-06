
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame
    || function (fn) { setTimeout(fn, 1000 / 60); };


var slide=function(){
  var ele=document.getElementById("optionslide");
  if(ele.clientHeight==205){
    ele.style.height='0px'
  }
  else{
    ele.style.height='205px'
  }
}

var elWrapper = document.getElementById("wrapper");
var elContact = document.getElementById("contact");
var bodyWidth = 999999;
window.onresize = function () {
    var currentWidth = document.body.offsetWidth;
    if (((bodyWidth == 999999) || (bodyWidth > 460)) && (currentWidth <= 460)) {
        elContact.innerHTML = elContact.innerHTML.replace(/，/g, "<br>");
    }
    else if ((bodyWidth <= 460) && (currentWidth > 460)) {
        elContact.innerHTML = elContact.innerHTML.replace(/<br>/g, "，");
    }
    bodyWidth = currentWidth;

    elWrapper.style.top = (document.body.offsetHeight - elWrapper.offsetHeight - 60) / 2 + 60 + "px";
};

var inityScrollY;
var timeInstance;
var isAnimate1 = false;
window.onscroll=function(){
    var scrollTop = window.scrollY;
    var briefIntroHeight = document.getElementById('brief-intro').clientHeight;
    var realIntroHeight = document.getElementById('real-intro').clientHeight;
    var detailHeight = document.getElementById('detail').clientHeight;
    var contactHeight = document.getElementById('contact');
    if (!isAnimate1 && (scrollTop>=100)) {
        isAnimate1 = true;
        document.getElementById('left').classList.add('fadeInLeft');
        document.getElementById('right').classList.add('fadeInRight');
    }

    if (timeInstance) {
        clearTimeout(timeInstance);
    }
    timeInstance = setTimeout(function () {
        if(scrollTop>inityScrollY){
            document.getElementsByClassName('navbar')[0].classList.remove('fadeInDown');
            document.getElementsByClassName('navbar')[0].classList.add('fadeOutUp');
        }else if(scrollTop<inityScrollY){
            if (document.getElementsByClassName('navbar')[0].classList.contains('fadeOutUp')) {
                document.getElementsByClassName('navbar')[0].classList.remove('fadeOutUp');
                document.getElementsByClassName('navbar')[0].classList.add('fadeInDown');
            }
        }
        timeInstance = undefined;
        inityScrollY = scrollTop;
    }, 100);

    if (briefIntroHeight+realIntroHeight+100<document.body.clientHeight+scrollTop) {
        document.getElementById('date').classList.add('fadeInUp');
        setTimeout(function(){
            document.getElementById('place').classList.add('fadeInUp');
        },300);
        setTimeout(function(){
            document.getElementById('people').classList.add('fadeInUp');
        },600);
        setTimeout(function(){
            document.getElementById('prize').classList.add('fadeInUp');
        },900);
    }
}
function scrollToEx(x,y){
    var scrollLeft = window.scrollX;
    var scrollTop = window.scrollY;
    var stepLeft = (x - scrollLeft > 0) ? 30 : -30;
    var stepTop = (y - scrollTop > 0) ? 30 : -30;
    var isEndLeft = false;
    var isEndTop = false;

    function scroll() {
        scrollLeft += stepLeft;
        if ((x - scrollLeft) * stepLeft < 0) {
            scrollLeft = x;
            isEndLeft = true;
        }

        scrollTop += stepTop;
        if ((y - scrollTop) * stepTop < 0) {
            scrollTop = y;
            isEndTop = true;
        }
        
        window.scrollTo(scrollLeft, scrollTop);
        if (!isEndLeft || !isEndTop) {
            window.requestAnimationFrame(scroll);
        }
    };

    scroll();
}
window.onload = function(){
    window.onresize();
    window.onscroll();

    var inityScrollY = window.scrollY;
    var topoptionA = document.getElementsByClassName('topopA');
    for (var i = 0; i < topoptionA.length; i++) {
        topoptionA[i].addEventListener('click',function(e){
            var scrollTop = window.scrollY;
            var briefIntroHeight = document.getElementById('brief-intro').clientHeight;
            var realIntroHeight = document.getElementById('real-intro').clientHeight;
            var detailHeight = document.getElementById('detail').clientHeight;
            var contactHeight = document.getElementById('contact').clientHeight;
            var partId = this.getAttribute('href').substr(1,this.getAttribute('href').length);
            console.log(partId);
            switch (partId) {
                case 'brief-intro':
                    scrollToEx(0,0);
                    break;
                case 'real-intro':
                    scrollToEx(0,briefIntroHeight);
                    break;
                case 'detail':
                case 'contact':
                    scrollToEx(0,briefIntroHeight+realIntroHeight+detailHeight+contactHeight-document.body.clientHeight);
                    break;
                default:
                    break;
            };
            e.preventDefault();
        })
    }
    document.getElementById('navoption-mobile').addEventListener('click',slide);
}
