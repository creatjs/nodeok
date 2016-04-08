

(function(){
    "use strict";

    var scrollBar = function (args){
        //公共的
        this.init(args)
    };
    scrollBar.prototype = {
        init:function(args){

            //滚动的窗口，滚动的内容，滚动的按钮
            this.scrollWindow = document.querySelectorAll(args["scrollWindow"]);
            this.scrollContent = document.querySelectorAll(args["scrollContent"]);
            this.scrollDiv = document.querySelectorAll(args["scrollDiv"]);
            this.scrollButton = document.querySelectorAll(args["scrollButton"]);

            //获取视口的大小
            var _clientWidth = this.scrollWindow[0].clientWidth;
            var _clientHeight = this.scrollWindow[0].clientHeight;
            //获取页面内容的大小,(包括margin，padding)
            var _scrollWidth = this.scrollWindow[0].scrollWidth;
            var _scrollHeight = this.scrollWindow[0].scrollHeight;

            console.log(_clientWidth,_clientHeight);
            console.log(_scrollWidth,_scrollHeight);

            //初始化，滑动条
            this.initRoll(this.scrollDiv,_clientHeight);
            //初始化，绑定事件
            this.handers(this.scrollWindow,this.scrollDiv,this.scrollButton);

        },
        get:function(){},
        set:function(){},
        w3c:{
            //绑定事件
            addEvent : function (target, type, func) {
                if (target.addEventListener) {// 非ie 和ie9
                    target.addEventListener(type, func, false);
                } else if (target.attachEvent) { // ie6到ie8
                    target.attachEvent("on" + type, func);
                } else {
                    target["on" + type] = func; // ie5
                }
            },
            addMousewheel : function (obj){
                console.log("绑定鼠标滚动触发事件",this)
                var self = this;

                // 鼠标滚动触发
                this.w3c.addEvent(obj, 'mousewheel', function(event) {
                    var event = event?event : window.event;
                    var result = getWheelDelta(event);
                    self.pageRoll(result);
                    event.preventDefault();

                });
                //火狐
                this.w3c.addEvent(obj, 'DOMMouseScroll', function(event) {
                    var event = event?event : window.event;
                    var result = getWheelDelta(event);
                    self.pageRoll(result);
                    event.preventDefault();
                });
                function getWheelDelta(event){
                    return event.wheelDelta ? -event.wheelDelta/120 :event.detail/3;
                }
            }
        },
        initRoll:function(scrollDiv,_clientHeight){
            scrollDiv[0].style.width = 1 + "px";
            scrollDiv[0].style.height = _clientHeight+ "px";
        },
        handers:function(scrollWindow,scrollDiv,scrollButton){
            console.log("绑定事件",this);
            var self = this;
            this.w3c.addMousewheel.bind(this,scrollWindow[0])();
            this.w3c.addEvent(scrollButton[0],"mousedown",this._scrollButton.bind(this));
            window.onresize = function(){self._resize(self)};
        },
        //窗口大小改变，改变滚动条
        _resize:function(self){
            //重新设置滚动条高度
            var _clientHeight = self.scrollWindow[0].clientHeight;
            self.scrollDiv[0].style.height = _clientHeight+ "px";



            //重新设置滚动球的高度
            var Y=self.scrollContent[0].offsetTop;  //  获取当前的页面滚动高度
            var H=self.scrollWindow[0].clientHeight - self.scrollContent[0].scrollHeight ;    //  页面的可以滚动高度\

            //如果滚动到低，设置响应到当前视口低
            if(Y/H >= 0.99){
                this.scrollContent[0].style.top= H +"px";
            }
            var HH=self.scrollWindow[0].clientHeight - self.scrollContent[0].scrollHeight ;
            //滚动条
            var SH=Y/HH *(_clientHeight - self.scrollButton[0].clientHeight);
            if(SH<0)
                SH=0;
            if(SH>_clientHeight - self.scrollButton[0].clientHeight)
                SH=_clientHeight - self.scrollButton[0].clientHeight;
            self.scrollButton[0].style.top=SH+"px";
        },
        //页面滚动函数
        pageRoll : function(result){
            //鼠标向下滚动 1，向上滚动 -1
            //console.log('pagerooll   result',result)
            //console.log('YYYYYYYY ',this.scrollContent[0].offsetTop)
            //console.log(this.scrollWindow[0].offsetHeight - this.scrollContent[0].scrollHeight)
            var Y=this.scrollContent[0].offsetTop;  //  获取当前的页面滚动高度

            var H=this.scrollWindow[0].offsetHeight - this.scrollContent[0].scrollHeight ;    //  页面的可以滚动高度

            if (result >0){
                Y=Y-80
            }else{
                Y=Y+80
            }

            if(Y>0)
                Y=0;
            if(Y<H)
                Y=H;

            //内容
            this.scrollContent[0].style.top= Y +"px";
            //滚动条
            var SH=Y/H * (this.scrollDiv[0].clientHeight-this.scrollButton[0].clientHeight);
            if(SH<0)
                SH=0;
            this.scrollButton[0].style.top=SH+"px";
            //console.log('YYYYYYYY ',this.scrollContent[0].offsetTop)


        },
        // 鼠标点击拖放函数
        _scrollButton : function (event){
            var event = event || window.event;
            event.preventDefault();
            var self = this;
            var oldTop = event.clientY;
            var scrollButtonTop = self.scrollButton[0].offsetTop;
            //console.log(scrollButtonTop)

            document.onmousemove = scrollGo;
            document.onmouseup = function() {
                this.onmousemove = null;
            }
            function scrollGo(event) {
                event.preventDefault();
                var event = event || window.event;
                var newTop = event.clientY;

                var Y = newTop-oldTop + scrollButtonTop;//移动的距离
                var H = self.scrollDiv[0].clientHeight - self.scrollButton[0].clientHeight;//可用的距离

                if (Y<0)
                    Y=0;
                if (Y>H)
                    Y=H;
                var SH=Y/H * (self.scrollWindow[0].clientHeight - self.scrollContent[0].scrollHeight );


                //按钮
                self.scrollButton[0].style.top=Y+"px";
                //内容
                self.scrollContent[0].style.top=SH+"px";

            }

            this.scrollButton[0].onmouseover = function() {
                this.style.background = "#444";
            };
            this.scrollButton[0].onmouseout = function() {
                this.style.background = "#666";
            };
        }
    };

    new scrollBar({
        scrollWindow:".scrollWindow",
        scrollContent:".scrollContent",
        scrollDiv:".scrollDiv",
        scrollButton:".scrollButton"
    });







})(window);


