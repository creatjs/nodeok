

var _id = function(id){
    return document.getElementById(id)
};
function bind(target, type, func) {
    if (target.addEventListener) {// 非ie 和ie9
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) { // ie6到ie8
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func; // ie5
    }
}

var user =document.getElementsByName('user')[0];
var password =document.getElementsByName('password')[0];
var phone =document.getElementsByName('phone')[0];
var email =document.getElementsByName('email')[0];

var userState=phoneState=emailState = false;
bind(user,'blur',function(){
    if(user.value!==''){
        validation('user',user)
    }
});
bind(phone,'blur',function(){
    if(phone.value!==''){
        validation('phone',phone)
    }
});
bind(email,'blur',function(){
    if(email.value!==''){
        validation('email',email)
    }
});
function validation(name,item){

    var ajax = new AJAX();
    ajax.init({
        method:"post",
        url:"/validation",
        data:{
            name:name,
            value:item.value
        },
        success:function (text) {
            console.log('text===========',text)
            if(text === 'true'){
                item.style.borderColor = "green";
                if(name === 'user'){
                    userState = true;
                }
                if(name === 'phone'){
                    phoneState = true;
                }
                if(name === 'email'){
                    emailState = true;
                }
                console.log(text)
                //写入cookie
                //跳转到首页
                //window.location.href = "/home";
            }
            else{
                //否则不动
                if(name === 'user'){
                    userState = false;
                }
                if(name === 'phone'){
                    phoneState = false;
                }
                if(name === 'email'){
                    emailState = false;
                }
                item.style.borderColor = "red"

            }

        },
        async:true
    });
}


bind(_id("subm"),'click',logup);

function logup(){

    if(userState===true&&phoneState===true&&emailState===true){

        console.log('提交成功哦')
        var ajax = new AJAX();
        ajax.init({
            method:"post",
            url:"/logup",
            data:{
                user:user.value,
                password:password.value,
                phone:phone.value,
                email:email.value
            },
            success:function (text) {
                console.log('ajax success：',text)
                if(text === 'true'){
                    //写入cookie
                    //跳转到用户页面
                    setCookie();
                    window.location.href = "/user/"+user.value;
                }
                else{
                    //否则不动
                    alert('用户被注册了')

                }

            },
            async:true
        });
    }

};

//写入用户到cookie
function setCookie(){
    var yesCookie = new Cookie();
    var content = {
        user:user.value,
        password:password.value
    }
    yesCookie.setCookie('itotooUser',JSON.stringify(content));
}
