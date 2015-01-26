(function(){
bq.addModule("self","no",0);
var ele=bq("dom"),route=bq("route"),plate=bq("plate");
var web=bq("web"), strings=bq("string"),self=bq("self");
var mob=bq.tfmobile(),wds=ele.pageWidth();

// 根据设备类型初始化click事件
if(mob){
self.click="touchstart";
}
else{self.click="click";}
if(window.screen.availWidth<500){
ele.dom("#bq-canvas-draw").width=260,ele.dom("#bq-canvas-draw").height=160;
self.speed=0.2;}
else{self.speed=0.05;}



//汇集函数
bq.insertFun({
// 事件路由函数
media:function(e,ts,arr){
if(bq.ie9()){route.runRoute("moveshow/noticered").innerHTML="ie9不支持获取你的媒体文件信息";return false;}
var file=ts.files[0];
ele.dom(arr[4]).value="";
if(mob&&wds<500&&file.size>2*1024*1024){
route.runRoute("moveshow/noticered").innerHTML="手机端发送文件不能过2M";return false;}
if(file.type.indexOf("video")!==-1&&file.type.indexOf("mp4")===-1){route.runRoute("moveshow/noticered").innerHTML="视频只支持mp4";return false;}
ele.readBlob(file,"url",function(url,mime){
if(mime.indexOf(arr[0])!==-1){
var ob=ele.dom(arr[1]);
ele.addStyle(arr[2],"display","none");
ob.style.display="inherit";
ob.src=url;
ele.dom("#sendx").setAttribute("data-type",arr[0]);
ele.animate(arr[3],{display:"inherit",opacity:0,marginLeft:"0px"},{marginLeft:"10px",opacity:1},5,{opacity:self.speed,marginLeft:1});
}
});
},
fade:function(e,ts,arr){
var dm=ele.dom(arr[0]);
//特殊排除
if(arr[0]==="#bq-edituser"){
ele.exchangeAttr("#bq-cg","src","img/16/f.png","img/16/h.png",1);
if(dm.style.display==="inherit"){dm.style.display="none";return;}
}
ele.animate(dm,{display:"inherit",opacity:0,marginLeft:"0px"},{marginLeft:"10px",opacity:1},5,{opacity:self.speed,marginLeft:1});
//特殊排除
if(arr[1]){ele.dom("#sendx").setAttribute("data-type","text");}
},
open:function(e,ts,arr){
var pare=ts.parentNode;
var form=ele.dom(arr[0]),dis=ele.getStyle(form,"display");
ele.excludeDom(arr[1],function(ob){if(ob.id!==arr[0]){ob.lastElementChild.style.display="none",ob.style.display="none";}});
if(dis==="none"){
ele.animate(form,{display:"inherit",opacity:0},{opacity:1},5,{opacity:self.speed,marginLeft:1},null);
}
else{ele.dom(arr[2]).style.display="none";form.style.display="none";   }
},
slide:function(e,ts){
var rem=ts.nextElementSibling;
if(ele.getStyle(rem,"display")==="inherit"){
ele.ctr_animate("a",1),ele.ctr_animate("b");
ele.animate(rem,{marginLeft:"0px",opacity:1},{marginLeft:"20px",opacity:0},5,{opacity:self.speed,marginLeft:2},function(ob){ob.style.display="none";},"a");
}
else{ts.querySelector(".num").innerHTML="";
ele.ctr_animate("a"),ele.ctr_animate("b",1);
ele.animate(rem,{marginLeft:"-20px",display:"inherit",opacity:0},{marginLeft:"0px",opacity:1},5,{opacity:self.speed,marginLeft:2},null,"b");
}
},
// 路由函数
moveshow:function(arr,tmp){
var dm;
if(tmp){dm=ele.dom(tmp);}else{dm=ele.dom(arr[0]);}
var ob1=arr[1]?strings.strOb(arr[1]):null,ob2=arr[2]?strings.strOb(arr[2]):null,ob3=arr[3]?strings.strOb(arr[3]):null;
ele.animate(dm,ob1,ob2,5,ob3);
if(arr[4]){setTimeout(function(){dm.style.display="none";},5000);}
return dm;
},
whatblock:function(arr,para){
var sect;
switch(arr[0]){
case "video":sect="<video controls><source src='video/"+para.id+"."+para.content+"' type='video/mp4'></source></video>";break;
case "text":sect=para.content.replace(/kongge/g,"&nbsp");break;
case "image":sect="<img style='width:100%' src='img/"+para.id+"."+para.content+"'/>";break;
default:;break;
}
html=plate.mdHtml(self.temp,{id:"art"+para.id,head:para.title,section:sect});
dm=ele.htmlDom(html);
if(self.no%2===0){ele.setChildfirst("#left",dm);ele.animate(dm,{display:"inherit",opacity:0},{opacity:1},500,self.speed);}
else{ele.setChildfirst("#right",dm);ele.animate(dm,{display:"inherit",opacity:0},{opacity:1},500,self.speed);}
self.no+=1;
route.runRoute("moveshow/cont",dm);
ele.addEvt(dm.querySelector(".isert"),self.click,bq.findFun("slide"),false);
ele.addEvt(dm.querySelector(".nav"),self.click,function(e,ts){
var nam=ts.previousElementSibling.value;
var cont=ts.nextElementSibling.value,id=ts.parentNode.parentNode.id.slice(3);
if(!nam||!cont){route.runRoute("moveshow/noticered").innerHTML="有内容为空";return false;}
var str="table=remark&name=name|content|ids&value="+nam+"|"+cont+"|"+id;
web.sendText("get","/publish/",str,function(da){
if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="评论失败";}else{web.sendSocket("sock","mark",da);}
},function(){
route.runRoute("moveshow/noticered").innerHTML="失败";
});
},false,6000,function(){route.runRoute("moveshow/noticered").innerHTML="发送间隔6秒后您才能评论";});
},
// 非路由模块
addremark:function(ob,dm){
if(dm.length!==undefined){dm=dm[0];}
var names=ob.name;
var sections=ob.section;
if(names&&sections){
names=names.split("&"),sections=sections.split("&");
var s=sections.length;
for(var j=0;j<s;j+=1){
html=plate.mdHtml(self.mark,{name:names[j],content:sections[j]});
ddm=ele.htmlDom(html);
if(ele.getStyle(dm.querySelector(".remark"),"display")!=="inherit"){
nodom=dm.querySelector(".num");
if(!nodom.innerHTML){nodom.innerHTML=1;}
else{nodom.innerHTML=+nodom.innerHTML+1;}
}
if(dm)dm.querySelector(".remark").appendChild(ddm);
}}},

getdraw:function(ob,tf){
var no=0;
if(tf){no=ob;}else{no=ob.id}
if(ob==="bad"){return false;}
web.sendText("get","/bigtxt/",no,function(da){console.log(da);
html=plate.mdHtml(self.temp,{id:"art"+no,head:ob.title,section:"<img style='width:100%'  class='figure'/>"});
dm=ele.htmlDom(html);
if(self.no%2===0){ele.setChildfirst("#left",dm);ele.animate(dm,{display:"inherit",opacity:0},{opacity:1},500,self.speed);}
else{ele.setChildfirst("#right",dm);ele.animate(dm,{display:"inherit",opacity:0},{opacity:1},500,self.speed);}
self.no+=1;
dm.querySelector(".figure").src=da;
route.runRoute("moveshow/cont",dm);
ele.addEvt(dm.querySelector(".isert"),self.click,bq.findFun("slide"),false);
if(!tf){bq.findFun("addremark")(ob,dm);}
ele.addEvt(dm.querySelector(".nav"),self.click,function(e,ts){
var nam=ts.previousElementSibling.value;
var cont=ts.nextElementSibling.value,id=ts.parentNode.parentNode.id.slice(3);
if(!nam||!cont){route.runRoute("moveshow/noticered").innerHTML="有内容为空";return false;}
var str="table=remark&name=name|content|ids&value="+nam+"|"+cont+"|"+id;
web.sendText("get","/publish/",str,function(da){
if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="评论失败";}else{web.sendSocket("sock","mark",da);}
},function(){
route.runRoute("moveshow/noticered").innerHTML="网络有点问题,刷新一次";
});
},false,6000,function(){route.runRoute("moveshow/noticered").innerHTML="发送间隔6秒后您才能评论";});
})}
});
//事件汇集实参
bq.insertArgument({
media_b:["video","#bq-send-video",".bq-send-file",".bq-send-b","bq-send-img"],
media_a:["image","#bq-send-img",".bq-send-file",".bq-send-b","#bq-send-video"],
fade_a:[".bq-send-b","text"],fade_b:[".bq-draw-b"],fade_c:["#bq-edituser"],
open_a:["#bq-send-form",".bq-form",".bq-send-b"],open_b:["#bq-draw-form",".bq-form",".bq-draw-b"],
col_a:["green"],col_b:["red"],
red:["#notice","display=inherit&opacity=0&backgroundColor=rgb(250,100,100)","opacity=1","opacity="+self.speed,1],
green:["#notice","display=inherit&backgroundColor=rgb(100,250,100)","opacity=1","opacity="+self.speed,1],
nocolor:[null,"display=inherit&opacity=0","opacity=1","opacity="+self.speed],
img:["image"],video:["video"],text:["text"]
});

