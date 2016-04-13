
(function(){


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
        var ajax = new AJAX();
        ajax.init({
            method:"post",
            url:"/login",
            data:{
                user:user,
                password:password
            },
            success:function (text) {
                console.log('用户名或密码错误',text)
                if(text === 'true'){
                    //写入cookie
                    setCookie();
                    //跳转到用户页面
                    window.location.href = "/user/"+user;
                }
                else{
                    //否则不动
                    alert("用户名或密码错误")

                }

            },
            async:true
        });
        //写入用户到cookie
        function setCookie(){
            var yesCookie = new Cookie();
            var content = {
                user:user,
                password:password
            }
            yesCookie.setCookie('itotooUser',JSON.stringify(content));
        }
    }








})();
