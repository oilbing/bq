bq.addModule("dom",{
pageUp:function(dm,delay,num1,num2,aimob,ob1,ob2,hook){
var dom=(dm!=="this")?this.dom(dm):this.thisDom,cx=dom.getContext("2d"),that=this,n=0,m=0;
var wd=dom.width,hg=dom.height;
setTimeout(function xx(){
if(n<aimob){cx.clearRect(0,0,wd,hg);}else{if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}} return;}
var lingrad = cx.createLinearGradient(0,200,400,0);
lingrad.addColorStop(0, '#B3F4B8');
lingrad.addColorStop(0.5, '#69FF44');
lingrad.addColorStop(1, '#2E851F');
that.curveLine(cx,ob1,"new",wd-3*n/4,3*m/4,wd-3*n/4,3*m/8,wd-n,0,wd-n/4,4/m,wd,m,wd-3*n/8,3*m/4,wd-3*n/4,3*m/4);
cx.beginPath();
cx.moveTo(0,0);
that.line(cx,"old",wd-n,0,1);
that.curveLine(cx,"old",wd-3*n/4,3*m/8,wd-3*n/4,3*m/4,wd-3*n/8,3*m/4,wd,m,1);
that.line(cx,"old",wd,m,wd,hg,0,hg,0,0,1);
cx.shadowColor= "#000000",cx.shadowOffsetX=0,cx.shadowOffsetY=0,cx.shadowBlur=0;
cx.fillStyle=ob2.backgroundColor;
cx.fill();
that.curveLine(cx,ob2,0,0,wd-n,0,wd-n,0,wd-3*n/4,3*m/8,wd-3*n/4,3*m/4,wd-3*n/8,3*m/4,wd,m,wd,hg,0,hg,0,0);
n+=num1,m+=num2;
if(window.animationframe){animationframe(xx);}else{setTimeout(xx,1000/60);}
	},delay);
},
//x,y分别为增长的x轴和y轴,begx为起点,,,x,y表示每次正佳,aim表示x的最大
animateLine:function(dm,delay,begx,begy,x,y,aim,ob,hook){
var dom=(dm!=="this")?this.dom(dm):this.thisDom,cx=dom.getContext("2d"),that=this,tf=begx<aim?true:false;
cx.restore();
cx.beginPath();
cx.moveTo(begx,begy);
setTimeout(function liz(){
if(tf){if(begx>=aim){if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}} return;}}else{if(begx<=aim){if(hook){var obj=tis.asyc_find(hook);if(obj!==false){tis.asyc_fun(hook);}} return;}}
begx+=x,begy+=y;
that.line(cx,"old",begx,begy);
if(ob.width){cx.lineWidth=ob.width,cx.strokeStyle=ob.borderColor,cx.stroke();}
if(window.animationframe){animationframe(liz);}else{setTimeout(liz,1000/60);}
},delay);
},
//dm为dom元素的,tp为border的时候为圆圈转动,其他为一个小圆块,start为开始的点,end为后一点,aimno为MAth.Pi的多少倍,x,y为圆心,r为半径
rotateCircle:function(dm,delay,tp,x,y,r,ob,start,end,aimno,hook){
var dom=(dm!=="this")?this.dom(dm):this.thisDom,n=start,m=end,cx=dom.getContext("2d"),that=this,wd=0;
// var wd=dom.width,hg=dom.height,min=Math.min(wd,hg);
cx.restore();
cx.save();
cx.translate(x,y);
if(ob.width){wd=ob.width;}
setTimeout(function xx(){
if(hook){if(that.rotateCircle[hook]){if(n%2===0){cx.clearRect(-r-wd,-r-wd,2*r+2*wd,2*r+2*wd);return;}}}
if(n<=aimno)cx.clearRect(-r-wd,-r-wd,2*r+2*wd,2*r+2*wd);
n+=0.05,m+=0.05;
n=+(n.toFixed(2)),m=+(m.toFixed(2));
if(n>aimno){if(n%2===0){cx.clearRect(-r-wd,-r-wd,2*r+2*wd,2*r+2*wd);return;}}
cx.beginPath();
if(tp!=="border"){cx.moveTo(0,0);}
that.circle(cx,"old",0,0,r,n*Math.PI,m*Math.PI);
if(ob.backgroundColor){cx.fillStyle=ob.backgroundColor,cx.fill();}
if(wd){cx.lineWidth=ob.width,cx.strokeStyle=ob.borderColor,cx.stroke();}
if(window.animationframe){animationframe(xx);}else{setTimeout(xx,1000/60);}
	},delay);
return this;
},

