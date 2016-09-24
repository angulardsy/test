var data=null;
into();
function into(){
	//通过ajax请求获取JSON
	getData();
	//调用插件
	new FocusImg({
        json:data,
        wrap:document.getElementById("box"),
        auto:true
	})
    

}
function getData(e){
	if(window.XMLHttpRequest){
		 var xhr=new XMLHttpRequest();
		}else{
			var xhr=new ActiveXObject('Microsoft.XMLHTTP');
		}
 //创建一个HTTP请求
       xhr.open("get","data.json",false);
        //接收数据
        xhr.addEventListener("readystatechange",function(){
                 if(xhr.readyState==4 && (xhr.status>=200 && xhr.status<300)){
                 	//将字符串转换成数组
                 	  data=eval("("+xhr.responseText+")");
                 }
        },false)
       //发送
       xhr.send(null);
      

}