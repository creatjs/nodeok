

(function(){
    window.Cookie = function(){};
    Cookie.prototype = {
        setCookie:function(user,value,expires,path,domain,secure){
            var cookie = encodeURIComponent(user)+ "=" + encodeURIComponent(value);
            if (expires instanceof Date) {
                cookie += ";expires=" + expires;
            };
            if (path) {
                cookie += ";path=" + path;
            };
            if (domain) {
                cookie += ";domain=" + domain;
            };
            if (secure) {
                cookie += ";secure" ;
            };
            document.cookie = cookie;
        },
        getCookie:function(name){
            var cookieName = encodeURIComponent(name) + "=";
            var cookieStart = document.cookie.indexOf(cookieName);
            var cookieValue = null;

            if (cookieStart >-1) {
                var cookieEnd = document.cookie.indexOf(";",cookieStart);
                if (cookieEnd === -1) {
                    cookieEnd = document.cookie.length;
                };
                var startNnm = cookieStart+cookieName.length;
                cookieValue =  decodeURIComponent(document.cookie.substring(startNnm,cookieEnd));
            };
            return cookieValue
        },
        setTimeCookie:function(day){
            var date = null;
            if (typeof day === "number" && day > 0) {
                date = new Date();
                date.setDate(date.getDate()+day);
            }else{
                throw new Error("设置的过期时间有错误")
            }
            return date;
        }
    }

})(window);