/*共用事件*/
ele.addEvt("#send-file-img,#send-file-video",["change.media_a","change.media_b"],bq.findFun("media"),false);
ele.addEvt("#user,#send-textarea,#draw",["click.fade_c","click.fade_a","click.fade_b"],bq.findFun("fade"),false);
ele.addEvt(".bq-sider-send",["click.open_a","click.open_b"],bq.findFun("open"),false);






// 共用路由
route.addRoute("moveshow/noticered.red",bq.findFun("moveshow"));
route.addRoute("moveshow/noticegreen.green",bq.findFun("moveshow"));
route.addRoute("moveshow/cont.nocolor",bq.findFun("moveshow"));
route.addRoute("block/image.img",bq.findFun("whatblock"));
route.addRoute("block/text.text",bq.findFun("whatblock"));
route.addRoute("block/video.video",bq.findFun("whatblock"));




self.temp='<div class="article" id="?id?"><div class="head">?head?</div><div class="section">?section?</div> <div class="isert"><img src="img/a/rm.png" height="24" width="24" class="rep"/><span class="num"></span></div> <div class="remark"><input type="text" class="you"  placeholder="使用名称"><span class="nav">评论</span><textarea class="message" rows="2" placeholder="输入您的评论"></textarea></div></div>';
self.mark='<div><div class="markx">?name?</div><div class="marky">?content?</div></div>';
self.list={start:1,lg:5},self.ctr={fd:0},self.process=0;

