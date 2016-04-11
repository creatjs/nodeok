



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

(function(){
	var carousel = function(){};
	carousel.prototype = {
		// 这个处理ie和狐火的事件兼容
		addEvent:function (obj,type,fn){
			if(obj.addEventListener){
				obj.addEventListener(type,fn,false)
			}else if(obj.attachEvent){
				obj.attachEvent('on'+type,fn)
			}
		},
		init:function(){},
		get:function(){},
		set:function(){},
		autoPlay:function(){},
		stop:function(){},
		start:function(){},
		animate:function(){},

	}

	var aa = new arousel

})();


// 这个处理ie和狐火的事件兼容
function addEvent (obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false)
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn)
	}
}





// 记录下满差值的累加量
var a =0; // a 是 index默认0
var t = 0,z=0;

var speed = 5000;// 速度
var tf = true; // 当前运动状态
var but = false; // 按钮状态

// 默认无限滚动
var time = setInterval(function(){isChange(1)},speed);

// 获得左右按钮的
var anniu = document.getElementById('anniu');
var L3 = anniu.getElementsByTagName('li');

var boxs = document.getElementById('box');
var ul = boxs.getElementsByTagName('ul');
var L2 = boxs.getElementsByTagName('li').length;

    // 计算总高度
	var H  = 400*L2; 
	var HH  = 400*(L2-1); 
	ul[0].style.height = H+'px';
	
	for(var i=0;i<L3.length;i++){
		L3[i].index = i;
		// 这里给数字按钮添加鼠标经过和离开事件
		addEvent(L3[i],'mouseenter',function (evt){
				stop();
				but = true;
                // 获取index
				var num =(evt.target)?evt.target.index:evt.srcElement.index;
				isChange(num);
		});
		addEvent(L3[i],'mouseout',function (evt){
				start();
		});	
	};	
	function isChange(val){
		if(tf == true){
			var cha = val - a;// 计算当前图片和触发图片之间的距离
			// a是index 替换index
			a += val;		
			var xz = (but == true) ? cha : val;
			if(but ==true){
				a=val
			}
			but = false;
			function aaa(){		
					tf=false;
                    // 这个是计算偏移量
					var t = 1/5*(xz*400-z);
					t = (t>z)?Math.ceil(t):Math.floor(t);
                    // 每次t减少多少，z增加多少
					z += t;
                    // 赋值
					ul[0].style.marginTop= ul[0].offsetTop-t+'px';
                    // 定时器回调
					var sudu = setTimeout(function(){aaa()},10)
                    // 如果t减少到0停止，清除一切
					if(t==0){
						clearTimeout(sudu);
						ul[0].style.marginTop= ul[0].offsetTop-(xz*400-z)+'px';//准确归位
						tf=true;
						z=0;
					}
			}
			function bbb(){
					tf=false;
					clearInterval(time)
					var t = 1/5*(val*HH-z);
					t = (t>z)?Math.ceil(t):Math.floor(t);
					z += t;
					
					ul[0].style.marginTop= ul[0].offsetTop+t+'px';
					var sudu = setTimeout(function(){bbb()},0);
					if(t==0){

						tf=true;
						ul[0].style.marginTop= ul[0].offsetTop+(val*HH-z)+'px';//准确归位
						a=(val>0)?0:L2-1;
						z=0;
						clearTimeout(sudu);
						time = setInterval(function(){isChange(1)},speed);
					}
			}
            // 如果a是最后一张返回第一张
			if(a == L2){
				a = 0;
				bbb();
			}else if(a>=0){
				aaa();
			}
			// 如果a是第一张返回下一张
			if(a <= -1){
				a = L2-1;
				bbb();
			}
			// 按钮class
			for(var i=0;i<L2;i++){
				L3[i].removeAttribute('class','anbg');
				if(i==a){
					L3[i].setAttribute('class','anbg');
				}
			}

		}

			
	}
    // 停止和开始
	function stop(){clearInterval(time);}
	function start(){time =setInterval(function(){isChange(1)},3000);}