//dm为dom元素的,tp为border的时候为圆圈转动,其他为一个小圆块,start为开始的点,end为后一点,aimno为MAth.Pi的多少倍,x,y为圆心,r为半径
bigCircle:function(dm,color,num,tp,hook){
var dom=(dm!=="this")?this.dom(dm):this.thisDom,cx=dom.getContext("2d"),r=0,no=0,op=0,that=this;
var wd=dom.width,hg=dom.height,min=Math.min(wd,hg);
dom.style.display="inherit";
(function xx(){
if(that.bigCircle[hook]){cx.clearRect(0,0,wd,hg);dom.style.display="none";return;}
if(r>min){
cx.clearRect(0,0,wd,hg);dom.style.display="none";
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}}
return;
}
cx.clearRect(0,0,wd,hg);
cx.beginPath();
if(tp!=="border"){cx.moveTo(0,0);}
r+=num;
cx.arc(wd/2,hg/2,r,0,2*Math.PI);
if(tp==="border"){cx.strokeStyle=color.borderColor,cx.lineWidth=color.width,cx.stroke();}
else{cx.fillStyle=color,cx.fill();}
if(window.animationframe){animationframe(xx);}else{setTimeout(xx,1000/60);}
	})();
return this;
},
mulbarchart:function(dm,js,col1,col2,col3,gap,barwd,colors,ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8){
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js)==="object"?js:JSON.parse(js),json=js.json,n=json.length,max=js.max,m=js.lg,arr=js.arr,s=arr.length,colob={},midob={},midob1={},midob2={},val="",n1=0,val1="",val2=0,colval=0,styleob={};
var wd=dom.width,hg=dom.height,cx=dom.getContext("2d");
var dotx=60,doty=hg-60,axisx=wd-210,axisy=hg-120,no=Math.ceil(max/gap),spacey=Math.floor((axisy-30)/no),spacex=m>=3?Math.floor((axisx-100)/n):Math.floor((axisx-30)/n),ratey=spacey/gap,tempval=0;
this.line(cx,ob1,"new",dotx,doty,dotx+axisx,doty,dotx+axisx-5,doty-5);
this.line(cx,ob1,"new",dotx+axisx,doty,dotx+axisx-5,doty+5);
this.line(cx,ob1,"new",dotx,doty,dotx,doty-axisy,dotx-5,doty-axisy+5);
this.line(cx,ob1,"new",dotx,doty-axisy,dotx+5,doty-axisy+5);
this.text(cx,col1,ob4,dotx+axisx+10,doty-10);
this.text(cx,col2+" (最大值:)",ob4,dotx-30,doty-axisy-30);
this.rect(cx,wd-100,30,100,20,ob2);
this.text(cx,col1+" - "+col2,ob3,wd-90,32);
for(var i=0;i<s;i+=1){
ob5.color=ob6.borderColor=colob[arr[i]]=colors[i];
this.text(cx,arr[i],ob5,wd-90,32+(i+1)*40);
this.line(cx,ob6,"new",wd-45,37+(i+1)*40,wd,37+(i+1)*40);
}
for(var i=0;i<no;i+=1){
this.circle(cx,ob7,"new",dotx,doty-(i+1)*spacey,5,0,2*Math.PI);
this.text(cx,(i+1)*gap,ob8,dotx-35,doty-(i+1)*spacey-5);
}
for(var i=0;i<n;i+=1){
midob=json[i],val=midob[col1],midob1=midob[col2],n1=midob1.length,midob2=midob[col3];
this.text(cx,val,ob8,dotx+spacex*(i+1),doty+10);
if(n1>1){
for(var j=0;j<n1;j+=1){
val1=midob1[j],val2=midob2[j],colval=ratey*val2;
styleob.color=styleob.backgroundColor=colob[val1],styleob.font="bold 16px arial";
this.rect(cx,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,doty-colval,barwd,colval,styleob);
this.text(cx,val2,styleob,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,doty-colval-20);
}
}
else{
val1=midob1[0],val2=midob2[0],colval=ratey*val2;
styleob.color=styleob.backgroundColor=colob[val1],styleob.font="bold 16px arial";
this.rect(cx,dotx+(i+1)*spacex+3,doty-colval,barwd,colval,styleob);
this.text(cx,val2,styleob,dotx+(i+1)*spacex+3,doty-colval-20);
}
}
},
//js格式要为[{sex:nam,name:[jiu,k],age:[99,89]}],ob1到ob8分别是轴,线等的颜色,粗细样式,可以自己调.
Amulbarchart:function(dm,js,time,col1,col2,col3,gap,barwd,colors,ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8,hook,ts){
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js)==="object"?js:JSON.parse(js),json=js.json,n=json.length,max=js.max,m=js.lg,arr=js.arr,s=arr.length,colob={},midob={},midob1={},midob2={},val="",n1=0,val1="",val2=0,colval=0,styleob={},that=this,tis=ts?ts:this;
var wd=dom.width,hg=dom.height,cx=dom.getContext("2d");
var dotx=60,doty=hg-60,axisx=wd-210,axisy=hg-120,no=Math.ceil(max/gap),spacey=Math.floor((axisy-30)/no),spacex=m>=3?Math.floor((axisx-100)/n):Math.floor((axisx-30)/n),ratey=spacey/gap,tempval=0,ctr="",anival=doty;
this.line(cx,ob1,"new",dotx,doty,dotx,doty-axisy,dotx-5,doty-axisy+5);
this.line(cx,ob1,"new",dotx,doty-axisy,dotx+5,doty-axisy+5);
this.text(cx,col1,ob4,dotx+axisx+10,doty-10);
this.text(cx,col2+" (最大值:)",ob4,dotx-30,doty-axisy-30);
this.rect(cx,wd-100,30,100,20,ob2);
this.text(cx,col2,ob3,wd-70,32);
for(var i=0;i<s;i+=1){
ob5.color=ob6.borderColor=colob[arr[i]]=colors[i];
this.text(cx,arr[i],ob5,wd-90,32+(i+1)*40);
this.line(cx,ob6,"new",wd-45,37+(i+1)*40,wd,37+(i+1)*40);
}
for(var i=0;i<no;i+=1){
this.circle(cx,ob7,"new",dotx,doty-(i+1)*spacey,5,0,2*Math.PI);
this.text(cx,(i+1)*gap,ob8,dotx-35,doty-(i+1)*spacey-5);
}
(function xx(){
cx.clearRect(dotx+10,doty-no*spacey,dotx+axisx-80,doty-60);
that.line(cx,ob1,"new",dotx,doty,dotx+axisx,doty,dotx+axisx-5,doty-5);
that.line(cx,ob1,"new",dotx+axisx,doty,dotx+axisx-5,doty+5);
anival-=time;
ctr="";
for(var i=0;i<n;i+=1){
midob=json[i],val=midob[col1],midob1=midob[col2],n1=midob1.length,midob2=midob[col3];
that.text(cx,val,ob8,dotx+spacex*(i+1),doty+10);
if(n1>1){
for(var j=0;j<n1;j+=1){
val1=midob1[j],val2=midob2[j],colval=ratey*val2;
styleob.color=styleob.backgroundColor=colob[val1],styleob.font="bold 16px arial";
if(anival>doty-colval){
that.rect(cx,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,anival,barwd,doty-anival,styleob);
that.text(cx,val2,styleob,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,anival-20);
ctr+="n";
}
else{
that.rect(cx,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,doty-colval,barwd,colval,styleob);
that.text(cx,val2,styleob,dotx+(i+1)*spacex-(barwd+6)*n1/2+(barwd+6)/2+(barwd+6)*j,doty-colval-20);
ctr+="y";
}
}
}
else{
val1=midob1[0],val2=midob2[0],colval=ratey*val2;
styleob.color=styleob.backgroundColor=colob[val1],styleob.font="bold 16px arial";
if(anival>doty-colval){
that.rect(cx,dotx+(i+1)*spacex+3,anival,barwd,doty-anival,styleob);
that.text(cx,val2,styleob,dotx+(i+1)*spacex+3,anival-20);
ctr+="n";
}
else{
that.rect(cx,dotx+(i+1)*spacex+3,doty-colval,barwd,colval,styleob);
that.text(cx,val2,styleob,dotx+(i+1)*spacex+3,doty-colval-20);
ctr+="y";
}
}
}
if(ctr.indexOf("n")===-1){if(hook){var obj=tis.asyc_find(hook);if(obj!==false){tis.asyc_fun(hook);}}return;}
if(window.animationframe){window.animationframe(xx);}else{setTimeout(xx,1000/60);}
})();

},


