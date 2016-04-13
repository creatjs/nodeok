

//：：如果用户登录了
//读取用户信息
//展示到页面

/*
要获取，用户名，头像，其他关联
*/
(function(){
    //读取用户信息
    var yesCookie = new Cookie();
    var userCookie = yesCookie.getCookie('itotooUser');
    var userCookieObj = JSON.parse(userCookie);
    if(userCookieObj){

        //展示信息
        function getId(id){return document.getElementById(id)}

        getId('user_ico').innerHTML = "<img src='../../data/publicPage/headerIco/headerico1.jpg' alt=''/>";
        getId('user_name').innerText = userCookieObj.user;
    }



})();