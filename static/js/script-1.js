
function addevent(){
  document.getElementById("navoption-mobile").addEventListener("click",slide)
  var a=document.getElementsByClassName('mobile-option')
  for(var i=0;i<a.length;i++){
    a[i].addEventListener('click',slide)
  }
}
var slide=function(){
    console.log('aaa');
  var ele=document.getElementById("optionslide");
  if(ele.clientHeight==205){
    ele.style.height='0px'
  }
  else{
    ele.style.height='205px'
  }
}
document.getElementById('navoption-mobile').addEventListener('click',slide);
window.onscroll=function(){
  var top=$('body').scrollTop()+window.screen.availHeight-60
  var rimg=document.getElementById('right-img')
  var lintro=document.getElementById('left-intro')
  var lastyear=document.getElementsByClassName('lastyear-img')
  var sche=document.getElementById('scheduleboard')
  var faq=document.getElementById('faq')
  if(top>=$('#real-intro').offset().top&&top<=$('#lastyear').offset().top){
    if(rimg.classList.contains('fadein')){}
    else{
      console.log('o4')
      rimg.classList.add('fadein')
      lintro.classList.add('fadein')
    }
  }
  else if(top>=$('#lastyear').offset().top&&top<=$('#schedule').offset().top){
    if(lastyear[0].classList.contains('fadein')){}
    else{
      console.log('p')
      for(var i=0;i<lastyear.length;i++){
        lastyear[i].classList.add('fadein')
      }
    }
  }
  else if(top>=$('#schedule').offset().top&&top<=$('#faq').offset().top){
    if(sche.classList.contains('fadein')){}
    else{
      console.log('o2')
      sche.classList.add('fadein')
    }
  }
  else if(top>=$('#faq').offset().top){
    if(faq.classList.contains('fadein')){}
    else{
      console.log('o3')
      faq.classList.add('fadein')
    }
  }
}
var scroll=function(para){
  switch(para){
      case 'main':
        $('html,body').animate({scrollTop:$('#brief-intro').offset().top-60}, 500);
        break;
      case 'intro':
        $('html,body').animate({scrollTop:$('#real-intro').offset().top-60}, 500);
        break;
      case 'lastyear':
        $('html,body').animate({scrollTop:$('#lastyear').offset().top-60}, 500);
        break;
      case 'schedule':
        $('html,body').animate({scrollTop:$('#schedule').offset().top-60}, 500);
        break;
      case 'faq':
        $('html,body').animate({scrollTop:$('#faq').offset().top-60}, 500);
        break;
  }
}
var animate=function(para){
  $(para).animate('left')
}
addevent()