barchart:function(dm,js,col1,col2,gapval,barwd,rect,ob,ob1,ob2,ob3,ob4){
//关于js的一层
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js==="object")?js:JSON.parse(js),json=js.arr,n=json.length,max=js.max,val1="",val2=0,midob={};
// 关于canvas本身的一层
var cx=dom.getContext("2d"),wd=dom.width,hg=dom.height;
// 关于坐标的一层
var dotx=60,doty=hg-60,axisx=wd-120,axisy=hg-120,no=Math.ceil(max/gapval),spacey=Math.floor((axisy-30)/no),spacex=Math.floor((axisx-10)/n),colval=0,ratey=spacey/gapval;
this.line(cx,ob1,"new",dotx,doty,dotx+axisx,doty,dotx+axisx-5,doty-5);
this.line(cx,ob1,"new",dotx+axisx,doty,dotx+axisx-5,doty+5);
this.line(cx,ob1,"new",dotx,doty,dotx,doty-axisy,dotx-5,doty-axisy+5);
this.line(cx,ob1,"new",dotx,doty-axisy,dotx+5,doty-axisy+5);
this.text(cx,col1,ob4,dotx+axisx+10,doty-10);
this.text(cx,col2+" (最大值:)",ob4,dotx-30,doty-axisy-30);
this.rect(cx,wd-100,30,100,20,ob2);
this.text(cx,col1+" - "+col2,ob3,wd-90,32);
for(var i=0;i<no;i+=1){
this.circle(cx,ob,"new",dotx,doty-(i+1)*spacey,5,0,2*Math.PI);
this.text(cx,(i+1)*gapval,ob4,dotx-35,doty-(i+1)*spacey-5);
}
for(var i=0;i<n;i+=1){
midob=json[i],val1=midob[col1],val2=midob[col2],colval=ratey*val2;
this.text(cx,val1,ob4,dotx+(i+1)*spacex,doty+10);
this.rect(cx,dotx+(i+1)*spacex-5,doty-colval,barwd,colval,rect);
this.text(cx,val2,ob4,dotx+(i+1)*spacex-6,doty-colval-20);
}
},