// if(mob&&screen.availWidth>=1000&&wds<480){
// document.styleSheets[0].disabled=true;
// document.styleSheets[1].disabled=true;
// var link=ele.toTag("link");
// link.rel="stylesheet",link.href="css/mobile.css",link.type = "text/css";
// document.getElementsByTagName("head")[0].appendChild(link);
// }



//存储刷新列表
route.done(function(){
var ob=self.list;
ele.sendText("get","/firstlist","table=message&start="+ob.start+"&lg="+ob.lg,null,function(baddat){console.log(baddat);route.runRoute("moveshow/noticered").innerHTML="网络有点小问题";self.process=0;ele.rotateCircle.pro=1;bq.asyc_find("begin").item=-1;},null,null,"begin")},"begin")
.done(
function(para){
if(para==="bad"){route.runRoute("moveshow/noticered").innerHTML="网络有问题,可以刷新再试99";return false;}
if(para==="nodata"){route.runRoute("moveshow/noticered").innerHTML="没有更多的数据了";return false;}
var ob=strings.unionSql(para,"id",["name","section"]);
if(!ob){return;}
var n=ob.length,midob,tp="",html,dm;
self.list.start+=n;
for(var i=0;i<n;i+=1){
midob=ob[i],id=midob.id;
if(midob.type==="text"){
route.runRoute("block/text",midob);
bq.findFun("addremark")(midob,ele.dom("#art"+id));
}
else if(midob.type==="image"){
route.runRoute("block/image",midob);
bq.findFun("addremark")(midob,ele.dom("#art"+id));
}
else if(midob.type==="video"){
if(mob&&wds<500){continue;}
route.runRoute("block/video",midob);
bq.findFun("addremark")(midob,ele.dom("#art"+id));
}
else if(midob.type==="cgimg"){
bq.findFun("getdraw")(midob);
}
}
},"begin");

