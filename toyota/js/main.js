// //控制所有音频音量
var audios=document.getElementsByTagName("audio");
// for(var i in audios){
// 	audios[i].volume=0.5;
// }

//获取几个关键音频变量
var Say=document.getElementById("say");
var Say61=document.getElementById("say61");
var Say62=document.getElementById("say62");
var Sounds=document.getElementById("sounds");
var timeSound61=0;
//第一页变量
var SlideP1=document.getElementById("slideP1");
var ClickTip1=document.getElementById("clickTip1");
var Pg1Bg1=document.getElementById("pg1-bg1");
var Pg1Bg2=document.getElementById("pg1-bg2");
var Pg1Txt=document.getElementById("pg1-txt");
var SoundKnock=document.getElementById("soundknock");
var Slide1Control=true;
//第六页变量
var clickTip6=document.getElementById("clickTip6");
var slide6=document.getElementById("slide6");
var glassP6=document.getElementById("glassP6");
var txtP61=document.getElementById("txtP61");
var txtP62=document.getElementById("txtP62");
var Playsay62=null;
//第一页点击事件
slideP1.addEventListener("click",function(){
	if(Slide1Control==true){
		Slide1Control=false;
		ClickTip1.style.display="none";
		Pg1Bg1.style.opacity=0;
		Pg1Bg2.style.opacity=1;
		Pg1Txt.style.opacity=1;
		SoundKnock.play();
		setTimeout(function(){
			Say.play();
			console.log(Say.duration);
		},500);
	}	
},false);

//swiper效果设置
var mySwiper=new Swiper('.swiper-container', {
	direction:"vertical",

	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAnimate(swiper); //初始化完成开始动画
  	}, 

 	onSlideChangeEnd: function(swiper){ 
    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    //根据不同的slide索引播放不同旁白语
    for (var i = 1; i < audios.length; i++) {
    	audios[i].load();
    	audios[i].pause();
    }
    var Index=mySwiper.activeIndex;
    switch(Index){
    	case 1:
    		Sounds.src="music/car.mp3";
    		Say.src="music/say/t"+(Index+1)+".mp3";
    		Sounds.play();
    		Say.play();
    		break;
    	case 2:
    		Sounds.src="music/factory.wav";
    		Say.src="music/say/t"+(Index+1)+".mp3";
    		Sounds.play();
    		Say.play();
    		break;
    	case 3:
    	case 4:
    		glassP6.style.display="none";
    		clickTip6.style.display="block";
    		clearTimeout(Playsay62);
    		Say.src="music/say/t"+(Index+1)+".mp3";
    		Say.play();
    		break;
    	
    	case 5:
    		slide6.className="swiper-no-swiping swiper-slide slide"
    		Sounds.src="music/broken.wav";
    		
    		Say61.play();
    		
    		// console.log(Say61.duration);

    		// timeSound61=Say61.duration*1000+500;
    		
    		txtP61.style.opacity=1;
    		
    		setTimeout(function(){
    			slide6.className="swiper-slide slide"
    		},5000);
    		
    		Playsay62=setTimeout(playSay62,10000);
    		
    		slide6.addEventListener("touchstart",breakGlass,true);
    		break;
    	case 6:	
    	case 7:
    	case 8:
    	case 9:
    	case 10:
    	case 11:
    		clearTimeout(Playsay62);
    		clickTip6.style.display="block";
    		glassP6.style.display="none";
    		Say.src="music/say/t"+(Index+2)+".mp3";
    		Say.play();
    		break;
    	default:
    		break;
    }
    
  	} 
})

function breakGlass(even){
	var e=even||window.event;
	if(!Say61.ended){
		event.preventDefault();
	}
	else{
		Sounds.play();
		glassP6.style.display="block";
		clickTip6.style.display="none";
		txtP62.style.opacity=0;
		slide6.removeEventListener("touchstart",breakGlass,true);
	}
}

function playSay62(){
	txtP61.style.opacity=0;
	txtP62.style.opacity=1;
	Say62.play();

}








































//背景音乐开关按钮
var musicBg=document.getElementById("bgmusic");
var musicBgBtn=document.getElementById("bgmusicbtn");
var musicBgSwitch=true;
//控制背景音乐音量
musicBg.volume=0.1;
musicBgBtn.addEventListener("touchstart",function(){
	if(musicBgSwitch==true){
		musicBg.pause();
		musicBgBtn.src="images/music-stop.png";
		musicBgSwitch=false;
	}
	else{
		musicBg.play();
		musicBgBtn.src="images/music-play.png";
		musicBgSwitch=true;
	}
},false);




//加载页面百分比进度
var arr="sfdafasdfasfdsafdsafdsgfgdhgfhdjhgfkjhgkjhklj;kfhjfhgfsgfdasgdsgfdhgdjkhklgasgshg";
var loadingCount=0;
var loadingTimer=null;
var loadingTimer=setInterval(timesfun,10);

function timesfun(){
	loadingCount+=2;
	if(loadingCount>=arr.length){
		loadingCount=arr.length;
		clearInterval(loadingTimer);
		setTimeout(function(){
			document.getElementById("loadingtab").style.display="none"
		},200);
	}
	document.getElementById("loadingtext").innerHTML=Math.floor(loadingCount*100/arr.length)+"%";
}