Abarchart:function(dm,js,time,col1,col2,gapval,barwd,rect,ob,ob1,ob2,ob3,ob4,hook,ts){
//关于js的一层
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js==="object")?js:JSON.parse(js),json=js.arr,n=json.length,max=js.max,val1="",val2=0,midob={},that=this,tis=ts?ts:this;
// 关于canvas本身的一层
var cx=dom.getContext("2d"),wd=dom.width,hg=dom.height,ctr="";
// 关于坐标的一层
var dotx=60,doty=hg-60,axisx=wd-120,axisy=hg-120,no=Math.ceil(max/gapval),spacey=Math.floor((axisy-30)/no),spacex=Math.floor((axisx-30)/n),colval=0,ratey=spacey/gapval,aimval=doty;
this.line(cx,ob1,"new",dotx,doty,dotx,doty-axisy,dotx-5,doty-axisy+5);
this.line(cx,ob1,"new",dotx,doty-axisy,dotx+5,doty-axisy+5);
this.text(cx,col1,ob4,dotx+axisx+10,doty-10);
this.text(cx,col2+" (最大值:)",ob4,dotx-30,doty-axisy-30);
this.rect(cx,wd-100,30,100,20,ob2);
this.text(cx,col1+" - "+col2,ob3,wd-90,32);
for(var i=0;i<no;i+=1){
this.circle(cx,ob,"new",dotx,doty-(i+1)*spacey,5,0,2*Math.PI);
this.text(cx,(i+1)*gapval,ob4,dotx-35,doty-(i+1)*spacey-5);
}
(function mv(){
cx.clearRect(dotx+10,doty-no*spacey,dotx+axisx-80,doty-60);
that.line(cx,ob1,"new",dotx,doty,dotx+axisx,doty,dotx+axisx-5,doty-5);
that.line(cx,ob1,"new",dotx+axisx,doty,dotx+axisx-5,doty+5);
ctr="";
aimval-=time;
for(var i=0;i<n;i+=1){
that.text(cx,val1,ob4,dotx+(i+1)*spacex,doty+10);
midob=json[i],val1=midob[col1],val2=midob[col2],colval=ratey*val2;
if(aimval>=doty-colval){
that.rect(cx,dotx+(i+1)*spacex-5,aimval,barwd,doty-aimval,rect);
that.text(cx,val2,ob4,dotx+(i+1)*spacex-6,aimval-20);
ctr+="n";
}
else{
that.rect(cx,dotx+(i+1)*spacex-5,doty-colval,barwd,colval,rect);
that.text(cx,val2,ob4,dotx+(i+1)*spacex-6,doty-colval-20);
ctr+="y";
}
}
if(ctr.indexOf("n")===-1){if(hook){var obj=tis.asyc_find(hook);if(obj!==false){tis.asyc_fun(hook);}}return;}
if(window.animationframe){window.animationframe(mv);}else{setTimeout(mv,1000/60);}
})();
},

