var n = -1;
var inputCount = 0;
var inputText;
var enterControl = false;


function findText(){
    if( n == 0 ){
        inputText = "hackday是一项交流技术...助你长胖的活动<br>总之是来了不会后悔的活动";
    }else if (n==1) {

        inputText = "咳咳，开个玩笑...这是真的介绍<br>每年我们都会抽出24小时的时间，让一群产品狗，程序猿，设计狮汇聚一堂，<br>组成一个个新的团队，将头脑风暴中稀奇古怪的点子，日思夜想的产品变成现实。<br>在这有限的24小时中，我们希望大家能够迸发自己的创造力，<br>互相增进了解，学会进行团队合作开发，最后完成一款炫酷的产品。<br>It's amazing so amazing.<br>活动时间：3月26日-3月27日<br>活动地点：一站式中心<br>参与对象：本次活动报名面向所有有兴趣的人（会根据简历适当筛选）<br>评选设置：最佳产品，最佳设计，最佳技术";
    }else if( n ==2 ){
        inputText = "好了，没时间解释了<br>快上车！！！";
    }else if( n ==3 ){
        inputText = "首先<br>报上名来:";
    }else if( n ==4 ){
        inputText = "手机号:";
    }else if( n ==5 ){
        inputText = "术业有专攻，隔行如隔山<br>但是<br>他山之石可以攻玉透露一下你专业吧:";
    }else if( n ==6 ){
        inputText = "萌新是有特殊优待的，说一下年级吧:";
    }else if( n ==7 ){
        inputText = "最后一个问题，你的邮箱是？";
    }else if( n ==8 ){
        inputText = "真的没骗你，这个不是问题，吹嘘一下自己，写个简历吧";
    }else if( n ==9 ){
        inputText = "入坑不谢!";
    }
    console.log(inputText);
}

function addDiv(id,name){
    div0 = document.createElement("div");
    div0.classList.add('div0');
    var message = document.createElement("div");
    message.setAttribute("class","message");
    message.style.display = "inline-block";
    div0.appendChild(message);

    if(id != null){
        inputCount++;
        div = document.createElement("div");
        div.setAttribute("id",id);
        div.classList.add("inputBox");
        div.classList.add("inputBox"+inputCount);
        //div.setAttribute("style",divStyle);
        div.style.display = "none";
        var input = document.createElement("input");
        input.setAttribute("name",name);
        input.setAttribute("type","text");

        input.classList.add('tag');
        input.classList.add('tag'+inputCount);
        //input.setAttribute("style",inputStyle);
        div.appendChild(input);
        div0.appendChild(div);
    }

    document.getElementById('content').appendChild(div0);
}
function addTextarea(id,name){
    div0 = document.createElement("div");
    var message = document.createElement("div");
    message.setAttribute("class","message");

    div0.appendChild(message);

    if(id != null){
        div = document.createElement("div");
        div.setAttribute("id",id);
        div.setAttribute("class","textareaDiv inputBox");
        div.setAttribute("style","");
        div.style.display = "none";
        var input = document.createElement("textarea");
        input.setAttribute("name",name);
        input.setAttribute("style","");
        input.classList.add('tag');
        div.appendChild(input);
        div0.appendChild(div);
    }

    document.getElementById('content').appendChild(div0);


}


function addBlink(){

    var blink = document.createElement("span");
    blink.setAttribute("id","blink");
    blink.innerHTML = "_";
    document.getElementById('content').appendChild(blink);


}




//ajax请求

    var xmlHttpRequest = null;

    function ajaxRequest()
    {

        var name= document.getElementsByName("name")[0].value;
        var tel= document.getElementsByName("tel")[0].value;
        var department= document.getElementsByName("department")[0].value;
        var grade= document.getElementsByName("grade")[0].value;
        var mail= document.getElementsByName("mail")[0].value;
        var resume= document.getElementsByName("resume")[0].value;

		var telReg = new RegExp(/^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);
		var mailReg = new RegExp(/^[^\._-][\w\.-]+@([A-Za-z0-9]+\.)+[A-Za-z]+$/);
		if(!!(name&&tel&&department&&grade&&mail&&resume)){
			if(!telReg.test(tel)){
            	document.getElementById("btn").innerHTML = "请输入正确手机号";
				return 0;
			}
			if(!mailReg.test(mail)){
            	document.getElementById("btn").innerHTML = "请输入正确电子邮件";
				return 0;
			}

            var data = {
                name: name,
                tel: tel,
                department: department,
                grade: grade,
                mail: mail,
                resume:resume
            }
            console.log(data);
            ajax.send({
                url: "/participant/signup/",
                method: "POST",
                data: data,
                success: function () {
                    document.getElementById("btn").innerHTML = "提交成功";
                },
                error: function (data) {
                    if(data['success']==false){
                        if(data['message'] === 'already sign up'){
                            document.getElementById("btn").innerHTML = "已报名成功";
                        }
                    }
                    
                },
            });
		}else{

            document.getElementById("btn").innerHTML = "请填写全部六项";
		}
    }











function changeText(){
    if(n < 3){
        var btn = document.getElementById("btn");

        btn.style.display = "none";
        n++;
        console.log(n);
        findText();
        console.log(inputText);
        writeContent(true);
    }else if(n<9&&n>=3){
        if(document.getElementsByTagName("input")[n-3].value != ""){
            var btn = document.getElementById("btn");

        btn.style.display = "none";
        n++;
        findText();
        writeContent(true);
        }else{
            enterControl = true;
            document.getElementById("btn").innerHTML = "填写完该项才能进行下一项哦";
            setTimeout(function(){
                document.getElementById("btn").innerHTML = "enter";
            },1500);
        }

    }


}