/*非共用事件*/
// 文本发送的
ele.addEvt("#top",self.click,function(){window.scrollTo(0,0);
ele.ctr_animate("a",1),ele.ctr_animate("b");
ele.animate("#top",null,{opacity:0},5,self.speed,function(ob){ob.style.display="none";},"a");
self.ctr.fd=0;
},false,3000);

ele.addEvt("#viewmes",self.click,function(){
ele.dom("#noti").innerHTML="";
route.done("run","begin");
},false,1000);


if(document.body.onwheel!==undefined){
ele.addEvt(document.body,"wheel",function(e,ts){
var top=ele.pageTop(),hg=ele.pageHeight(),ahg=ele.pageAllheight();
if(!top&&e.deltaY<0){
ele.dom("#noti").innerHTML="";
route.done("run","begin");
}
},false,4500);
}
else if(document.body.onmousewheel){
ele.addEvt(document.body,"mousewheel",function(e,ts){
var top=ele.pageTop(),hg=ele.pageHeight(),ahg=ele.pageAllheight();
if(!top&&e.wheelDelta>0){
ele.dom("#noti").innerHTML="";
route.done("run","begin");
}
});
}
else{}

if(mob){
ele.addEvt(document.body,"touchcancel",function(e,ts){
var top=ele.pageTop(),hg=ele.pageHeight(),ahg=ele.pageAllheight();
if(!top){ele.dom("#noti").innerHTML="";route.done("run","begin");
}
},false,6500);
ele.addEvt(document.body,"touchend",function(e,ts){
var top=ele.pageTop(),hg=ele.pageHeight(),ahg=ele.pageAllheight();
if(!top){ele.dom("#noti").innerHTML="";route.done("run","begin");
}
},false,5000);
}
else{
ele.addEvt(window,"scroll",function(e,ts){
var top=ele.pageTop();
if(top>10){
ele.ctr_animate("a"),ele.ctr_animate("b",1);
if(self.ctr.fd===0){ele.animate("#top",{opacity:0,display:"inherit"},{opacity:1},5,self.speed,null,"b");
self.ctr.fd=1;
}
}
else{
if(self.ctr.fd===1){
ele.ctr_animate("a",1),ele.ctr_animate("b");
ele.animate("#top",null,{opacity:0},5,self.speed,function(ob){ob.style.display="none";},"a");
self.ctr.fd=0;
}
}
},false,1000);}

ele.addEvt(".bq-text,#bq-send-textarea","focus",function(e,ts){
ele.removeClass(ts,"focus");
},false);

ele.addEvt("#send-textarea",self.click,function(e,ts){
var ob=ele.dom("#bq-send-textarea");
ele.addStyle(".bq-send-file","display","none");
ele.each(".send-file",function(ob,ind){ob.value="";});
ob.style.display="inherit";
},false);
//添加绘画功能