linechart:function(dm,js,col1,col2,gapval,cir,ob,ob1,ob2,ob3,ob4){
//关于js的一层
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js==="object")?js:JSON.parse(js),json=js.arr,n=json.length,max=js.max,val1="",val2=0,midob={};
// 关于canvas本身的一层
var cx=dom.getContext("2d"),wd=dom.width,hg=dom.height;
// 关于坐标的一层
var dotx=60,doty=hg-60,axisx=wd-120,axisy=hg-120,no=Math.ceil(max/gapval),bmax=no*gapval,spacey=Math.floor((axisy-30)/no),spacex=n>=3?Math.floor((axisx-100)/n):Math.floor((axisx-30)/n),colval=0,ratey=spacey*no/bmax;
this.line(cx,ob1,"new",dotx,doty,dotx+axisx,doty,dotx+axisx-5,doty-5);
this.line(cx,ob1,"new",dotx+axisx,doty,dotx+axisx-5,doty+5);
this.line(cx,ob1,"new",dotx,doty,dotx,doty-axisy,dotx-5,doty-axisy+5);
this.line(cx,ob1,"new",dotx,doty-axisy,dotx+5,doty-axisy+5);
this.text(cx,col1,ob4,dotx+axisx+10,doty-10);
this.text(cx,col2+" (最大值:)",ob4,dotx-30,doty-axisy-30);
this.rect(cx,wd-100,30,100,20,ob2);
this.text(cx,col1+" - "+col2,ob3,wd-90,32);
for(var i=0;i<no;i+=1){
this.circle(cx,ob,"new",dotx,doty-(i+1)*spacey,3,0,2*Math.PI);
this.text(cx,(i+1)*gapval,ob4,dotx-35,doty-(i+1)*spacey-5);
}
for(var i=0;i<n;i+=1){
midob=json[i],val2=midob[col2];
this.line(cx,ob1,"new",dotx+i*spacex,doty-colval,dotx+(i+1)*spacex,doty-ratey*val2);
colval=ratey*val2;
}
for(var i=0;i<n;i+=1){
midob=json[i],val1=midob[col1],val2=midob[col2];
this.text(cx,val1,ob4,dotx+(i+1)*spacex,doty+10);
colval=ratey*val2;
this.circle(cx,cir,"new",dotx+(i+1)*spacex,doty-colval,5,0,2*Math.PI);
this.text(cx,val2,ob4,dotx+(i+1)*spacex-10,doty-colval-35);
}
},

circlechart:function(dm,js,col1,col2,colors,ob1,ob2,ob3,ob4,ob5){
var dom=dm!=="this"?this.dom(dm):this.thisDom,js=(typeof js==="object")?js:JSON.parse(js),json=js.arr,n=json.length,max=0,midob={},val1="",val2=0;
var cx=dom.getContext("2d"),wd=dom.width,hg=dom.height;
var arcval=0,addarc=0,radius=Math.ceil((Math.min(wd,hg)-150)/2),doty=Math.floor(hg/2),dotx=Math.floor((wd-100)/2),color="";
for(var i=0;i<n;i+=1){max+=json[i][col2];}
this.rect(cx,wd-100,30,100,20


	,ob2);
this.text(cx,col1+" - "+col2,ob3,wd-90,32);
for(var i=0;i<n;i+=1){
midob=json[i],val1=midob[col1],val2=midob[col2],addarc=2*(val2/max)*Math.PI;
color=colors[i],ob1.backgroundColor=color,ob4.backgroundColor=color,ob5.borderColor=color;
this.circle(cx,ob1,"new",dotx,doty,radius,arcval,arcval+addarc);
arcval+=2*(val2/max)*Math.PI;
this.text(cx,"-"+val1,ob4,wd-90,32+(i+1)*50);
this.text(cx,Math.round((val2/max)*100,2)+"%",ob4,wd-130,32+(i+1)*50);
this.line(cx,ob5,"new",wd-45,37+(i+1)*50,wd,37+(i+1)*50);
}
}

});

