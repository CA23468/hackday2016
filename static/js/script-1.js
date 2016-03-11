
var slide=function(){
  var ele=document.getElementById("optionslide");
  if(ele.clientHeight==205){
    ele.style.height='0px'
  }
  else{
    ele.style.height='205px'
  }
}
window.onscroll=function(){
    var scrollTop = window.scrollY;

    var briefIntroHeight = document.getElementById('brief-intro').clientHeight;
    var realIntroHeight = document.getElementById('real-intro').clientHeight;
    var detailHeight = document.getElementById('detail').clientHeight;
    var contactHeight = document.getElementById('contact');
    if (scrollTop>=300) {
        document.getElementById('left').classList.add('fadeInLeft');
        document.getElementById('right').classList.add('fadeInRight');
        document.getElementsByClassName('navbar')[0].classList.remove('fadeInDown');

        document.getElementsByClassName('navbar')[0].classList.add('fadeOutUp');
    }else{
        if (document.getElementsByClassName('navbar')[0].classList.contains('fadeOutUp')) {
            document.getElementsByClassName('navbar')[0].classList.remove('fadeOutUp');
            document.getElementsByClassName('navbar')[0].classList.add('fadeInDown');
        }
    }
    if (briefIntroHeight+realIntroHeight+detailHeight<document.body.clientHeight+scrollTop) {
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
window.onload = function(){
    document.getElementById('navoption-mobile').addEventListener('click',slide);
}
