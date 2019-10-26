var allSlides=document.getElementsByClassName("toshowSlide");
var btn1=document.getElementById("btn1");
var btn2=document.getElementById("btn2");
var btn3=document.getElementById("btn3");
var rules1=document.getElementById("rules1");
var btn32=document.getElementById("btn32");
var mask4=document.getElementById("mask4");
var mask42=document.getElementById("mask42");
var btn41=document.getElementById("btn41");
var btn43=document.getElementById("btn43");
var clampSystm=document.getElementById("clampsystm");
var clampSystmInner=document.getElementById("clampSystmInner");
var fruits4=document.getElementsByClassName("fruits4");
var btn42=document.getElementById("btn42");
var chosenFruit=0; //选中的水果
var liquid=document.getElementById("liquid");//摇一摇页面的液体颜色
var fruit=document.getElementById("fruit");//摇一摇页面的果子
var loadingText=document.getElementById("loadingText");/*摇一摇进度值*/
/*页面1切换到页面2*/
btn1.addEventListener("touchstart",function(){
	allSlides[1].style.display="none";
	allSlides[2].style.display="block";
},false)

/*查看活动规则*/
btn2.addEventListener("touchstart",function(){
	rules1.style.display="block";
	rules1.addEventListener("click",function(){
		rules1.style.display="none";
	},false)
},false)

/*页面2切换到页面3*/
btn3.addEventListener("touchstart",function(){
	allSlides[2].style.display="none";
	allSlides[3].style.display="block";
},false)

/*页面3切换到页面4*/
btn32.addEventListener("touchstart",function(){
	allSlides[3].style.display="none";
	allSlides[4].style.display="block";
},false)

/*点击准备夹水果*/
var movingClamp1=null;
var movingClamp2=null;
var maxWth=0;
btn41.addEventListener("touchstart",function(){
	mask4.style.display="none";
	maxWth=clampSystm.clientWidth-clampSystmInner.clientWidth;
	movingClamp1=setInterval(moveClamp,5);
	btn42.addEventListener("touchstart",fucking,false);
},false);
/*重新夹果子*/
btn43.addEventListener("touchstart",function(){
	mask42.style.display="none";
	clampSystmInner.style.left="0px";
	clampSystmInner.style.top=-330+"px";
	clampLeft=0;
	movingClamp1=setInterval(moveClamp,5);
},false)
/*几个控制夹子位置的变量*/
var clampLeft=0;
var clampTop=0;
var clampVx=1;
var clampVy=3;
var amingLine=0;
var clampMaxdown=0;
/*夹子移动*/
function moveClamp(){
	clampLeft+=clampVx;
	clampSystmInner.style.left=clampLeft+"px";
	if(clampSystmInner.offsetLeft>maxWth||clampSystmInner.offsetLeft<0){
		clampVx*=-1;
	}
}
/*往下插，夹*/
function fucking(){
	clearInterval(movingClamp1);
	amingLine=clampSystmInner.offsetLeft+clampSystm.offsetLeft+clampSystmInner.clientWidth/2;
	if(amingLine<fruits4[0].offsetLeft+20){
		clampMaxdown=fruits4[3].offsetTop-clampSystm.offsetTop-clampSystmInner.clientHeight+90;
		chosenFruit=3;
	}else if(amingLine<fruits4[0].offsetLeft+fruits4[0].clientWidth-30){
		clampMaxdown=fruits4[0].offsetTop-clampSystm.offsetTop-clampSystmInner.clientHeight+30;
		chosenFruit=0;
	}else if((amingLine>fruits4[1].offsetLeft+40)&&(amingLine<fruits4[1].offsetLeft+fruits4[1].clientWidth-50)){
		clampMaxdown=fruits4[1].offsetTop-clampSystm.offsetTop-clampSystmInner.clientHeight+50;
		chosenFruit=1;
	}else if(amingLine>fruits4[2].offsetLeft+50){
		clampMaxdown=fruits4[2].offsetTop-clampSystm.offsetTop-clampSystmInner.clientHeight+30;
		chosenFruit=2;
	}else{
		clampMaxdown=0;
		chosenFruit=4;
	}
	clampTop=clampSystmInner.offsetTop;
	movingClamp2=setInterval(clampDown,5);
}

function clampDown(){
	clampTop+=clampVy;
	clampSystmInner.style.top=clampTop+"px";
	if(clampSystmInner.offsetTop>=clampMaxdown){
		clearInterval(movingClamp2);
		if(chosenFruit==4){
			mask42.style.display="block";
		}else{
			liquid.src="images/liquid"+chosenFruit+".png";
			fruit.src="images/hand"+chosenFruit+".png";
			if(chosenFruit==0){
				fruit.style.top=220+"px";
				fruit.style.left=125+"px";
			}
			if(chosenFruit==3){
				fruit.style.top=270+"px";
				fruit.style.left=101+"px";
			}
			if(chosenFruit==2){
				fruit.style.top=275+"px";
			}
			allSlides[4].style.display="none";
			allSlides[5].style.display="block";

			if(window.DeviceMotionEvent){
				window.addEventListener("devicemotion",DeviceMotionHandler,false);
			}else{
				alert("not support mobile event");
			}
		}
	}
}


/*摇一摇发酵功能模块*/
var shake_threshold=3000;
var last_update=0;
var x=y=z=last_x=last_y=last_z=0;
var progressNum=0;
function deviceMotionHandler(eventData){
	var acceleration=eventData.accelerationIncludingGravity;
	var curTime=new Date().getTime();
	if((curTime-last_update)>100){
		var diffTime=curTime-last_update;
		last_update=curTime;
		x=acceleration.x;
		y=acceleration.y;
		z=acceleration.z;
		var speed=Math.abs(x+y+z-last_x-last_y-last_z)/diffTime*10000;
		if(speed>shake_threshold){
			fruit.className="movingFruit";
			progressNum+=25;
			loadingText2.innerHTML=progressNum+"%";
			loadingProgress2.style.transform="translateX("+(progressNum-100)+"%)";
			if(progressNum>=100){
				window.removeEventListener("devicemotion",DeviceMotionHandler,false);
			}
		}
		last_x=x;
		last_y=y;
		last_z=z;
	}
}