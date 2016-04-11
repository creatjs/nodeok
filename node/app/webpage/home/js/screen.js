
;(function(){
    "use strict";
    function Screen(){
        //私有的
        //获取屏幕大小


    };
    Screen.prototype = {
        //公共的
        $$:function(id){return document.getElementById(id);},

        // 这个处理ie和狐火的事件兼容
        addEvent:function (obj,type,fn){
            if(obj.addEventListener){
                obj.addEventListener(type,fn,false);
            }else if(obj.attachEvent){
                obj.attachEvent('on'+type,fn);
            }
        },

        hander:function(){
        },

    }
    //var screenArr = ['screen_1','screen_2']
})();














