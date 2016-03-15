	var initAppHeight;
    var charIndex = -1;
    var stringLength = 0;



    //样式
/*  var inputStyle = " padding: 0;border: 0;border-radius: 0;box-shadow: none;background: transparent;color: #20f440;z-index: 2;width: 100%;" */

    var divStyle = "    position: relative;    padding: 2px 5px;    margin-bottom: .275rem;    margin-left: 10px;    width: 300px;    border: 2px solid #20f440;    border-radius: 2px;height: .36rem;line-height: .34rem;display: inline-block;"




    function writeContent(init){
        enterControl = false;
        if(charIndex==-1){
            charIndex = 0;
            stringLength = inputText.length;
            document.getElementById('content').removeChild(document.getElementById("blink"));


            if( n == 0){//简介1

                  addDiv(null,null);
            }else if (n == 1) {
				addDiv(null,null);
            }
			else if( n == 2){//简介2
                  addDiv(null,null);
            }else if( n == 3){//请求姓名
                addDiv("div_name","name");

            }else if( n == 4){//请求电话

                addDiv("div_tel","tel");

            }else if( n == 5){//请求院系
                addDiv("div_department","department");
            }else if( n == 6){//请求年级
                addDiv("div_grade","grade");
            }else if( n == 7){//请求邮箱
                addDiv("div_mail","mail");
            }
            else if( n == 8){//请求简历
                addTextarea("div_resume","resume");
            }
        message = document.getElementById('content').getElementsByClassName("message")[n];


        }

    if(n<9){

        initString = message.innerHTML;
        initString = initString.replace(/<SPAN.*$/gi,"");

            var theChar = inputText.charAt(charIndex);
            //检测换行
            var nextFourChars = inputText.substr(charIndex,4);
            if(nextFourChars=='<BR>' || nextFourChars=='<br>'){
                theChar  = '<BR>';
                charIndex+=3;

        }


        if(charIndex<=stringLength-1){

            message.innerHTML = initString + theChar +"<SPAN id='blink'>_</SPAN>";
        }else{
            message.innerHTML = initString + theChar ;
        }



        charIndex = charIndex/1 +1;


//调用函数



        if(charIndex<=stringLength){

            setTimeout('writeContent(false)',150);


        }else{
            enterControl = true;
            if(n>2){
                document.getElementsByClassName("inputBox")[n-3].style.display = "inline-block";
            }

            addBlink();

            charIndex = -1;
           setTimeout(function(){

               //显示按钮
               btn.innerHTML = "enter";
               btn.style.display = "block";

               //提交
               if( n == 8 ){
                   btn.innerHTML = "提交";

                   n = 9;
               }
           },150);
        }

			window.scrollBy(0,300);
    }

}

window.onload = function(){
	initAppHeight = document.getElementById('app-container').clientHeight;
    setTimeout(function(){
        enterControl = true;
    },500);
    addBlink();
    document.onkeyup = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            if(keyCode == 13&&enterControl === true){
                enterControl = false;
                changeText();
            }
    }

    document.getElementById("btn").onclick = function(){
        if(n<9){
			console.log(n);
            changeText();
        };
        if(n == 9){
            ajaxRequest();
        };
    }
}
