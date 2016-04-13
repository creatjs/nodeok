

(function(){
    //读取用户信息
    var yesCookie = new Cookie();
    var userCookie = yesCookie.getCookie('itotooUser');
    var userCookieObj = JSON.parse(userCookie);
    console.log(userCookieObj)

    //展示信息
    function getId(id){return document.getElementById(id)}

    getId('user_ico').innerHTML = " <img src='../data/publicPage/headerIco/headerico1.jpg' alt=''/>";
    getId('user_name').innerText = userCookieObj.user;


})();
