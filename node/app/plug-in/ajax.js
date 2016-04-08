


(function(window, undefined){

    window.AJAX = function(){
        //公共的
        this.getId = function(id){document.getElementById(id)}
    };

    AJAX.prototype = {
        createXHR : function(){
            //如果不支持，兼容ie6
            if(window.XMLHttpRequest === "undefined"){
                window.XMLHttpRequest = function(){
                    try{
                        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                    }catch (e1){
                        try{
                            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                        }catch (e2){
                            throw new Error("不支持AJAX环境")
                        }
                    }
                }
            }else{
                return new XMLHttpRequest();
            }
        },
        ajax:function (obj) {
            var XHR = this.createXHR();
            obj.url = obj.url +"?rand="+Math.random();
            obj.data = this.params(obj.data);

            if (obj.method === "get") {
                obj.url += obj.url.indexOf("?") == -1 ? "?"+ obj.data: "&"+ obj.data;
            };

            //async
            XHR.onreadystatechange = function  () {
                if (XHR.readyState ==4) {
                    if (XHR.status ==200) {
                        obj.success(XHR.responseText);
                    }else{
                        throw new Error("错误代号:"+XHR.status+","+XHR.statusText)
                    }
                };
            }

            //nync
            XHR.open(obj.method,obj.url,obj.async);
            if (obj.method === "post") {
                XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                XHR.send(obj.data);
            }else{
                XHR.send(null);
            }

        },
        params:function(data){
            var arr = [];
            for(var i in data){
                arr.push(encodeURIComponent(i)+ "=" +encodeURIComponent(data[i]))
            }
            return arr.join("&");
        },
        init:function(obj){
            this.ajax(obj);
        }
    }



})(window);