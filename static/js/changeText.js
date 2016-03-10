var n = -1;
var inputText;
var enterControl = true;


function findText(){
    if( n == 0 ){
        inputText = "hackday是一项交流技术...助你长胖的活动<br>总之是来了不会后悔<br>后悔你就后悔去吧的活动";
    }else if( n ==1 ){
        inputText = "没时间解释了<br>快上车！！！";
    }else if( n ==2 ){
        inputText = "首先<br>报上名来:";
    }else if( n ==3 ){
        inputText = "手机号:";
    }else if( n ==4 ){
        inputText = "术业有专攻，隔行如隔山<br>但是<br>他山之石可以攻玉透露一下你专业吧:";
    }else if( n ==5 ){
        inputText = "萌新是有特殊优待的，说一下年级吧:";
    }else if( n ==6 ){
        inputText = "最后一个问题，你的邮箱是？";
    }else if( n ==7 ){
        inputText = "真的没骗你，这个不是问题，吹嘘一下自己，写个简历吧";
    }else if( n ==8 ){
        inputText = "入坑不谢!";
    }
}

function addDiv(id,name){
    div0 = document.createElement("div");
    var message = document.createElement("div");
    message.setAttribute("class","message");
    message.style.display = "inline-block";
    div0.appendChild(message);

    if(id != null){
        div = document.createElement("div");
        div.setAttribute("id",id);
        div.setAttribute("class","inputBox");
        //div.setAttribute("style",divStyle);
        div.style.display = "none";
        var input = document.createElement("input");
        input.setAttribute("name",name);
        input.setAttribute("type","text");
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
        var data = {
            name: document.getElementsByName("name")[0].value,
            tel: document.getElementsByName("tel")[0].value,
            department: document.getElementsByName("department")[0].value,
            grade: document.getElementsByName("grade")[0].value,
            mail: document.getElementsByName("mail")[0].value,
            resume: document.getElementsByName("resume")[0].value
        }

        ajax.send({
            url: "/participant/signup/",
            method: "POST",
            data: data,
            success: function () {
                document.getElementById("btn").innerHTML = "提交成功";
            },
            error: function () {
                document.getElementById("btn").innerHTML = "提交失败";
            },
        });
    }











function changeText(){
    if(n < 2){
        var btn = document.getElementById("btn");

        btn.style.display = "none";
        n++;
        findText();
        writeContent(true);
        enterControl = true;
    }else if(2<n<8){
        if(document.getElementsByTagName("input")[n-2].value != ""){
            var btn = document.getElementById("btn");

        btn.style.display = "none";
        n++;
        findText();
        writeContent(true);
        enterControl = true;
        }else{
            document.getElementById("btn").innerHTML = "填写完该项才能进行下一项哦";
            setTimeout(function(){
                document.getElementById("btn").innerHTML = "enter";
            },1500);
        }

    }


}