if(mob&&wds<500){
var top=screen.availHeight-385, left=screen.availWidth*0.05+10;
}
else{var left=ele.dom("#aside").offsetLeft+420,top=ele.dom("#aside").offsetTop;}
ele.canvasDraw(ele.dom("#bq-canvas-draw"),left,top);
ele.addEvt("#bq-draw-clear",self.click,function(){
var dm=ele.dom("#bq-canvas-draw"),wd=dm.width,hg=dm.height;
ele.dom("#bq-canvas-draw").getContext("2d").clearRect(0,0,wd,hg);
},false);
ele.addEvt(".bq-color",self.click,function(e,ts){
var cx=ele.dom("#bq-canvas-draw").getContext("2d");
cx.strokeStyle=ts.id;
});
ele.addEvt(".bq-width",self.click,function(e,ts){
var cx=ele.dom("#bq-canvas-draw").getContext("2d");
cx.lineWidth=+ts.id.slice(1);
});
ele.addEvt(".iclose",self.click,function(e,ts){
var nd=ts.parentNode.nextElementSibling;
if(nd.style.display!=="none"){nd.style.display="none"}
nd.parentNode.style.display="none";
},false);
// 所有的渐变扩散效果
if(mob){}
else{
ele.each(".bq-canvas-extend",function(ob,ind){
ele.addEvt(ob.parentNode,self.click+"/extend",function(e,ts){
ob.style.display="inherit";
ele.bigCircle(ob,{borderColor:"rgba(40,150,230,0.2)",width:5},8,"border");
},false,800);
});}
plate.module("#public","root");
ele.writeMessage("#edit",".face","mes");
ele.addEvt("#pubsend",self.click,function(e,ts){
var content=ele.dom("#edit").innerHTML,from=ele.dom("#head-send").value,str="from="+from+"&content="+content;
if(!strings.stricts([from,content],[{notempty:true,min:2,max:10},{notempty:true,max:1900}])){
route.runRoute("moveshow/noticered").innerHTML="名字内容不能为空,内容不能太多";
return false;
}
web.sendSocket("sock","public",str);
ele.dom("bq-cg")
ts.parentNode.style.display="none";
ele.exchangeAttr("#bq-cg","src","img/16/f.png","img/16/h.png",1);
},false,7000,function(){route.runRoute("moveshow/noticered").innerHTML="发送间隔7秒后您才能再次发送";});

