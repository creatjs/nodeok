/*
*
 * 动画有缩放，偏移，旋转，
*
*/

(function(window, undefined){
    window.w3c = function(){}

    w3c.prototype = {
        getEvent:function(event){
            return event?event : window.event;
        },
        getTarget:function(event){
            return event.target || event.srcElement;
        },
        preventDefault:function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        stopPropagation:function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
        bind:function (target, type, func) {
            if (target.addEventListener) {// 非ie 和ie9
                target.addEventListener(type, func, false);
            } else if (target.attachEvent) { // ie6到ie8
                target.attachEvent("on" + type, func);
            } else {
                target["on" + type] = func; // ie5
            }
        },
        getId:function(id){
            return document.getElementById(id)
        }

    }
})(window);

(function(){
    var SelectLoad = function(){
        this.W3 = new w3c();
        this.animateState = true;
        this.conter = this.W3.getId('conter');
        this.select_s = this.W3.getId('select_s');
        //选择对象
    }
    SelectLoad.prototype = {

        hander:function(){
            var that = this;
            that.W3.bind(that.select_s,'click',function(event){//事件委托
                that.newBox = that.W3.getId('newBox');

                var _target = that.W3.getTarget(event);
                console.log(_target.nodeName)

                if(_target.nodeName.toLowerCase() == "li"){
                    //
                    that._targetName = (_target.innerText);//当前选择的元素
                    //
                    var oldBoxName = (that.newBox.getAttribute('data-value'));//当前卡片的属性
                    console.log("newBox",that._targetName,oldBoxName)
                    if(that._targetName === oldBoxName){
                        return;
                    }else{
                        loadTemp('newBox',that._targetName.toLowerCase());
                        //替换当前对象的节点属性
                        if(that.animateState){
                            that.newBox.setAttribute("id","oldBox");
                            that.oldBox = that.W3.getId('oldBox');
                            that.animation.oldAnimate(that);
                            that.animateState = false;
                        }
                    }
                }
            })
        },
        animation:{
            oldAnimate:function(that){
                console.log('start：执行旧的消失动画');
                var offset_left = that.oldBox.offsetLeft;//obj
                var offset_top = that.oldBox.offsetTop;//obj
                that.time = setInterval(function(){go();},1);
                var offset = 0;//原始大小//偏移20像素终止
                var opacity = 100;
                function go(){
                    offset += 1;
                    opacity  -= 100/100 ;
                    if(offset >= 200){
                        clearInterval(that.time);
                        //删除节点
                        that.conter.removeChild(that.oldBox);
                        that.animateState = true;
                        return;
                    };
                    //console.log('offset',offset)
                    that.oldBox.style.left = offset_left-offset+"px";
                    that.oldBox.style.top = offset_top-offset+"px";
                    that.oldBox.style.opacity = opacity/100;
                    that.oldBox.style.filter = "alpha(opacity="+opacity+"%)";
                }
                that.animation.newAnimate(that);

            },
            newAnimate:function(that){
                //追加新的卡片
                console.log('start：执行新的显示动画');
                var newDiv = document.createElement("div");
                newDiv.setAttribute("id",'newBox');
                newDiv.setAttribute("class",'box1');
                newDiv.setAttribute("data-value",that._targetName);

                that.conter.appendChild(newDiv);

                var newBox = that.W3.getId('newBox');
                var rect = that.newBox.getBoundingClientRect();
                var left = rect.width;
                console.log("-------left--------",left)

                newBox.style.left = left+"px";

                var time = setInterval(function(){goo();},1);
                var offset = 0;//原始大小//偏移20像素终止
                var opacity = 0;
                function goo(){

                    offset += 3;
                    opacity += 100/left*3;
                    if(offset >= left ){
                        clearInterval(time);
                        return;
                    };
                    newBox.style.left = left-offset+"px";
                    newBox.style.opacity = opacity/100;
                    newBox.style.filter = "alpha(opacity="+opacity+"%)";
                }


            },
            ////dom属性，（曲线），速度
            //go:function(args,tweens,speed){
            //
            //}
        }
    }


    var selectLoad = new SelectLoad();
    selectLoad.hander();
})();

//(function(){
//    var SelectLoadContent = function(){
//        this.W3 = new w3c();
//        this.newBoxContent = this.W3.getId('newBoxContent');
//        this.newBox = this.W3.getId('newBox');
//        //选择对象
//    }
//    SelectLoadContent.prototype = {
//
//        hander: function () {
//            var that = this;
//            that.W3.bind(that.newBox, 'click', function (event) {//事件委托
//                var _target = that.W3.getTarget(event);
//                if (_target.nodeName.toLowerCase() == "a") {
//                        var _target = that.W3.getTarget(event);
//                        var dataValue = (_target.getAttribute('data-value'));//当前卡片的属性
//                        that.newBoxContent.style.display = "block"
//                        loadTemp('newBoxContent',dataValue);
//                }
//            })
//        },//...
//
//    }
//    var SelectLoadContent = new SelectLoadContent();
//    SelectLoadContent.hander();
//
//
//})();