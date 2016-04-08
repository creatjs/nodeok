

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
bind(_id("subm"),'click',fn)
function fn(){
    var user =document.getElementsByName('user')[0].value;
    var password =document.getElementsByName('password')[0].value;
    var phone =document.getElementsByName('phone')[0].value;
    var email =document.getElementsByName('email')[0].value;
    var ajax = new AJAX();
    ajax.init({
        method:"post",
        url:"/logup",
        data:{
            user:user,
            password:password,
            phone:phone,
            email:email,
        },
        success:function (text) {

            if(text === 'true'){
                //写入cookie
                //跳转到首页
                window.location.href = "/home";
            }
            else{
                //否则不动
                alert('用户被注册了')

            }

        },
        async:true
    });
}