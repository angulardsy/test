function FocusImg(opt){
  this.json=opt.json;
  this.wrap=opt.wrap;
  this.auto=!!opt.auto;
  this.init();
  this.render();
  this.bindEvent();
  if(this.auto){
  	this.timer=null;
  	this.autoPlay();
  }
  
}
FocusImg.prototype={
	init:function(){
		this.w=window.innerWidth,
		this.h=window.innerHeight,
		this.Index=0;
		
	},
	//将JSON数据渲染到页面中
	render:function(){
    
      var newul=document.createElement("ul");
      for(var i=0;i<this.json.length;i++){
      	 newli=document.createElement("li");
      	 newli.innerHTML='<img src="'+this.json[i].src+'">';
      	  //设置li的位置
      	  newli.style.left=this.w*i+"px";
         newul.appendChild(newli);

      }      
      this.wrap.appendChild(newul);    
	},
	bindEvent:function(){
		var that=this,
		    startX,offsetX;
		var sFn=function(e){
             startX=e.touches[0].clientX;
             that.timer && clearInterval(that.timer);
		},
		mFn=function(e){
          e.preventDefault();
           offsetX=e.touches[0].clientX-startX;
           var lis=that.wrap.getElementsByTagName("li");
           var j=that.Index-1,len=that.Index+1;
           for(j;j<=len;j++){
           	lis[j] && (lis[j].style.left=(j-that.Index)*that.w+offsetX+"px");
           }
		},
		eFn=function(e){
           if(offsetX>30){
              that.changeImg("-1")
           }else if(offsetX<-30){
               that.changeImg("+1")
           }else{
                that.changeImg("0")
           }
		};
		this.wrap.addEventListener("touchstart",sFn,false);
		this.wrap.addEventListener("touchmove",mFn,false)
		this.wrap.addEventListener("touchend",eFn,false)
	},
	changeImg:function(n){//图片切换
		var lis=this.wrap.getElementsByTagName("li");
        if(typeof(n)==="string"){
        	var num=this.Index+n*1;
        }else if(typeof(n)==="number"){
        	var num=n;
        }
        if(num>=lis.length-1){
        	num=lis.length-1
        }else if(num<=0){
        	num=0;
        }
        var j=num-1,len=num+1;
        for(j;j<=len;j++){
           lis[j] && (lis[j].style.left=(j-num)*this.w+"px");
        }
        this.Index=num;
	},
	autoPlay:function(){
		var that=this;
		this.timer=setInterval(function(){
			that.Index++;
              that.changeImg(that.Index++)
		},2000)
	}
}