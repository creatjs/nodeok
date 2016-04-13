



/*

 轮播图考虑的对象

 ------自动获取，宽高
 ------『
 1.上下，还是左右
 2.速度，还是曲线
 3.方向
 4.
 』

 */

/*
1.自动高度
2.通过class获取对象
*/

(function(){
    var Carousel = function(){
        //私有的
        this.state = false;
    };
    Carousel.prototype = {
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
                    console.log(result)
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
        $$:function(id){return document.getElementById(id);},

        getElementsByClassName : function (n) {
            var classElements = [];
            var allElements = document.getElementsByTagName('*');
            for (var i=0; i< allElements.length; i++ ) {
                if (allElements[i].className == n ) {
                    classElements[classElements.length] = allElements[i];
                }
            }
            return classElements;
        },
        init:function(item){
            console.log('itemmmmm',item)
            var that = this;

            this.boxs = this.getElementsByClassName(item['box']);//最外层盒子

            this.box = this.$$(item['id']);
            this.Ul = this.box.getElementsByTagName('ul')[0];
            this.Li = this.box.getElementsByTagName('li');
            this.liLength = this.Li.length;

            this.btn = this.$$(item['btn']);
            this.btnUl = this.btn.getElementsByTagName('ul')[0];
            this.btnLi = this.btnUl.getElementsByTagName('li');

            this.positionIndex = 0;//默认当前的位置
            this.distance = 1;//默认偏移的距离
            this.playState = true;

            //获取视口的大小
            this.Heights = this.boxs[0].clientHeight//读取盒子的高度（这里因为向上滚动，所以读取高度就行了）

            console.log( this.Heights,this.clientH)
            // 计算UL层的总高度
            var Height = this.Heights * this.liLength;
            this.Ul.style.height = Height + 'px';

            this._indexLi();

            //绑定事件

            this.w3c.addMousewheel.bind(this,document)();
            window.onresize = function(){that._resize(item,that.liLength)};

        },
        //窗口大小改变，改变滚动条
        _resize:function(item,num){
            this.boxs = this.getElementsByClassName(item['box']);//最外层盒子
            this.Heights = this.boxs[0].clientHeight//读取盒子的高度（这里因为向上滚动，所以读取高度就行了）
            console.log( this.Heights,'this.clientH')

            // 计算UL层的总高度
            var Height = this.Heights * num;
            this.Ul.style.height = Height + 'px';
            for(var i= 0, j = num ; i < j ; i++){
                //给所有的Li添加index
                this.btnLi[i]["index"] = i;

                this.Li[i].style.height = this.Heights + 'px';
            };
            this.Ul.style.marginTop = - this.positionIndex*this.Heights+'PX';

        },
        _indexLi:function(){
            var that = this;
            for(var i= 0, j = this.liLength ; i < j ; i++){
                //给所有的Li添加index
                this.btnLi[i]["index"] = i;

                this.Li[i].style.height = this.Heights + 'px';
            };

            this.btnUl.onclick = function(event){
                if(that.playState === true){
                    var ev = event || window.event;
                    var target = ev.target || ev.srcElement;
                    console.log(target.nodeName);
                    if(target.nodeName.toLowerCase() == "li"){
                        console.log(target.index)
                        that.anniuIndex(target.index);
                        //逻辑代码
                        var result = target.index - that.positionIndex;
                        that.positionIndex = target.index;
                        //执行
                        that.animate(-result);
                    }
                }
            }
        },
        //页面滚动函数
        pageRoll : function(result){
            if(!this.state ){
                this.state = true;
                //获取当前位置索引
                console.log('获取当前位置索引',this.positionIndex)

                //鼠标向下滚动 +1，向上滚动 -1
                if (result >0){
                    this.positionIndex += 1;
                    if(this.positionIndex < this.liLength){
                        this.animate(-1);
                        this.anniuIndex(this.positionIndex);
                    }else{
                        this.state = false;
                        this.positionIndex = this.liLength-1;
                    }
                }else{
                    this.positionIndex -= 1;
                    if(this.positionIndex >= 0){
                        this.animate(1);
                        this.anniuIndex(this.positionIndex);
                    }else{
                        this.state = false;
                        this.positionIndex = 0;
                    }
                }
            }
        },
        animate:function(orientation){

            var that = this;
            that.playState = false;
            var top = that.Ul.offsetTop;
            var distances = typeof orientation=="undefined" ? that.distance : orientation;//确定偏移量

            //1.核心算法
            var start = 0 , during = 50;
            function animations(){
                start ++;
                //stime.sval,eval,etime
                //这个算法是tweenjs里面的
                var topHeight =  Math.tween.Quad.easeOut(start , 0 , distances * that.Heights , during);

                that.Ul.style.marginTop= top + (topHeight)+'px';
                if(start < during){
                    requestAnimationFrame(animations);
                }else{
                    that.playState = true;
                    that.state = false;

                }
            }
            animations();
        },
        //按钮对应的位置回调函数
        anniuIndex:function(index){

            var that = this;
            //遍历删除所有有的背景样式
            for(var i= 0, j = that.liLength ; i < j ; i++){
                that.btnLi[i].removeAttribute('class','bg')
            }
            //添加私有的class背景样式
            that.btnLi[index].setAttribute('class','bg')

        },

        callback:function(){

        }
        //.....
    }

    var Carousel_1 = new Carousel();

    Carousel_1.init({
        box:"screen",
        id:"fodder",
        prev:"prev",
        next:"next",
        btn:"anniu"
    });

})();


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
        getId('user_name').innerText = userCookieObj.user.toUpperCase();
        getId('user_name').href = "/user/"+userCookieObj.user;
    }



})();