ele.addEvt("#sendy",self.click,function(e,ts){

var tit=ele.dom("#drawtxt"),can=ele.dom("#bq-canvas-draw"),str,fil=can.toDataURL("img/png");
if(!tit.value){ele.addClass(tit,"focus");route.runRoute("moveshow/noticered").innerHTML="没有标题";return false;}
if(fil.length>5*1024*1024){route.runRoute("moveshow/noticered").innerHTML="文件过大";return false;}
str="table=message&"+"name="+tit.getAttribute("data-name")+"|type|content&value="+tit.value+"|cgimg|png";

if(self.process){route.runRoute("moveshow/noticered").innerHTML="还有正在发送的文件";return;}
self.process=1;
ele.rotateCircle.pro=0;

ele.rotateCircle("#process",20,"border",15,15,10,{width:5,borderColor:"green"},0,0.8,300,"pro");
web.sendText("get","/num","table=message",function(dat){dat=(+dat)+1;
console.log(dat);
web.sendFile("/img/"+dat+".png",fil,function(){
web.sendText("get","/publish",str,function(da){console.log(da);if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;}else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";web.sendSocket("sock","pubcanvas",da);self.process=0;ele.rotateCircle.pro=1;}},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
},function(){
	route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;
});
},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
ele.animate(".bq-draw-b",null,{opacity:0},5,self.speed,function(bb){bb.style.display="none";});
},false,2000);


//图文发送的事件---这个函数以后还会改成模版的方式
ele.addEvt("#sendx",self.click,function(e,ts){

var video=ele.dom("#send-file-video"),img=ele.dom("#send-file-img"),txt=ele.dom("#bq-send-textarea"),str="";
var tp=ts.getAttribute("data-type"),ob={},dm=ele.dom("#sendtxt");
if(!dm.value){ele.addClass(dm,"focus");route.runRoute("moveshow/noticered").innerHTML="标题不能为空";return;}
if(dm.value.length<2||dm.value.length>200||dm.value.indexOf("&")!==-1){route.runRoute("moveshow/noticered").innerHTML="字符输入不符合规范";return false;}
if(tp==="video"){
var fil=video.files[0],mime=strings.getStr(fil.type,"last"),siz=1*1024*1024,filesize=fil.size;
if(mime.indexOf("mp4")===-1){route.runRoute("moveshow/noticered").innerHTML="暂时只支持mp4";}
if(filesize>5*1024*1024){route.runRoute("moveshow/noticered").innerHTML="文件过大";return false;}
str="table=message&"+"name="+dm.getAttribute("data-name")+"|type|content&value="+dm.value+"|video|"+mime;

if(self.process){route.runRoute("moveshow/noticered").innerHTML="还有正在发送的文件";return;}
self.process=1;
ele.rotateCircle.pro=0;

ele.rotateCircle("#process",20,"border",15,15,10,{width:5,borderColor:"green"},0,0.8,3000,"pro");

web.sendText("get","/num","table=message",function(dat){dat=(+dat)+1;
if(filesize<siz){
web.sendFile("/video/"+dat+"."+mime,fil,function(){
web.sendText("get","/publish",str,function(da){if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;}else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";self.process=0;ele.rotateCircle.pro=1;web.sendSocket("sock","publish",da);}},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
},function(){
	route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";
	self.process=0;
ele.rotateCircle.pro=1;
});
}
else{
web.sendFileBlock("/videoblock/"+dat+"."+mime,fil,function(){
web.sendText("get","/publish",str,function(da){if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;}else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";web.sendSocket("sock","publish",da);self.process=0;ele.rotateCircle.pro=1;}},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
},function(){
	route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;
},0.5*1024*1024,3500);}
},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";	self.process=0;ele.rotateCircle.pro=1;});
}
else if(tp==="image"){
var fil=img.files[0],mime=strings.getStr(fil.type,"last");
if(fil.size>2*1024*1024){route.runRoute("moveshow/noticered").innerHTML="文件过大";return false;}
str="table=message&name="+dm.getAttribute("data-name")+"|type|content&value="+dm.value+"|image|"+mime;
if(self.process){route.runRoute("moveshow/noticered").innerHTML="还有正在发送的文件";return;}
self.process=1;
ele.rotateCircle.pro=0;
ele.rotateCircle("#process",20,"border",15,15,10,{width:5,borderColor:"green"},0,0.8,3000,"pro");
web.sendText("get","/num","table=message",function(dat){dat=(+dat)+1;
web.sendFile("/img/"+dat+"."+mime,fil,function(){
web.sendText("get","/publish",str,function(da){if(da==="bad"){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;}else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";web.sendSocket("sock","publish",da);self.process=0;ele.rotateCircle.pro=1;}},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
},function(){
	route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;
});
},function(){route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;});
}
else{
var txtvalue=txt.value;
if(!txtvalue){ele.addClass(txt,"focus");route.runRoute("moveshow/noticered").innerHTML="内容是空的";return;}
if(txtvalue.indexOf("|")!==-1||txtvalue.indexOf("&")!==-1||txtvalue.indexOf("=")!==-1||txtvalue.indexOf("kongge")!==-1){route.runRoute("moveshow/noticered").innerHTML="不能输入|&=特殊字符";return;}
ob=ele.sqlData("#sendtxt,#bq-send-textarea","value");
str=encodeURIComponent("table=message&"+"name="+ob.name+"|type&value="+ob.value+"|text");
if(txtvalue>2000){
web.sendText("post","/publish",str,function(da){if(da==="bad"){
	route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;
return;
}
else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";
web.sendSocket("sock","publish",da);self.process=0;ele.rotateCircle.pro=1;}
},function(){},null);
}
else{
web.sendText("get","/publish",str,function(da){if(da==="bad"){
route.runRoute("moveshow/noticered").innerHTML="网络有点小问题,重试一下";self.process=0;ele.rotateCircle.pro=1;
return;
}
else{route.runRoute("moveshow/noticegreen").innerHTML="发送成功";
web.sendSocket("sock","publish",da);self.process=0;ele.rotateCircle.pro=1;}
},function(){},null);
}
}
ele.animate(".bq-send-b",null,{opacity:0},5,self.speed,function(bb){bb.style.display="none";});
},false,2000);



// 页面载入运行一次刷新
route.done("run","begin");
// 页面载入运行一次通知路由
if(localStorage.page||!window.localStorage){ele.dom("#article").style.opacity=1;route.runRoute("moveshow/noticegreen").innerHTML="向上滚动或点击加号刷新信息";}

//第一次载入界面的连缀动画.
if(!localStorage.page&&localStorage){
ele.dom("#page").style.display="inherit";
ele.animate("#anix",null,{width:"200px",height:"50px"},500,{width:20,height:5},function(ob){ob.innerHTML="框架实例(后端为node)"},"page").
done(function(){ele.animate("#aa",null,{width:"180px"},1000,5,function(ob){ob.innerHTML="dom模块"},"page")},"page").
done(function(){ele.animate("#bb",null,{width:"100px"},1000,5,function(ob){ob.innerHTML="网络模块"},"page")},"page").
done(function(){ele.animate("#cc",null,{width:"150px"},1000,5,function(ob){ob.innerHTML="路由模块"},"page")},"page").
done(function(){ele.animate("#dd",null,{width:"120px"},1000,5,function(ob){ob.innerHTML="模版模块"},"page")},"page").
done(function(){ele.animate("#ee",null,{width:"190px"},1000,5,function(ob){ob.innerHTML="前后端分离,交换字符串"},"page")},"page").
done(function(){ele.animate("#page",null,{opacity:0,width:"0px"},2000,{opacity:0.05,width:10},function(ob){ob.style.display="none",ele.dom("#article").style.opacity=1,localStorage.page=1;route.runRoute("moveshow/noticegreen").innerHTML="向上滚动或点击加号刷新信息";},"page")},"page").
done("end","page");
}




web.socket("sock","http://120.24.210.221/");
// web.socket("sock","http://120.24.210.221/");
web.getSocket("sock","public",function(data){
var ob=strings.strOb(data),ts=ele.dom("#public");
ele.clearTimefun("hide");
ele.animate(ts,{display:"inherit",opacity:0,marginLeft:"0px"},{marginLeft:"10px",opacity:1},5,{opacity:self.speed,marginLeft:1},function(){
plate.sync("root-des","parent",{head:ob.from,cont:ob.content});
});
ele.timeFun("hide",function(){ts.style.display="none";},10000);
});

web.getSocket("sock","ok",function(da){
if(da==="ok"){
route.runRoute("moveshow/noticegreen").innerHTML="您已成功发布一条消息";
}
});

web.getSocket("sock","pubcanvas",function(no){
var no =ele.dom("#noti").innerHTML;
if(!no){ele.dom("#noti").innerHTML=1;}
else{ele.dom("#noti").innerHTML=(+no)+1;}
});


web.getSocket("sock","publish",function(id){
var no =ele.dom("#noti").innerHTML;
if(!no){ele.dom("#noti").innerHTML=1;}
else{ele.dom("#noti").innerHTML=(+no)+1;}
});

web.getSocket("sock","mark",function(da){
var str="table=remark&name=*&where={id:"+da+"}";
web.sendText("get","/getmessage",str,function(obs){
var ob=JSON.parse(obs),id=ob[0].ids,ddm,str="",dom,nodom;
html=plate.mdHtml(self.mark,{name:ob[0].name,content:ob[0].content});
ddm=ele.htmlDom(html);
str="#art"+id;
dom=ele.dom("#art"+id);
if(!dom){return false;}
if(ele.getStyle(dom.querySelector(".remark"),"display")!=="inherit"){
nodom=dom.querySelector(".num");
if(!nodom.innerHTML){nodom.innerHTML=1;}
else{nodom.innerHTML=+nodom.innerHTML+1;}
}
dom.querySelector(".remark").appendChild(ddm);
});
});
})();