"use strict";
(function(whatob){
if('\v'=='v'){console.log('不支持IE678');
location.assign("http://120.24.210.221/browse");
return;
}
var a1,a2,a3,a4,a5,a6,a7,a8,a9,s1,s2,s3,s4,s5,s6,s7,s8,s9,o1,o2,o3,o4,o5,o6;
//最底层的对象,modelobject方法为生成一个name,cotent,item的对象
var proto={
make:function(name,val,tf){this[name]=val;if(tf){Object.defineProperty(this,name,{writeable:false});}},
makes:function(ob){for(var i in ob){this[i]=ob[i];}}
};
a8='\u004f\u0049\u004c';
window.animationframe=(function(){
return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame|| window.msRequestAnimationFrame
})();


//主实例化,返回相关的实例化对象
var bq=function(tp){
var args=arguments,b=args[1]?args[1]:null,c=args[2]?args[2]:null,d=args[3]?args[3]:null;
if(!bq[tp]){throw new bq.ERROR("没有相关模块"); }
return new bq[tp](b,c,d);
};

Object.defineProperty(bq,'version',{value:'1.1',writeable:false,configurable:false});
bq.makes=proto.makes;
bq.make=proto.make;
//算法部分
bq.makes({
// mod是模块名,
addModule:function(mod,name,val){
if(!bq[mod]){bq[mod]=function(){},bq[mod].prototype=bq.prototype;}
if(typeof name==="object"){
for(var i in name){bq[mod].prototype[i]=name[i];}
}
else{
bq[mod].prototype[name]=val;
}
},
evtId:0,
ERROR:function(mes){
this.name="bqerror",this.message=mes;
},
//为一个队列,不用管storage里面存储的类型
easyqueue:function(n){
if(n!==0&&!n){this.max=1000;}else{this.max=n;}
this.lg=0,this.storage=[];
this.find=function(ele){
var n=this.lg,arr=this.storage;
for(var i=0;i<n;i+=1){if(arr[i]===ele){return i;}}
return false;
};
this.top=function(){if(this.lg>0){return this.storage[this.lg-1];}return false;};
this.bottom=function(){if(this.lg>0){return this.storage[0];}return false;}
this.insert=function(ele){var pos=this.find(ele),lg=this.lg,arr=this.storage,max=this.max;
if(pos===false){if(lg+1>max){arr.shift(),arr.push(ele);return this;}else{arr.push(ele);this.lg+=1;return this;}}
else{return false;}
};
this.update=function(ele){
var pos=this.find(ele),arr=this.storage;
if(pos===false){return false;}
else{arr[pos]=ele;return this;}
};
this.dequeue=function(){
if(this.lg<1){return false;}
var ele=this.storage.shift();
this.lg-=1;
return ele;
}
this.clear=function(){this.storage=[],this.lg=0;}
this.trace=function(fun){
var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){fun(arr[i]);}
}
},
//回调针对的整个ob,find是针对的name值
queue:function(n){
if(n!==0&&!n){this.max=1000;}else{this.max=n;}
this.lg=0,this.storage=[];
this.top=function(){if(this.lg>0){return this.storage[this.lg-1]}return false;};
this.bottom=function(){if(this.lg>0){return this.storage[0];}return false;};
this.clear=function(){this.lg=0,this.storage=[];};
this.find=function(name){var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){
if(arr[i].name===name){return arr[i];}
}
return false;
};
this.finditem=function(name){var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){
if(arr[i].name===name){return i;}
}
return false;
};
this.insert=function(ob){var pos=this.find(ob.name),lg=this.lg,arr=this.storage,max=this.max;
if(pos===false){
if(lg+1>max){arr.shift(),arr.push(ob);return this;}else{arr.push(ob),this.lg+=1;return this;}
}
else{
return false;
}
return this;
};
//一次只能插入一个,不能为数组类型
this.update=function(ob,hdcont){
var pos=this.finditem(ob.name),arr=this.storage,cont=ob.content,acont,n;
if(pos===false){return false;}
else{
acont=arr[pos].content;
n=acont.indexOf(cont);
if(n===-1){
acont.push(cont);
}
else{
if(hdcont==="del"){acont.splice(n,1);}
}
for(var i in ob){if(i!=="name"&&i!=="content"){acont[i]=ob[i];}}
return this;
}
};
this.remove=function(fun){var arr=this.storage,ob;
if(this.lg>0){ob=arr.shift(),this.lg-=1;if(fun){fun(ob);} return this;}
return false;
};
this.trave=function(fun,name){
var lg=this.lg,arr=this.storage,i=0;
if(name){i=this.finditem(name);}
for(;i<lg;i+=1){
fun(arr[i]);
}
};
},
easylist:function(n){
if(n!==0&&!n){this.max=1000;}else{this.max=n;}
this.pos=0,this.storage=[],this.lg=0;
this.finditem=function(ele){
var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){if(ele===arr[i]){this.pos=i;return i;}}
return false;
};
this.insertAfter=function(ele,oldele){
var arr=this.storage,pos=this.finditem(ele),apos=this.finditem(oldele),max=this.max,lg=this.lg;
if(pos===false){
if(lg+1>max){arr.splice(apos+1,0,ele),arr.shift();this.pos=apos+1;return this;}else{arr.splice(apos+1,0,ele),this.lg+=1,this.pos=apos+1;return this;}
}
return this;
};
this.insertBefore=function(ele,oldele){
var arr=this.storage,pos=this.finditem(ele),apos=this.finditem(oldele),max=this.max,lg=this.lg;
if(pos===false){
if(lg+1>max){arr.shift();if(apos===0){arr.unshift(ele);this.pos=0;}else{arr.splice(apos-1,0,ele);this.pos=apos-1;}return this;}else{arr.splice(apos,0,ele),this.lg+=1,this.pos=apos;return this;}
}
return this;
};
this.insert=function(ele){
var arr=this.storage,max=this.max,lg=this.lg,pos=this.finditem(ele);
if(pos===false){
if(lg+1>max){arr.push(ele),arr.shift(),this.pos=lg-1;return this;}else{arr.push(ele),this.lg+=1,this.pos=lg;return this;}
}
return this;
};
this.update=function(ele){
var pos=this.finditem(ele),arr=this.storage;
if(pos===false){return false;}
else{
arr[pos]=ele;
return this;
}
};
this.remove=function(ele){
var arr=this.storage,max=this.max,pos=this.finditem(ele);
if(pos===false){return false;}
else{arr.splice(pos,1),this.lg-=1;return this;}
};
this.clear=function(){
this.pos=0,this.storage=[],this.lg=0;
};
this.getele=function(n){
if(n!==undefined)this.pos=n;
return this.storage[this.pos];
};
this.trace=function(fun,ele){
var lg=this.lg,arr=this.storage,i=0;
if(ele){i=this.find(ele);}
if(i===false){i=0;}
for(;i<lg;i+=1){
fun(arr[i]);
}
};
},
//一次插入一个位上的{name:,content:[],x:xx,y:xx},更新更换content的内容(删除还是添加),同时更换x,y的内容...remove移除整个{},只有remove,trace有fun,通过find(name),和getele(位)来获得元素.
list:function(n){
if(n!==0&&!n){this.max=1000;}else{this.max=n;}
this.pos=0,this.storage=[],this.lg=0;
this.find=function(name){
var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){if(name===arr[i].name){this.pos=i;return arr[i];}}
return false;
};
this.finditem=function(name){
var lg=this.lg,arr=this.storage;
for(var i=0;i<lg;i+=1){if(name===arr[i].name){this.pos=i;return i;}}
return false;
};
this.insertAfter=function(ob,name){
var arr=this.storage,pos=this.finditem(ob.name),apos=this.finditem(name),max=this.max,lg=this.lg;
if(apos===false){return false;}
if(pos===false){
if(lg+1>max){arr.splice(apos+1,0,ob),arr.shift();this.pos=apos+1;return this;}else{arr.splice(apos+1,0,ob),this.lg+=1,this.pos=apos+1;return this;}
}
else{return false;}
};
this.insertBefore=function(ob,name){
var arr=this.storage,pos=this.finditem(ob.name),apos=this.finditem(name),max=this.max,lg=this.lg;
if(apos===false){return false;}
if(pos===false){
if(lg+1>max){arr.shift();if(apos===0){arr.unshift(ob);this.pos=0;}else{arr.splice(apos-1,0,ob);this.pos=apos-1;}return this;}else{arr.splice(apos,0,ob),this.lg+=1,this.pos=apos;return this;}
}
else{return false;}
};
//一次只能插入一个,不能为数组类型
var x=1;
this.update=function(ob,hdcont){
var pos=this.finditem(ob.name),arr=this.storage,cont=ob.content,acont,n;
if(pos===false){return false;}
else{
acont=arr[pos].content;
n=acont.indexOf(cont);
if(n===-1){acont.push(cont);}
else{if(hdcont==="del"){acont.splice(n,1);}}
for(var i in ob){if(i!=="name"&&i!=="content"){arr[pos][i]=ob[i];}}
return this;
}
};
this.insert=function(ob){
var arr=this.storage,pos=this.finditem(ob.name),max=this.max,lg=this.lg;
if(pos===false){
if(lg+1>max){arr.push(ob),arr.shift(),this.pos=lg-1;return this;}else{arr.push(ob),this.lg+=1,this.pos=lg;return this;}
}
else{return false;}
};
this.remove=function(name,fun){
var arr=this.storage,max=this.max,pos=this.finditem(name),ob;
if(pos===false){return false;}
else{ob=arr.splice(pos,1),this.lg-=1;if(fun){fun(ob);} return this;}
};
this.clear=function(){
this.pos=0,this.storage=[],this.lg=0;
};
this.getele=function(n){
if(n!==undefined)this.pos=n;
return this.storage[this.pos];
};
this.trace=function(fun,name){
var lg=this.lg,arr=this.storage,i=0;
if(name){i=this.finditem(name);}
for(;i<lg;i+=1){
fun(arr[i],this);
}
};
},

//一次插入一个x:str1的结构,同时只有trace有fun
easydict:function(){
this.storage={},this.lg=0;
//可以为{}的对象放入,也可以但只
this.insert=function(name,val){
var store=this.storage,tp=typeof name;
if(tp==="object"){
for(var i in name){
store[i]=name[i];
this.lg+=1;
}
}
else{
store[name]=val
this.lg+=1;
}
return this;
};
//可以为[]的名字,也可以为一个
this.remove=function(name){
var store=this.storage,tf=store.hasOwnProperty(name);
if(!tf){return false;}
else{delete store[name];this.lg-=1; return this;}
};
this.update=function(name,val){
var store=this.storage,tf=store.hasOwnProperty(name);
if(!tf){return false;}
else{store[name]=val;return this;}
};
this.find=function(name){
var store=this.storage,tf=store.hasOwnProperty(name);
if(!tf){return false;}
else{return store[name];}
};
this.clear=function(){
this.lg=0,this.storage={};
}
this.trace=function(fun){
var store=this.storage;
for(var i in store){
fun(store[i]);
}
};
},
//一次插入x:[]一个..数据结构为{x:[ob1,ob2,ob3],y:[str1,str2,str3]}   更新可以删除ob1,或添加ob4.只针对[]中的内容,remove针对x:[]整个删除,只有trace,remove有fun
dict:function(){
this.storage={},this.lg=0;
this.insert=function(ob){
if(!ob.hasOwnProperty("name")){return false;}
var store=this.storage,tf=store.hasOwnProperty(ob.name),cont="",pos=0;
if(!tf){
store[ob.name]=ob.content;this.lg+=1;
return this;
}
else{return false;}
};
//可以为[]的名字,也可以为一个
this.remove=function(name,fun){
var store=this.storage,tf=store.hasOwnProperty(name);
if(!tf){return false;}
if(fun){fun(store[name]);}
delete store[name];this.lg-=1;
return this;
};
//cover的值为cover和add,content只有一个内容,不用[],
this.update=function(ob,hdcont){
var store=this.storage,tf=store.hasOwnProperty(ob.name),acont,cont=ob.content,n;
if(!tf){return false;}
else{
acont=store[ob.name];
n=acont.indexOf(cont);
if(n===-1){
acont.push(cont);return this;
}
else{if(hdcont==="del"){acont.splice(n,1);}}
return this;
}
};
this.find=function(name){
var store=this.storage,tf=store.hasOwnProperty(name);
if(!tf){return false;}
return store[name];
};
this.clear=function(){
this.lg=0,this.storage={};
}
this.trace=function(fun){
var store=this.storage;
for(var i in store){
fun(store[i],this);
}
};
},


//插入的结构为:{name:xx,content:{x:xx,y:xx},x:xx,y:xx}
tree:function(obj){
this.ob=function(obj){
if(!obj.hasOwnProperty("name")){throw new bq.ERROR("没有name属性");}
for(var i in obj){this[i]=obj[i];}
if(!this.content){this.content={};}
this.parent=null,this.children=[];
};
this.root=new this.ob(obj),this.lg=1;
this.find=function(name){
var ob=this.root.children,n=ob.length,midob={},midchild=0,midn=0,brr=[];
if(this.root.name===name){return this.root;}
while(n){
brr=[];
for(var i=0;i<n;i+=1){
midob=ob[i],midchild=midob.children,midn=midchild.length;
if(midob.name===name){return midob;}
else{
if(midn!==0){
for(var j=0;j<midn;j+=1){
brr.push(midchild[j]);
}
}
}
}
ob=brr,n=brr.length;
}
return false;
};
this.findLevel=function(name){
var ob=this.root.children,n=ob.length,midob={},midchild=0,midn=0,brr=[],lay=1,no=0,str="";
if(ob===0||this.root.name===name){return this.root;}
while(n){
brr=[],lay+=1,no=0;
for(var i=0;i<n;i+=1){
midob=ob[i],midchild=midob.children,midn=midchild.length,no+=1;
if(midob.name===name){str=lay+"&"+no;return str;}
else{
if(midn!==0){
for(var j=0;j<midn;j+=1){
brr.push(midchild[j]);
}
}
}
}
ob=brr,n=brr.length;
}
return false;
};
this.insertChild=function(obj,oldname){
var ob=new this.ob(obj),ifob=this.find(obj.name),paob=this.find(oldname);
if(ifob!==false||paob===false){return false;}
paob.children.push(ob),ob.parent=paob;
this.lg+=1;
return this;
};
this.insertAfter=function(obj,oldname){
var ob=new this.ob(obj),ifob=this.find(obj.name),paob=this.find(oldname),obs,n=0;
if(ifob!==false||paob===false){return false;}
obs=paob.parent.children,n=obs.indexOf(paob);
obs.splice(n+1,0,ob),ob.parent=paob.parent;
this.lg+=1;
return this;
};
this.insertBefore=function(obj,oldname){
var ob=new this.ob(obj),ifob=this.find(obj.name),paob=this.find(oldname),obs,n=0;
if(ifob!==false||paob===false){return false;}
obs=paob.parent.children,n=obs.indexOf(paob);
obs.splice(n,0,ob),ob.parent=paob.parent;
this.lg+=1;
return this;
};
this.update=function(obj,cover){
var ob=this.find(obj.name),cont=obj.content,acont;
if(ob===false){
return false;
}
else{
acont=ob.content;
if(cover==="add"){for(var i in cont){acont[i]=cont[i];}}
else{ob.content=cont;}
for(var i in obj){if(i!=="name"&&i!=="content"){ob[i]=obj[i];}}
return this;}
};
this.parentChain=function(name,aim){
var par=this.find(name),cont,outstr;
if(par===false){return false;}
outstr=bq.getVal(par.content,aim);
if(outstr){return outstr;}
par=par.parent;
while(par){
if(par.name.indexOf("root")===-1&&par.name.indexOf("-")!==-1){continue;}
cont=par.content;
outstr=bq.getVal(cont,aim);
if(outstr){return outstr;}
par=par.parent;
}
return false;
};
this.siblingChain=function(name,aim){
var ob=this.find(name),sibs,cont,par,n=0;
outstr=bq.getVal(ob.content,aim);
if(outstr){return outstr;}
par=ob.parent;
if(par){
sibs=par.children,n=sibs.length;
for(var i=0;i<n;i+=1){
if(sibs[i].name.indexOf("root")===-1&&sibs[i].name.indexOf("-")!==-1){continue;}
cont=sibs[i].content;
outstr=bq.getVal(cont,aim);
if(outstr){return outstr;}
}
}
return false;
};
this.childrenChain=function(name,aim){
var ob=this.find(name);
// if(ob.content.hasOwnProperty(aim)){return ob.content[aim];}
outstr=bq.getVal(ob.content,aim);
if(outstr){return outstr;}
var ob=ob.children,n=ob.length,midob={},midchild=0,midn=0,brr=[],cont;
if(ob===0||this.root.name===name){return this.root;}
while(n){
brr=[];
for(var i=0;i<n;i+=1){
midob=ob[i];
if(midob.name.indexOf("root")===-1&&midob.name.indexOf("-")!==-1){continue;}
cont=midob.content,midchild=midob.children,midn=midchild.length;
outstr=bq.getVal(cont,aim);
if(outstr){return outstr;}
if(midn!==0){
for(var j=0;j<midn;j+=1){
brr.push(midchild[j]);
}
}
}
ob=brr,n=brr.length;
}
return false;
};
this.remove=function(name,fun){
var ob=this.find(name),obs,n=0;
if(ob===false){return false;}
else{
obs=ob.parent.children;
n=obs.indexOf(ob);
if(fun){fun(ob);}
obs.splice(n,1);
ob.parent=null,ob.children=null;
return this;
}
};
this.clear=function(){
this.root.children=null,this.root=null,this.lg=0;
};
this.trace=function(name,fun){
var ob=!name?this.root:this.find(name);
if(ob===false){return false;}
var child=ob.children,n=child.length,midob={},midchild=0,midn=0,brr=[];
fun(ob,this);
while(n){
brr=[];
for(var i=0;i<n;i+=1){
midob=child[i],midchild=midob.children,midn=midchild.length;

fun(midob,this);
if(midn!==0){
for(var j=0;j<midn;j+=1){
brr.push(midchild[j]);
}
}
}
child=brr,n=brr.length;
}
}
},
treeOb:function(ob,at){
var ob=typeof ob==="object"?ob:JSON.parse(ob);
var n=at.length,x=0,y=0,str;
if(at.indexOf('.')===-1){return ob[at];}
for(var i=0;i<n;i+=1){
if(at.charAt(i)==="."){
y=x,x=i;
str=y?at.slice(y+1,x):at.slice(0,x);
ob=ob[str];
if(typeof ob!=="object"){return ob;}
}
}
str=at.slice(x+1);
ob=ob[str];
return ob;
},
getVal:function(ob,name){
var val=this.treeOb(ob,name);
switch(typeof val){case 'function':return val();break;case "undefined":return "";break;default:return val;} },
//为一个链表,回调为整个ob
chain:function(){
this.ob=function(obj){
if(!obj.hasOwnProperty("name")){throw new ERROR("没有name");}
for(var i in obj){this[i]=obj[i];}
if(!this.content){this.content=[];}
this.pre=null,this.next=null;
};
this.head=new this.ob({name:"head"});
this.find=function(name){
var ob=this.head;
while(ob){
if(ob.name===name){
return ob;
}
ob=ob.next;
}
if(ob===null){return false;}
};
this.insertAfter=function(obj,oldname){
var node=this.find(obj.name),onode=this.find(oldname),ob;
if(onode===false){return false;}
else{
if(node!==false){
return false;
}
else{
ob=new this.ob(obj);
ob.next=onode.next,ob.pre=onode,onode.next=ob;
this.lg+=1;
return this;
}
}
};
this.insertBefore=function(obj,oldname){
var node=this.find(obj.name),onode=this.find(oldname),ob;
if(onode===false){return false;}
else{
if(node!==false){
return false;
}
else{
ob=new this.ob(obj);
ob.next=onode,ob.pre=onode.pre,onode.pre=ob;
this.lg+=1;
return this;
}
}
};
this.remove=function(name,fun){
var node=this.find(name);
if(node===false){return false;}
else{
node.pre.next=node.next,node.next.pre=node.pre;
if(fun){fun(node);}
node=null;
this.lg-=1;
return this;
}
};
this.top=function(){
var ob=this.head;
while(ob.next){
ob=ob.next;
}
return ob;
};
this.insert=function(obj){
var node=this.find(obj.name),nd=this.top(),ob=new this.ob(obj);
if(node===false){nd.next=ob,ob.pre=nd;this.lg+=1;return this;}
else{return false;}
};
//一次只更新一个
this.update=function(obj,hdcont){
var node=this.find(obj.name),cont=obj.content,acont,n;
if(node===false){return false;}
else{
acont=node.content;
n=acont.length;
if(n===-1){
acont.push(cont);}
else{
if(hdcont==="del"){acont.splice(n,1);}
}
for(var i in obj){if(i!=="name"&&i!=="content"){node[i]=obj[i];}}
return this;
}
};
this.clear=function(){
this.head.next=null,this.lg=0;
};
this.trace=function(fun,name){
var ob;
if(name){ob=this.find(name);}else{ob=this.head;}
while(ob.next){
if(ob.name==="head"){continue;}
fun(ob);
ob=ob.next;
}
};
},

//为一个图
map:function(n,sma){
this.dots=n,this.edges=0,this.adj=[],this.marked=[],this.bind=[];
this.tobind=function(v,fun){this.bind[v]=fun;};
if(n){for(var i=0;i<n;i+=1){this.adj[i]=[];}}
this.addPedge=function(x,y){
if(typeof x==="object"){this.bind[x.name]=x,x=x.name;}
if(typeof y==="object"){this.bind[y.name]=y,y=y.name;}
this.adj[x].push(y);this.edges++;}
this.addPedges=function(x,arr){
	var n=arr.length;for(var i=0;i<n;i+=1){this.addPedge(x,arr[i]);}
};
this.judge=function(v){
var arr=[],n=0;
if(this.marked[v]){throw{name:'循环',message:'引起了循环'}}
var arr=this.adj[v],n=arr.length;
if(n>0){this.marked[v]=true;for(var i=0;i<n;i+=1){this.judge(arr[i]);}}
};
this.clear=function(){this.adj=[],this.marked=[],this.bind=[];for(var i=0;i<n;i+=1){this.adj[i]=[];}};
if(sma==="small"){return;}
// 手动预先添加点,m可以为数组,用名字取代数字表示点
this.planDots=function(m){
if(typeof m==="object"){
var n=m.length;
for(var i=0;i<n;i+=1){this.adj[m[i]]=[];}
return this;
}
this.adj=[];for(var i=0;i<m;i+=1){this.adj[i]=[];}};
this.addEdge=function(x,y){
if(typeof x==="object"){this.bind[x.name]=x,x=x.name;}
if(typeof y==="object"){this.bind[y.name]=y,y=y.name;}
this.adj[x].push(y),this.adj[y].push(x),this.edges++;};
this.addEdges=function(x,arr){
var n=arr.length;for(var i=0;i<n;i+=1){this.addEdge(x,arr[i]);}
}
this.directTrace=function(v,fun){
var arr=[],n=0,dirt;
if(this.bind[v]){dirt=fun(this.bind[v],v);if(dirt===false){return;}}
arr=this.adj[v],n=arr.length;
if(n>0){
this.marked[v]=true;
for(var i=0;i<n;i+=1){if(!this.marked[arr[i]]){this.pipeTrace(arr[i],fun);}}
}
};
this.layTrace=function(v,fun){
var arr=this.adj[v],n=arr.length,brr=[],m=0,pos,midarr,dirt;
if(this.bind[v]){dirt=fun(this.bind[v],v);if(dirt===false){return;}}
this.marked[v]=true;
while(n){
brr=[];
for(var i=0;i<n;i+=1){
pos=arr[i];
if(!this.marked[pos]){
this.marked[pos]=true;
if(this.bind[pos]){dirt=fun(this.bind[pos]);if(dirt===false){continue;}}
midarr=this.adj[pos],m=midarr.length;
if(m>0){for(var j=0;j<m;j+=1){ brr.push(midarr[j]);}}
}
}
arr=brr;
n=brr.length;
}
};
this.pipeTrace=function(v,fun){
var arr=[],n=0,dirt;
this.marked[v]=true;
if(this.bind[v]){dirt=fun(this.bind[v],v);if(dirt===false){return;}}
arr=this.adj[v];
n=arr.length;
if(n>0){
for(var i=0;i<n;i+=1){if(!this.marked[arr[i]]){this.pipeTrace(arr[i],fun);}}
}
};
}
});
bq.makes({
bq_storage:{},
bq_lg:0,
bq_insert:function(name,cont,type){
var store=this.bq_storage,ob=store[name],midob;
if(!ob){ob=store[name]={};}
if(!ob[type]){ob[type]=[cont];if(!ob.item){ob.item=1;}else{ob.item+=1;}}
else if(ob[type].length===0){ob[type].push(cont);if(!ob.item){ob.item=1;}else{ob.item+=1;}}
else{return false;}
},
bq_insertalias:function(name,cont,type,na){
var store=this.bq_storage,ob=store[name],midob;
if(!ob){ob=store[name]={};}
if(!ob[type]){ob[type]=[];}
if(!ob[type].alias){ob[type].alias={};}
if(!ob[type].alias[na]){ob[type].alias[na]=[];}
midob=ob[type].alias[na];
if(!midob||midob.length===0){midob.push(cont);}
else{return false; }
},
bq_removealias:function(name,type,na){
var store=this.bq_storage,ob=store[name],midob;
if(!ob){return false;}
if(!ob[type]){return false;}
if(!ob[type].alias){return false;}
if(!ob[type].alias[na]){return false;}
midob=ob[type].alias[na];
if(!midob){return false;}
else{
delete ob[type].alias[na];
}
},
//可以为[]的名字,也可以为一个
bq_remove:function(name,type){
var store=this.bq_storage,ob=store[name];
if(!ob){return false;}
if(!ob[type]||ob[type].length===0){return false;}
ob[type]=null,ob.item-=1;
if(ob.item===0){this.bq_lg-=1;
	// delete store[name];
}
},
bq_updatealias:function(name,cont,type,na,hdcont){
var store=this.bq_storage,ob=store[name],midob,acont,n;
if(!ob){return false;}
if(!ob[type]){return false;}
if(!ob[type].alias){return false;}
if(!ob[type].alias[na]){return false;}
midob=ob[type].alias[na];
if(!midob){return false;}
else{
acont=midob,n=acont.indexOf(cont);
if(n===-1){acont.push(cont);}
else{if(hdcont==="del"){acont.splice(n,1);}}
return true;
}
},
//cover的值为cover和add,content只有一个内容,不用[],
bq_update:function(name,cont,type,hdcont){
var store=this.bq_storage,ob=store[name],acont,n;
if(!ob){return false;}
if(!ob[type]){return false;}
acont=ob[type];
n=acont.indexOf(cont);
if(n===-1){
acont.push(cont);
}
else{if(hdcont==="del"){acont.splice(n,1);}}
return true;
},
bq_findalias:function(name,type,na){
var store=this.bq_storage,ob=store[name],midob;
if(!ob){return false;}
if(!ob[type]){return false;}
if(!ob[type].alias){return false;}
if(!ob[type].alias[na]){return false;}
midob=ob[type].alias[na];
if(!midob){return false;}
else{
return midob;
}
},
bq_find:function(name,type){
var store=this.bq_storage,ob=store[name];
if(!ob){return false;}
if(!ob[type]){return false;}
return ob[type];
},
bq_clear:function(){
this.bq_lg=0,this.bq_storage={};
},
fun_storage:{},
insertFun:function(ob,val){
var store=this.fun_storage;
if(typeof ob==="object"){
for(var i in ob){
if(store[i]){continue;}
store[i]=ob[i];}
}
else{
if(store[ob]){return false;}
else{store[ob]=val;}
}
},
findFun:function(name){
var store=this.fun_storage;
if(!store.hasOwnProperty(name)){return false;}
else{return store[name];}
},
updateFun:function(name,val,n,tp){
if(!this.fun_storage[name]){return false;}
var arr=this.fun_storage[name];
if(tp==="add"){arr.push(val);}
else if(tp==="del"){arr.splice(n,1);}
else{arr[n]=val;}
},
removeFun:function(name){
if(!this.fun_storage[name]){return false;}
delete this.fun_storage[name];
},

argument_storage:{},
insertArgument:function(ob,val){
var store=this.argument_storage;
if(typeof ob==="object"){
for(var i in ob){
if(store[i]){continue;}
store[i]=ob[i];}
}
else{
if(store[ob]){return false;}
else{store[ob]=val;}
}
},
updateArgument:function(name,val,n,tp){
if(!this.argument_storage[name]){return false;}
var arr=this.argument_storage[name];
if(tp==="add"){arr.push(val);}
else if(tp==="del"){arr.splice(n,1);}
else{arr[n]=val;}
},
removeArgument:function(name){
if(!this.argument_storage[name]){return false;}
delete this.argument_storage[name];
},

asyc_lg:0,
asyc_storage:[],
asyc_clear:function(fun){this.asyc_lg=0,this.asyc_storage=[];},
asyc_find:function(name){
var arr=this.asyc_storage,lg=arr.length;
for(var i=0;i<lg;i+=1){
if(arr[i].name===name){return arr[i];}
}
return false;
},
asyc_fun:function(name,para){
var ob=this.asyc_find(name);
if(ob===false){return;}
var ps=ob.item+=1;
if(ob.item===ob.lg-1){ob.item=-1;}
if(!ob.content[ps]){return;}
ob.content[ps](para);
},
asyc_argument:function(){

},
asyc_finditem:function(name){var lg=this.asyc_lg,arr=this.asyc_storage;
for(var i=0;i<lg;i+=1){
if(arr[i].name===name){return i;}
}
return false;
},
asyc_insert:function(ob){var pos=this.asyc_find(ob.name),lg=this.asyc_lg,arr=this.asyc_storage;
if(pos===false){
arr.push(ob),this.asyc_lg+=1;return this;
}
else{
return false;
}
return this;
},
//一次只能插入一个,不能为数组类型
asyc_update:function(ob,hdcont){
var pos=this.asyc_finditem(ob.name),arr=this.asyc_storage,cont=ob.content,acont,n;
if(pos===false){return false;}
else{
acont=arr[pos].content;
n=acont.indexOf(cont);
if(n===-1){
acont.push(cont);
}
else{
if(hdcont==="del"){acont.splice(n,1);}
}
for(var i in ob){if(i!=="name"&&i!=="content"){acont[i]=ob[i];}}
return this;
}
},
asyc_remove:function(name){
var it=this.asyc_finditem(name);
if(it===false){return false;}
this.asyc_storage.splice(it,1);
},
asyc_trave:function(fun,name){
var lg=this.asyc_lg,arr=this.asyc_storage,i=0;
if(name){i=this.asyc_finditem(name);}
for(;i<lg;i+=1){
fun(arr[i]);
}
}



});

bq.ERROR.prototype=new Error();

//插入排序
bq.makes({
bubSort:function(arr,fun){
var n=arr.length,ob,num;
for(var i=n;i>=2;i-=1){
for(var j=0;j<i-1;j+=1){
if(arr[j].item>arr[j+1].item){
if(fun){fun(arr[j],arr[j+1]);}
ob=arr[j],arr[j]=arr[j+1],arr[j+1]=ob,num=arr[j].item;;
}}
i=num?num+2:i;
num=0;
}
return arr;
},
sertSort:function(arr,fun){
var n=arr.length,ob,j;
for(var i=1;i<n;i+=1){
ob=arr[i],j=i;
while(j>0 && arr[j-1].item>ob.item){
if(fun){fun(arr[j],arr[j-1]);}
arr[j]=arr[j-1];
j-=1;
}
if(fun){fun(arr[j],ob);}
arr[j]=ob;
}return arr;
},
tfmobile:function(){
// var agent = navigator.userAgent,tp = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"],n=tp.length;
// for(var i=0;i<n;i+=1){
// if(agent.indexOf(tp[i])!==-1){return true;}
// }
// return false;
var ua=navigator.userAgent;
 if( !!ua.match(/AppleWebKit.*Mobile/) || !!ua.match(/Windows Phone/) || !!ua.match(/Android/) || !!ua.match(/MQQBrowser/)||screen.availWidth<500){
return true;
 }

else{return false;}

},
ie9:function(){
if(document.documentMode===9){return true;}
return false;
}

});

bq.prototype=proto;
bq.prototype.makes({
sysStore:"",
getVal:function(ob,name){
var val=this.treeOb(ob,name);
switch(typeof val){case 'function':return val();break;case "undefined":return "";break;default:return val;} },
//当前实例化对象,使用bq的str方法
usePool:function(str,para){
bq[str].call(this,para);
},
//创建与对象ob的连接,ob的storage属性可以被本对象使用,tf为是否可以修改
connect:function(name,ob,tf){
this[name]=ob[name];
if(tf){Object.seal(this[name]);}
},
//返回ob的类型,array,object还是2,
typeob:function(ob){return Object.prototype.toString.call(ob).slice(8,-1);},
//用at2为a.b.0.c这种属性连接方式,解析ob2对象里面的值
oblength:function(ob){
var tp=typeob(ob),n=0;
if(tp!=="Object"){return ob.length;}
else{for(var i in ob){n+=1;} return n;}
},
treeOb:function(ob,at){
var ob=typeof ob==="object"?ob:JSON.parse(ob);
var n=at.length,x=0,y=0,str;
if(at.indexOf('.')===-1){return ob[at];}
for(var i=0;i<n;i+=1){
if(at.charAt(i)==="."){
y=x,x=i;
str=y?at.slice(y+1,x):at.slice(0,x);
ob=ob[str];
if(typeof ob!=="object"){return ob;}
}
}
str=at.slice(x+1);
ob=ob[str];
return ob;
}

});


// 字符串对象
bq.make('string',function(data,lg){
if(data){this.usePool(data,lg);}
// 把json字符转变为样式字符,只对单层json有效,输入为字符串
this.jsStyle=function(str){
var n2=str.length,stri="";
for(var i=0;i<n2;i+=1){
switch(str[i]){
case '\x20':;break;
case '\x22':;break;
case '\x7B':;break;
case '\x7D':;break;
case '\x2c':stri+=";";break;
case '\x3A':stri+=":";break;
default:stri+=str[i];break;
}
}
stri+=";";
return stri;
};
this.unionSql=function(str,id,arr){
if(!str){return;}
var ob=typeof str==="object"?str:JSON.parse(str);
var n=ob.length,midob,oldob={},m=arr.length,outob=[];
var imp="",oldimp="";
for(var i=0;i<n;i+=1){
midob=ob[i],imp=midob[id];
if(oldimp===imp){
for(var j=0;j<m;j+=1){
oldob[arr[j]]+="&"+midob[arr[j]];
}
}
else{
oldob=midob;
oldimp=imp;
outob.push(oldob);
}
}
return outob;
};
this.getStr=function(str,num,fmat){
var n=0,fm=fmat?fmat:"/";
if(num==="last"){n=str.lastIndexOf(fm);return str.slice(n+1);}
else if(num==="first"){
n=str.indexOf(fm);return str.slice(0,n);
}
else{
var l=str.length,m=0;
for(var i=0;i<l;i+=1){
if(str[i]===fm){n+=1;
if(n===num-1){m=i;}
if(n===num){if(m===0){m=-1;}return str.slice(m+1,i);}
}
}
}
};
//reg可以为数字,字符串,对象,正则,同时对象的属性为lg,str,regexp
this.strict=function(str,reg){
var tp=this.typeob(reg);
if(tp==="String"){
if(reg==="notempty"){if(str.length===0||str===undefined||str===null){return false;}else{return true;}}
if(str.indexOf(reg)!==-1){return true;}else{return false;}
}
else if(tp==="Number"){
if(str.length>+reg){return false;}else{return true;}
}
else if(tp==="RegExp"){
if(reg.text(str)){return true;}else{return false;}
}
else if(tp==="Object"){
if(reg.notempty!==undefined){if(str.length===0||str===undefined||str===null){return false;}}
if(reg.min){if(str.length<reg.min){return false;}}
if(reg.max){if(str.length>reg.max){return false;}}
if(reg.str){if(str.indexOf(reg.str)===-1){return false;}}
if(reg.regexp){if(!reg.regexp.text(str)){return false;}}
return true;
}
else{
return false;
}
};
this.stricts=function(arr,brr){
var n=arr.length,res;
for(var i=0;i<n;i+=1){
res=this.strict(arr[i],brr[i]);
if(!res){return false;}
}
return true;
}
//把类似a=i&b=9的字符转变为对象,s是你选择的分隔符,输入为字符串
this.strOb=function(str,s){
if(!isNaN(str)||str.indexOf("=")===-1){return str;}
var x=-1,y=0,z=0,n=str.length,ob={},midstr="",val="";
if(str.indexOf("&")===-1){
z=str.indexOf("=");
val=str.slice(z+1);
if(!isNaN(val)){val=+val;}
ob[str.slice(0,z)]=val;
return ob;
}
for(var i=0;i<n;i+=1){
if(str[i]==="&"){
y=i;
midstr=str.slice(x+1,y);
z=midstr.indexOf("="),val=midstr.slice(z+1);
if(!isNaN(val)){val=+val;}
ob[midstr.slice(0,z)]=val;
x=y;
}
}
midstr=str.slice(y+1),z=midstr.indexOf("="),val=midstr.slice(z+1);
if(!isNaN(val)){val=+val;}
ob[midstr.slice(0,z)]=val;
return ob;
};
// 把json字符转变为post的参数,单层json变成post的值,输入为字符串
this.jsPost=function(str){
var str=typeof str==="object"?JSON.stringify(str):str,n2=str.length,stri="";
for(var i=0;i<n2;i+=1){
switch(str[i]){
case '\x20':;break; case '\x22':;break; case '\x7B':;break; case '\x7D':;break; case '\x2c':stri+="&";break; case '\x3A':stri+="=";break; default:stri+=str[i];break; }}
return stri;
},
//可以用作搜索服务,这里的回调需要有返回值,instr类型为[{aim:[1,2],content:"abc"}]的类型,变成层次性的消息.fmat为每层的标志,如加个-,fmat2为替换后的标志,name,为返回的位置,输入为字符串
this.jsMsg=function(name,instr,fmat,fmat2){
var midarr=typeof instr==="object"?instr:JSON.parse(instr),n=midarr.length,m,brr,arr=[],ctr,midcont="",outstr="",l=0,fms=fmat,num=null;
var map=new bq.map(n,"small");
for(var i=0;i<n;i+=1){if(midarr[i].aim){map.addPedges(i,midarr[i].aim);}}
map.judge(0);
while(l<n){
for(var i=0;i<n;i+=1){
if(num===null){if(midarr[i].name===name)num=i;}
if(l>=n){break;}
brr=midarr[i].aim,midcont=midarr[i].content,ctr=1,outstr="";
if(typeof brr==="object"){
if(arr[i]){continue;}
m=brr.length;
for(var j=0;j<m;j+=1){
if(!arr[brr[j]]){ctr=0;break;}
outstr+=arr[brr[j]];}
if(ctr){
	outstr=outstr.replace(/<br>/gm,"<br>"+fmat2);
	arr[i]="<br>"+midcont+fmat+outstr,l+=1;
} }
else{
if(arr[i]){continue;}
arr[i]="<br>"+midarr[i].content;
l+=1;
} } }
return arr[num];
};
// 混合的html分拆出只包含字符内容的html,它的标签名,他的内容
this.htmtCont=function(str,fun){
var reg2=/<[\w\s\"\=\;\:\-\?\']*>([^<>]*)<\/\w+>/g,arr2=[],cont2=[];
while(arr2=reg2.exec(str)){
cont2.push(arr2[2]);
}
return cont2;
};
this.htmlJs1=function(instr){
var midarr,midstr,outstr="",n,exg=/[\w\-]*\=[\w\'\"\:\;]*/g,x,y,z,cont,htm="",attr="",attrval="";
x=instr.indexOf(">"),y=instr.lastIndexOf("<"),z=instr.indexOf("\x20");
if(x<z||z===-1){htm=instr.slice(1,x);}else{htm=instr.slice(1,z);}
cont=instr.slice(x+1,y);
outstr='{"html"'+':'+'"'+htm+'",';
while(midarr=exg.exec(instr)){
midstr=midarr[0];
n=midstr.indexOf("\=");
attrval=midstr.slice(n+2,-1);
attr=midstr.slice(0,n);
midstr='"'+attr+'"'+":"+'"'+attrval+'"';
outstr+=midstr+",";
}
outstr+='"content"'+':'+'"'+cont+'"}';
return outstr;
};
//把html集合里面的只有字符串内容的单层html取出来,然后变成json
this.htmlJs=function(str,fun){
var reg=/<[\w\s\"\=\;\:\-\?\']*>([^<>\/]*)<\/\w+>/g,outstr="",n,arr=[],htm=[];
while(arr=reg.exec(str)){
htm.push(arr[0]);
}
n=htm.length;
if(n===1){return this.htmlJs1(str);}
else{
for(var i=0;i<n;i+=1){
outstr+=","+this.htmlJs1(htm[i]);
}
outstr='['+outstr.slice(1)+']';
}
if(fun){fun(outstr);}
return outstr;
};
//把单层数组变成类似ab&cd&cd的类型
this.arrStr=function(arr){
var n=arr.length,str="";
for(var i=0;i<n;i+=1){
str+="&"+arr[i];
}
return str.slice(1);
};
//str为&ab&cd&aa的结构,找到aa的位置,如2
this.strPos=function(str,aim){
var m=str.indexOf(aim),n=-1;
if(m===-1){return false;}
for(var i=0;i<m;i+=1){
if(str.charAt(i)==="&"){n+=1;};
}
return n;
};
//ar为类似[{},{}]的结构,att为要排序的那个名字,rr为[打球,学习,游戏]这种排序.如果没有就拍到最后面.
this.sortOb=function(ar,att,rr){
var arr=typeof ar==="object"?ar:JSON.parse(ar),n=ar.length,midob={},val="",m=0;
for(var i=0;i<n;i+=1){
midob=arr[i],val=midob[att],m=rr.indexOf(val);
if(m!==-1){
midob.item=m;
}
else{
midob.item=n;
} }
 return arr;
};
// 用于多柱状图,col1,col2,col3假设为性别,名字,年龄,而x轴为性别,使用合并算法,把要合并的数组先放到str中&&来判断位置
this.tabChart=function(js,col1,col2,col3){
var js=typeof js==="object"?js:JSON.parse(js),n=js.length,sum=0,max=0,lg=0;
var outob={},outarr=[],ob={},rr=[],attr="",sign="",m=0,k=0,str1="",str2="",crr=[];
for(var i=0;i<n;i+=1){
rr=js[i],sign=rr[col1],str1=rr[col2],str2=rr[col3],m=this.strPos(attr,sign);
if(m===false){
ob={};
ob[col1]=sign,ob[col2]=[str1],ob[col3]=[str2];
outarr.push(ob);
attr+="&"+sign;
if(max<(+str2)){max=(+str2);}
lg+=1;
if(crr.indexOf(str1)===-1){crr.push(str1);}
}
else{
ob=outarr[m];
k=ob[col2].indexOf(str1);
if(k===-1){
ob[col2].push(str1);
ob[col3].push(str2);
if(max<(+str2)){max=(+str2);}
lg+=1;
if(crr.indexOf(str1)===-1){crr.push(str1);}
}
else{
sum=+str2+(+ob[col3][k]);
ob[col3][k]=sum;
if(max<sum){max=sum;}
}
}
}
outob.json=outarr,outob.max=max,outob.lg=lg,outob.arr=crr;
return outob;
};
// 用于chart表,把a:5   a:6这种可能一样的名字的值相加,fun为计算方式,要有返回值. 整体返回数组和一个最大值
this.noRepeatJson=function(js,col1,col2,fun){
var js=typeof js==="object"?js:JSON.parse(js),n=js.length,m=0,midob={},outarr=[],outob={},attr="",val1="",val2="",val=0,max=0;
for(var i=0;i<n;i+=1){
midob=js[i],val1=midob[col1],val2=midob[col2],m=this.strPos(attr,val1);
if(m===false){
outarr.push(midob);
attr+="&"+val1;
if(max<val2){max=val2;}
}
else{
if(fun){val=fun(+outarr[m][col2],+val2);}
else{val=+val2+(+outarr[m][col2]);}
outarr[m][col2]=val;
if(max<val){max=val;}
}
}
outob.arr=outarr,outob.max=max;
return outob;
};

// 用于chart表,把a:5   a:6这种可能一样的名字的值相加,fun为计算方式,要有返回值. 整体返回数组和一个最大值
this.noRepeatJson_str=function(js,col1,col2,fun){
var js=typeof js==="object"?js:JSON.parse(js),n=js.length,m=0,midob={},outarr=[],outob={},attr="",val1="",val2="",val=0;
for(var i=0;i<n;i+=1){
midob=js[i],val1=midob[col1],val2=midob[col2],m=this.strPos(attr,val1);
if(m===false){
outarr.push(midob);
attr+="&"+val1;
}
else{
if(fun){val=fun(outarr[m][col2],val2);}
else{val=val2+outarr[m][col2];}
outarr[m][col2]=val;
}
}
return outarr;
};

});






bq.string.prototype=bq.prototype;

bq.make('dom',function(data,lg){
if(data){this.usePool(data,lg);}





// 使用onestore
this.cg=function(str){
if(typeof str!=="string"){this.thisDom=str;return this;}
var dom;if(!document.querySelector(str)){return false;}
if(document.querySelectorAll(str).length===1){dom=document.querySelector(str);this.thisDom=dom;}else{dom=document.querySelectorAll(str);this.thisDom=dom;}
return this;
};
//使用onestore,str为事件类型
this.trigger=function(idom,str){
var ob=idom!=="this"?this.dom(idom):this.thisDom;
if(!str){console.log("no evt");return;}
var sto=this.trigger.storage;
if(!sto){sto=this.trigger.storage={};}
if(!sto[str]){
var evt=document.createEvent("Events");
evt.initEvent(str,true,false);
sto[str]=evt;ob.dispatchEvent(evt);}
else{ob.dispatchEvent(sto[str]);}
return ob;
};
//没有使用缓存是因为,默认事件触发了一次,再触发可能无效.比如input file标签的.
this.triggerDefault=function(idom,str){
var ob=idom!=="this"?this.dom(idom):this.thisDom;
if(!str){console.log("no evt");return;}
var evt=document.createEvent("Events");
evt.initEvent(str,true,false);
ob.dispatchEvent(evt);
};
//其中,funs为{id1:function(){},cla2:function(){}}的类型
this.assignEvt=function(idom,tp,funs,tf){
var dom=idom!=="this"?this.dom(idom):this.thisDom,dict=this.assignEvt;
for(var i in funs){dict.insert(i,funs[i]);}
var fun=function(e){
var tg=e.target,id=tg.id,cla=tg.className;
if(tg!==e.currentTarget){
if(dict.find(id)){dict.find(id)(tg);}
else if(dict.find(cla)){dict.find(cla)(tg);}
else{return;}
}
};
this.addEvt(dom,tp,fun,tf);
};
bq.easydict.call(this.assignEvt);

// arr为比例范围,如[0,6,19],brr[为相关范围的函数,会多出arr一位],hook为名字钩子,代表的相关执行的控制器.
this.rangeFun=function(rate,arr,brr,hook){
var n=arr.length,x=-100000,y=0,str;
if(hook){var obs=this.rangeFun;if(obs[hook]===undefined){var arr=[];for(var j=0;j<=n;j+=1){arr[j]=1;}obs[hook]=arr;}}
for(var i=0;i<n;i+=1){
y=arr[i];
if(rate<=y&&rate>x){if(hook){if(obs[hook][i]===1){obs[hook][i]=0;brr[i]();}}else{brr[i]();}return true;}
if(hook){obs[hook][i]=1;}
x=y;
}
if(rate>arr[i-1]){if(hook){if(obs[hook][i]===1){obs[hook][i]=0;brr[i]();}}else{brr[i]();}return true;}
return false;
};
//通过数组的值的当前元素来改变,,,可以套fun里面的公司.arr[0,1]0位为x的值,1位为计算的y的值,fun为公式,输入进去的为x,arr[1多半]
this.formula=function(arr,aim,num,fun){
var x=+arr[0];
if(x<aim){x+=num; if(x>=aim){arr[0]=aim,arr[1]=fun(x);return true;}else{arr[0]=x,arr[1]=fun(x);return arr[1];}}
else if(x===aim){return true;}
else{x-=num;if(x<=aim){arr[0]=aim,arr[1]=fun(x);return true;}else{arr[0]=x,arr[1]=fun(x);return arr[1];}}
};

//force为force字符串时候,不是异步的函数也会队列话.
this.done=function(fun,hook,force){
var ob={},funs;
if(fun!=="end"){
if(bq.asyc_finditem(hook)===false){
ob.name=hook,ob.item=-1;
if(force==="force"){funs=function(){fun();var obj=bq.asyc_find(hook);bq.asyc_fun(hook);}}
else{funs=fun;}
ob.content=[funs];
bq.asyc_insert(ob);
}else{
ob.name=hook,ob.content=fun;
if(force==="force"){funs=function(){fun();var obj=bq.asyc_find(hook);bq.asyc_fun(hook);}}
else{funs=fun;}
ob.content=funs;
bq.asyc_update(ob);
}
}
else{
ob.name=hook;
ob.content=function(){bq.asyc_remove(hook);};
bq.asyc_update(ob);
}
return this;
};
this.stopDone=function(hook){
bq.asyc_remove(hook);
};
//stararr,开始的样式,delayarr,结束的样式
this.queAnimate=function(domarr,stararr,aimarr,delayarr,addnum,funarr,hook){
var fun=this.cgStyle,n=domarr.length,m=0,that=this,obanis=this.queAnimate;
(function lun(){
var dom=that.dom(domarr[m]),ob2=aimarr[m],no=0,j=0,dp="",delay=delayarr?delayarr[m]:5,func,startob,ival;
if(funarr){func=funarr[m];}
if(stararr){startob=stararr[m];if(startob){for(var k in startob){ival=startob[k];if(!isNaN(ival)){ival=+ival}dom.style[k]=ival;}}}
if(m>=n){if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}} return;}
m+=1;
for(var k in ob2){no+=1;}
setTimeout(function ani(){
if(hook){if(obanis.hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}return;}}
for(var i in ob2){
if(dp.indexOf(i)!==-1){continue;}
if(typeof addnum==="object"){var num=addnum[i];}
else{var num=addnum;}
var y=ob2[i],x=that.getStyle(dom,i);
var tf=fun(dom,i,x,y,num);
if(tf){dp+=i;j+=1;}
}
if(j>=no){j=null,no=null;if(func){func(dom);}lun();return ;}
window.animationframe?window.animationframe(ani):setTimeout(ani,1000/60);
},delay);
})();
return this;
};


this.ctr_queanimate=function(hook,tf){if(tf){this.queAnimate[hook]=undefined;return;}this.queAnimate[hook]=1;};


this.timeFun=function(name,fun,time){
this.timeFun[name]=setTimeout(fun,time);
};
this.clearTimefun=function(name){this.timeFun.remove(name);}
bq.easydict.call(this.timeFun);

this.animate=function(dm,startob,aimob,delay,addnum,fu,hook){
var dom=(dm!=="this")?this.dom(dm):this.thisDom,obani=this.animate,fun=this.cgStyle,j=0,no=0,dp="",that=this,ival;
if(startob){for(var k in startob){ival=startob[k];dom.style[k]=isNaN(ival)?ival:(+ival);}}
for(var i in aimob){no+=1;}
setTimeout(function ani(){
if(hook){if(obani[hook]){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}return false;}}
for(var i in aimob){
if(dp.indexOf(i)!==-1){continue;}
if(typeof addnum==="object"){var num=addnum[i];}
else{var num=addnum;}
var y=aimob[i],x=that.getStyle(dom,i);
var tf=fun(dom,i,x,y,num);
if(tf){dp+=i;j+=1;}
}
if(j>=no){j=null,no=null;if(fu)fu(dom);if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);} }  return;}
window.animationframe?window.animationframe(ani):setTimeout(ani,1000/60);
},delay);
return this;
};
this.ctr_animate=function(hook,tf){if(tf){this.animate[hook]=undefined;return;}this.animate[hook]=1;};
//des为{width:200px,..}这种
this.animateBy=function(dom,des,num){
var dom=(dom!=="this")?this.dom(dom):this.thisDom,fun=this.cgStyle,no=0;
for(var i in des){
if(typeof num==="object"){no=num[i];}
else{no=num;}
var y=des[i],x=this.getStyle(dom,i);
if(x===y){continue;}
fun(dom,i,x,y,no);
}
};

this.cssAnimate=function(dom,des,time,fun2,hook){
// if(+time.slice(0,-1)>1){console.log("time is too long");return false;}
var dom=(dom!=="this")?this.dom(dom):this.thisDom,n=document.getElementsByTagName("style").length+document.getElementsByTagName("link").length,styles=document.styleSheets,sty,fram,tag;
var anim=this.webkitmoz("animation"),fram="@"+this.webkitmoz("animation","css","keyframes")+" temp"+des;
if(dom.style[anim]){
return;
}
sty=styles[n-1];
if(document.documentMode===9){
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}}
return false;
}
else{
var m=sty.cssRules.length;
sty.insertRule(fram,m);
setTimeout(function(){if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook);}} if(fun2){fun2(dom);}dom.style[anim]=null;sty.deleteRule(0);},time);
}
dom.style[anim]="temp "+(time/1000)+"s";
};
if(!this.dom("#bq_keyframe")){
var tag=document.createElement("style");
tag.id="bq_keyframe";
document.getElementsByTagName("head")[0].appendChild(tag);}


//在断行输入图片的时候会跑到最后,
this.writeMessage=function(dv,ims,hook){
var div=dv!=="this"?this.dom(dv):this.thisDom,that=this,imgs=this.dom(ims),m=0,wrmes=this.writeMessage;
wrmes[hook]={pos:0,nod:""};
div.contentEditable="true";
this.addEvt(div,"click",function(e){
var store=wrmes[hook],sel=window.getSelection();
store.nod=sel.anchorNode;
store.pos=sel.anchorOffset;
},false);
this.addEvt(imgs,"click",function(e){
var store=wrmes[hook],pos,nod,img=e.target.cloneNode(),mnod;
pos=store.pos,nod=store.nod;
if(!nod||nod.nodeType!==3){
that.setChild(div,img,null);
return;
}
mnod=nod.splitText(pos);
that.setBefore(mnod,img,null);
},false);
};
this.writeMessage.no=0;
});
whatob.bq=bq;
bq.dom.prototype=bq.prototype;
bq.dom.prototype.makes({
crossIframe:function(url,fun){
var iframe=document.createElement("iframe");
iframe.id="bq-iframe";
document.body.appendChild(iframe);
iframe.src=url;
window.onmessage=fun;
},
crossPost:function(str,url){
document.getElementById("bq-iframe").contentWindow.postMessage(str,url);
},
//iffun为满足某个条件,针对arr中的一个元素,如果iffun(可以为函数,或其他对象),函数就是开包arr中元素后返回不为false,其他情况的iffun为位置数值.
excludeFun:function(arr,iffun,fun1,fun2){
var n=arr.length,ob,tp=typeof iffun;
for(var i=0;i<n;i+=1){
ob=arr[i];
if(tp==="function"){if(iffun(ob)!==false){fun1(ob);}else{if(fun2){fun2(ob);}}}
else{if(iffun===i){fun1(ob);}else{if(fun2){fun2(ob);}}}
}
},
//iffun为满足某个条件,针对arr中的一个dom
excludeDom:function(idom,iffun,fun){
var dom=idom!=="this"?this.dom(idom):this.thisDom,n=dom.length,arr=[],ob,tp=typeof iffun;
if(n>1){
for(var i=0;i<n;i+=1){ob=dom[i];
if(tp==="function"){if(iffun(ob)===false){arr.push(ob);}}
else{if(iffun!==i){arr.push(ob);}}}
return arr;}
else{return false;}
},
// fun为单个函数,实参为dom
each:function(idom,fun){
var dom=idom!=="this"?this.dom(idom):this.thisDom,n=dom.length;
if(n>1){
for(var i=0;i<n;i+=1){fun(dom[i],i);}}
else{fun(dom);}
return this;
},
//根据当前值和目标值来改变dom的样式,dom为目标元素,x为起点,y为目标点,,,这个函数要改的简单点,配合animate使用.
cgStyle:function(dom,sty,x,y,num){
if(!isNaN(y)){
if(!x){x=0;} x=+x,y=+y;
if(x<y){x+=num;if(x>=y){dom.style[sty]=y;return true;}else{dom.style[sty]=x;return false;}}
else if(x===y){return true;}
else{x-=num;if(x<=y){dom.style[sty]=y;return true}else{dom.style[sty]=x;return false;}}
}
else if(y.indexOf("px")!==-1){
if(!x){x="0px";}
x=+x.slice(0,-2);y=+y.slice(0,-2);
if(x<y){x+=num;if(x>=y){dom.style[sty]=y+"px";return true;}else{dom.style[sty]=x+"px";return false;}}
else if(x===y){return true;}
else{x-=num;if(x<=y){dom.style[sty]=y+"px";return true;}else{dom.style[sty]=x+"px";return false;}}
}
else if(y.indexOf("rotate")!==-1){
var reg=/(?:[\d]+)/,xx,yy;
if(!x){x=y.replace(reg,0);}
xx=+x.match(reg),yy=+y.match(reg);
if(xx<yy){xx+=num;if(xx>=yy){dom.style[sty]=x.replace(reg,yy);return true;}else{dom.style[sty]=x.replace(reg,xx);}}
else if(xx===yy){return true;}
else{xx-=num;if(xx<=yy){dom.style[sty]=x.replace(reg,yy);return true;}else{dom.style[sty]=x.replace(reg,xx);}}
}
else{}
},
//不用onestore
dom:function(str){
var dom={};
if(typeof str==="object"){return str;}
if(str.indexOf("#")!==-1&&str.indexOf("\x20")===-1){dom=document.getElementById("str");if(dom){return dom;}}
dom=document.querySelectorAll(str);
if(!dom||dom.length===0){return false;}
if(dom.length===1){dom=document.querySelector(str);return dom;}else{return dom;}
},
//使用onestore
addEvt:function(idom,type,fun,tf,gap,gapfun){
if(idom===window||idom==="window"){
window.addEventListener(type,fun,tf);
return ;
}
var doms=idom!=="this"?this.dom(idom):this.thisDom,tf=tf?tf:false,dom,control=1;
var n=doms.length,ids="",na="",pos=0,pos2=0,para="",obif="",tp="",tfgo;
obif=(typeof type!=="object");
if(obif){
tp=type;
pos=tp.indexOf("\x2E");
if(pos!==-1){
para=tp.slice(pos+1);
tp=tp.slice(0,pos);
pos2=tp.indexOf("\x2F");
if(pos2!==-1){na=tp.slice(pos2+1);tp=tp.slice(0,pos2);}
}
else{
pos2=tp.indexOf("\x2F");
if(pos2!==-1){na=tp.slice(pos2+1);tp=tp.slice(0,pos2);}
}}
if(!n){doms=[doms],n=1;}
for(var i=0;i<n;i+=1){
if(!obif){tp=type[i];
pos=tp.indexOf("\x2E");
if(pos!==-1){
para=tp.slice(pos+1);tp=tp.slice(0,pos);pos2=tp.indexOf("\x2F");if(pos2!==-1){na=tp.slice(pos2+1);tp=tp.slice(0,pos2);}
}
else{pos2=tp.indexOf("\x2F");if(pos2!==-1){na=tp.slice(pos2+1);tp=tp.slice(0,pos2);}}
}
dom=doms[i];
ids=dom.getAttribute("bq-evt");
if(!ids){
ids="evt"+bq.evtId;
dom.setAttribute("bq-evt",ids);
bq.evtId+=1;
}
if(na){control=bq.bq_findalias(ids,tp,na);}
else{control=bq.bq_find(ids,tp);if(control){if(control.length===0){control=false;}}}
tfgo=bq.bq_find(ids,tp);
if(!tfgo){
dom.addEventListener(tp,function(e){
var tp=e.type,evt=this.getAttribute("bq-evt"),arr=[],n=0,gap=0,ctr=0,ali,nn=0,argus,argu;
if(evt){
arr=bq.bq_find(evt,tp);
if(arr){n=arr.length,gap=arr.gap,gapfun=arr.gapfun,ctr=arr.ctr,argus=arr.argument;
if(gap){if(ctr===1){if(gapfun){gapfun(this);}return;}arr.ctr=1;setTimeout(function(){arr.ctr=0;},gap);}
for(var i=0;i<n;i+=1){argu=argus[i];
argu?arr[i](e,this,bq.argument_storage[argu]):arr[i](e,this);}
if(arr.alias){
for(var j in arr.alias){
ali=arr.alias[j],argus=ali.argument;if(ali)nn=ali.length;
for(var k=0;k<nn;k+=1){
argu=argus[k];argu?ali[k](e,this,bq.argument_storage[argu]):ali[k](e,this);
}
}
}}}
},tf);
if(na){
bq.bq_insertalias(ids,fun,tp,na)
if(para){bq.bq_findalias(ids,tp,na).argument=[para];}
else{bq.bq_findalias(ids,tp,na).argument=[false];}
}
else{
bq.bq_insert(ids,fun,tp);
if(para){bq.bq_find(ids,tp).argument=[para];}
else{bq.bq_find(ids,tp).argument=[false];}
}
if(gap){bq.bq_find(ids,tp).gap=gap;if(gapfun){bq.bq_find(ids,tp).gapfun=gapfun;}};
}
else{
if(control){
if(na){
bq.bq_updatealias(ids,fun,tp,na);
if(para){bq.bq_findalias(ids,tp,na).argument.push(para);}
else{bq.bq_findalias(ids,tp,na).argument.push(false);}
}
else{
bq.bq_update(ids,fun,tp);
if(para){bq.bq_find(ids,tp).argument.push(para);}
else{bq.bq_find(ids,tp).argument.push(false);}
}
}
else{
if(na){
bq.bq_insertalias(ids,fun,tp,na);
if(para){bq.bq_findalias(ids,tp,na).argument=[para];}
else{bq.bq_findalias(ids,tp,na).argument=[false];}
}
else{
bq.bq_insert(ids,fun,tp);
if(para){bq.bq_find(ids,tp).argument=[para];}
else{bq.bq_find(ids,tp).argument=[false];}
}
}
}}
},
rmEvt:function(idom,tp){
var doms=idom!=="this"?this.dom(idom):this.thisDom,n=doms.length,tf=tf?tf:false,attr,dom,na="",pos=0;
pos=tp.indexOf("\x2f");
if(pos!==-1){na=tp.slice(pos+1),tp=tp.slice(0,pos);}
if(!n){doms=[doms],n=1;}
for(var i=0;i<n;i+=1){
dom=doms[i];
attr=dom.getAttribute("bq-evt");
if(na){
if(bq.bq_findalias(attr,tp,na)){
bq.bq_removealias(attr,tp,na);
}
}
else{
if(bq.bq_find(attr,tp)){bq.bq_remove(attr,tp);}
}
}
},
//str2是针对的keyframes
webkitmoz:function(str,css,str2){
var div=this.toTag("div"),webkit,midstr,moz,o,attr;
midstr=str.charAt(0).toUpperCase()+str.slice(1);
webkit="webkit"+midstr,moz="moz"+midstr,o="o"+midstr;
if(str2){str=str2,midstr=str.charAt(0).toUpperCase()+str.slice(1);}
if(webkit in div.style){attr=css==="css"?"-webkit-"+midstr:webkit;}
else if(moz in div.style){attr=css==="css"?"-moz-"+midstr:moz;}
else if(o in div.style){attr=css==="css"?"-o-"+midstr:o;}
else{attr=str;}
div=null;
return attr;
},
//读取二进制,ctrfun为函数,如果有,则传入blob的长度,需要返回一个tf,来决定是否终止函数读取,fun为对读取到的数据进行操作,要返回真假,tp为读取格式?
readBlob:function(blob,tp,fun,hook){
var rd=new FileReader(),typ=this.typeob(blob),size=0,mime="";
switch(typ){case "String":blob=new Blob([escape(blob)]);break;case "ArrayBuffer":blob=new Blob([blob]);default:;break;}
size=blob.size,mime=blob.type;
// if((mime.indexOf("video")===-1&&mime.indexOf("image")===-1)||size>8*1024*1024){return false;}


switch(tp){
case  "blob":rd.readAsBinaryString(blob);break;
case  "arrayBuffer":rd.readAsArrayBuffer(blob);break;
case "text":rd.readAsText(blob,"UTF-8");break;
case "url":rd.readAsDataURL(blob);break;
default:;break;
}
rd.onerror=function(){
rd.abort();
}
rd.onload=function(){
if(fun){fun(rd.result,mime);}
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,rd.result);}}
rd=null;
};
},
circle:function(cx,nw,x,y,r,poi,end,ob){
if(nw==="new"){
var fcolor=ob.backgroundColor,width=ob.width,shadowColor=ob.shadowColor;
cx.beginPath();}
cx.arc(x,y,r,poi,end);
if(nw==="new"){
if(shadowColor){cx.shadowColor =shadowColor; cx.shadowOffsetY =ob.shadowOffsetY,cx.shadowOffsetX = ob.shadowOffsetX, cx.shadowBlur=ob.shadowBlur;}
else{cx.shadowColor= "#000000",cx.shadowOffsetX=0,cx.shadowOffsetY=0,cx.shadowBlur=0;}
if(fcolor){cx.fillStyle=fcolor,cx.fill();}
if(width){cx.lineWidth=width,cx.strokeStyle=ob.borderColor,cx.stroke();}}
},
canvasImg:function(img,dm){
var dom=this.dom(dm),dom2=img!=="this"?this.dom(img):this.thisDom;
dom2.src=dom.toDataURL("image/png");
},
//还要区分移动端和电脑端的.
canvasDraw:function(dm,left,top,col,wd){
var dom=dm!=="this"?this.dom(dm):this.thisDom,cx=dom.getContext("2d"),tp=bq.tfmobile(),start,move,end;
var that=this;
if(tp){start="touchstart",move="touchmove",end="touchend";}
else{start="mousedown",move="mousemove",end="mouseup"}
this.addEvt(dom,start,function(e){
cx.beginPath();
if(e.type.indexOf("touch")!==-1){
var le=e.touches[0].clientX,tp=e.touches[0].clientY;
cx.moveTo(le-left,tp-top);
}
else{
cx.moveTo(e.clientX-left,e.clientY-top);
}
if(wd){cx.lineWidth=wd;}
if(col){cx.strokeStyle=col;}
document.body["on"+move]=function(e) {
    e.stopPropagation();
    e.preventDefault();
};
e.target["on"+move]=function(e){
if(e.type.indexOf("touch")!==-1){var x=e.touches[0].clientX,y=e.touches[0].clientY;}
else{var x=e.clientX,y=e.clientY;}
var posx=x-left,posy=y-top;
cx.lineTo(posx,posy),cx.stroke();
}
},false,0);
this.addEvt(dom,"mouseleave",function(e,ts){ts["on"+move]=null},false);
this.addEvt(dom,end,function(e){
document.body["on"+move]=function(e) {
    e.stopPropagation();
};
e.target["on"+move]=null;
},false,0);
},
text:function(cx,str,ob,x,y){
cx.beginPath();
cx.textBaseline="top";
if(ob){if(ob.font){cx.font=ob.font;}if(ob.color){cx.fillStyle=ob.color;cx.fill();} }
cx.fillText(str,x,y);
},
rect:function(cx,a,b,c,d,ob,a2,b2,c2,d2){
cx.beginPath();
cx.rect(a,b,c,d);
if(ob.backgroundColor){cx.fillStyle=ob.backgroundColor,cx.fill();}
if(ob.width){cx.lineWidth=ob.width,cx.strokeStyle=ob.borderColor;cx.stroke();}
if(a2){cx.clearRect(a2,b2,c2,d2);}
return this;
},
line:function(cx,ob,nw){
var arr=arguments,n=arr.length,pos=0;
if(nw==="new"){var fcolor=ob.backgroundColor,width=ob.width,shadowColor=ob.shadowColor;
cx.lineJoin="bevel";
cx.beginPath(),cx.moveTo(arr[3],arr[4]);pos=5;}
else{pos=2;}
for(var i=pos;i<n-1;i+=2){
cx.lineTo(arr[i],arr[i+1]);
}
if(nw==="new"){
if(ob.shadowColor){cx.shadowColor =shadowColor; cx.shadowOffsetY =ob.shadowOffsetY,cx.shadowOffsetX = ob.shadowOffsetX, cx.shadowBlur=ob.shadowBlur;}
else{cx.shadowColor= "#000000",cx.shadowOffsetX=0,cx.shadowOffsetY=0,cx.shadowBlur=0;}
if(fcolor){cx.fillStyle=fcolor,cx.fill();}
if(width){cx.lineWidth=width,cx.strokeStyle=ob.borderColor,cx.stroke();}}
},
curveLine:function(cx,ob,nw){
var arr=arguments,n=arr.length,pos=0;
var a=arr[2],b=arr[3];
if(nw==="new"){
var fcolor=ob.backgroundColor,width=ob.width,shadowColor=ob.shadowColor;
cx.lineJoin="bevel";
cx.beginPath(),cx.moveTo(arr[3],arr[4]);pos=5;}
else{pos=2;}
for(var i=pos;i<n-3;i+=4){
cx.quadraticCurveTo(arr[i],arr[i+1],arr[i+2],arr[i+3]);
}
if(nw==="new"){
if(ob.shadowColor){cx.shadowColor =shadowColor; cx.shadowOffsetY =ob.shadowOffsetY,cx.shadowOffsetX = ob.shadowOffsetX, cx.	shadowBlur=ob.shadowBlur;}
else{cx.shadowColor= "#000000",cx.shadowOffsetX=0,cx.shadowOffsetY=0,cx.shadowBlur=0;}
if(fcolor){cx.fillStyle=fcolor,cx.fill();}
if(width){cx.lineWidth=width,cx.strokeStyle=ob.borderColor,cx.stroke();}}
},

moveDom:function(dm){
var dm=dm!=="this"?this.dom(dm):this.thisDom,dom=dm.parentNode,str=dom.tagName,tp=bq.tfmobile(),start,move,end;
if(tp){start="touchstart",move="touchmove",end="touchend";}
else{start="mousedown",move="mousemove",end="mouseup"}
this.addEvt(dm,start,function(e){
var dmx=e.pageX-e.currentTarget.offsetLeft,dmy=e.pageY-e.currentTarget.offsetTop;
var wd=Math.floor(window.innerWidth/2),hg=Math.floor(window.innerHeight/2);
dom["on"+move]=function(e){
if(e.clientX>wd*3/2||e.clientX<wd/2||e.clientY<hg/2||e.clientY>3*hg/2){return;}
var x=e.clientX-dmx,y=e.clientY-dmy;
dm.style.left=x+"px",dm.style.top=y+"px";
};
},false,0);
this.addEvt(dom,end,function(){
dom["on"+move]=null;
},false,0);
},
createVideo:function(dm,sr,wd,hg,loop){
var outdiv=dm!=="this"?this.dom(dm):this.thisDom,video=this.toTag("video");
video.src=sr,video.style.width=wd+"px",video.style.height=hg+"px",video.loop=loop,video.controls=true;
outdiv.appendChild(video);
},

pageTop:function(){
if(window.pageYOffset){return window.pageYOffset;}
return document.body.scrollTop;
},
pageLeft:function(){
if(window.pageXOffset){return window.pageXOffset;}
return document.body.scrollLeft;
},
pageWidth:function(){
if(window.innerWidth){return window.innerWidth;}
return document.body.clientWidth;
},
pageHeight:function(){
if(window.innerHeight){return window.innerHeight;}
return document.body.clientHeight;
},
pageAllheight:function(){
return document.body.offsetHeight;
},
pageAllwidth:function(){
return document.body.offsetWidth;
},
getTop:function(dm){
var dom=dm!=="this"?this.dom(dm):this.thisDom,lg,arr=[];
arr.push(dom);
var par=dom.parentNode;
while(par.tagName!=="BODY"){
if(this.getStyle(par,"position")==="absolute"||this.getStyle(par,"position")==="fixed"){
arr.push(par);}
par=par.parentNode;
}
if(arr.length===1){
return dom.offsetTop;
}
else{
var len=0;
lg=arr.length;
for(var i=0;i<lg;i+=1){
len+=(+arr[i].offsetTop);
}
return len;
}
},
getLeft:function(dm){
var dom=dm!=="this"?this.dom(dm):this.thisDom,lg,arr=[];
arr.push(dom);
var par=dom.parentNode;
while(par&&par.tagName!=="BODY"){
if(this.getStyle(par,"position")==="absolute"||this.getStyle(par,"position")==="fixed"){
arr.push(par);}
par=par.parentNode;
}
if(arr.length===1){
return dom.offsetLeft;
}
else{
var len=0;
lg=arr.length;
for(var i=0;i<lg;i+=1){
len+=(+arr[i].offsetLeft);
}
return len;
}
},

domHtml:function(dm){
var dom=dm!=="this"?this.dom(dm):this.thisDom;
var node=dom.cloneNode(true),ele=document.createElement('div');ele.appendChild(node);return ele.innerHTML;},
// 不使用onestore
htmlDom:function(str){
var n=str.charAt(0);
var div=document.createElement("div");
div.innerHTML=str;
if(n!=="<"){return div;}
if(div.children.length===1){return div.children[0];}else{return div.children;}
},
// 使用 thisDom,返this
addClass:function(dm,str){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
var clas=dom.classList;
if(clas===undefined){
var cla=dom.className;
if(cla){dom.className+=" "+str;}
else{dom.className=str;}
}
else{if(!clas.contains(str)){clas.add(str);}}
}
if(lg>1){
for(var i=0;i<lg;i+=1){one(doms[i]);}
}
else{one(doms);}
return this;
},
// 使用 thisDom
togClass:function(dm,str){
var doms=dm!=="this"?this.dom(dm):this.thisDom,n=0,m=0,lg=doms.length;
var one=function(dom){
var clas=dom.classList;
if(clas===undefined){
var cla=dom.className;
n=cla.indexOf(str);
if(n===-1){
dom.className+=cla?" "+str:str;
}
else{
m=cla.indexOf("\s",n);
dom.className=m!==-1?cla.slice(0,n)+cla.slice(m+1):"";
}}
else{if(clas.contains(str)){clas.remove(str);}
else{clas.add(str);}}
}
if(lg>1){
for(var i=0;i<lg;i+=1){one(doms[i]);}
}
else{one(doms);}
return this;
},
removeClass:function(dm,str){
var doms=dm!=="this"?this.dom(dm):this.thisDom,n=0,m=0,lg=doms.length;
var one=function(dom){
var clas=dom.classList;
if(clas===undefined){
var cla=dom.className;
n=cla.indexOf(str);
if(n!==-1){m=cla.indexOf("\s",n);dom.className=m!==-1?cla.slice(0,n)+cla.slice(m+1):"";}
}
else{
if(clas.contains(str)){clas.remove(str);}}
}
if(lg>1){
for(var i=0;i<lg;i+=1){one(doms[i]);}}
else{one(doms);}
return this;
},
getStyle:function(dm,sty){
var dom=dm!=="this"?this.dom(dm):this.thisDom;
if(dom.style[sty]!==""){
return dom.style[sty];
}
else{return window.getComputedStyle(dom,null)[sty];}
},
// 使用 thisDom
addStyle:function(dm,ob,val){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
dom.style[i]=ob[i];
}
}
else{
dom.style[ob]=val;
}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
// 使用 thisDom
togStyle:function(dm,ob,val){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
if(dom.style[i]){dom.style[i]="";  }
else{dom.style[i]=ob[i];}
}
}
else{
if(dom.style[ob]){dom.style[ob]="";}
else{  dom.style[ob]=val;}
}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
// fun有返回值
exchangeStyle:function(dm,sty,val1,val2,fun){
var dom=dm!=="this"?this.dom(dm):this.thisDom,tf;
if(fun){tf=fun(dom);}
else{tf=dm.style[sty]===val1;}
if(tf){
dm.style[sty]=val2;
}
else{
dm.style[sty]=val1;
}
},

removeStyle:function(dm,ob,val){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length,fun=this.getStyle;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
if(fun(dom,i)){dom.style[i]="";}
}
}
else{
if(fun(dom,i)){dom.style[ob]="";}
}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
// 使用 thisDom
addAttr:function(dm,ob,val,tf){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
dom.setAttribute(i,ob[i]);
}
}
else{
dom.setAttribute(ob,val);
}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
// fun有返回值
exchangeAttr:function(dm,sty,val1,val2,fun){
var dom=dm!=="this"?this.dom(dm):this.thisDom,tf=0;
if(typeof fun==="function"){tf=fun(dom);}
else{
if(fun){if(dom[sty].indexOf(val1)!==-1){tf=1;}}
else{tf=dom[sty]===val1;}
}
if(tf){
dom[sty]=val2;
}
else{
dom[sty]=val1;
}
},

// 使用 thisDom
togAttr:function(dm,ob,val,tf){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
if(dom.hasAttribute(i)){dom.removeAttribute(i);}
else{dom.setAttribute(i,ob[i]);}
}
}
else{
if(dom.hasAttribute(ob)){dom.removeAttribute(ob);}
else{dom.setAttribute(ob,val);}}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
removeAttr:function(dm,ob,val,tf){
var doms=dm!=="this"?this.dom(dm):this.thisDom,lg=doms.length;
var one=function(dom){
if(typeof ob==="object"){
for(var i in ob){
if(dom.hasAttribute(i)){dom.removeAttribute(i);}
}
}
else{
if(dom.hasAttribute(ob)){dom.removeAttribute(ob);}
}}
if(lg>1){for(var j=0;j<lg;j+=1){one(doms[j]);}}
else{one(doms);}
return this;
},
//没有onestore
toTag:function(str,ob,tp){
var dom;
if(!tp)dom=document.createElement(str);
switch(tp){
case "attr":dom=document.createAttribute(str);break;
case "svg":dom=document.createElementNS("http://www.w3.org/2000/svg",str);break;
case "text":dom=document.createTextNode(str);break;
default:dom=document.createElement(str);break;
}
if(ob){for(var i in ob){dom[i]=ob[i];}}
return dom;
},
// 有onestore,移动dom的方向
direct:function(dm,str){
var dom=dm!=="this"?this.dom(dm):this.thisDom;
switch(str){
case "first":outdom=dom.parentNode.firstElementChild;break;
case "last":outdom=dom.parentNode.lastElementChild;break;
case "after":outdom=dom.nextElementSibling;break;
case "before":outdom=dom.previousElementSibling;break;
case "parent":outdom=dom.parentNode;break;
default:console.log("para~ is wrong");return;break;
}
return outdom;
},
// 返回满足fun(dom)为真的dom组成数组返回
directChildren:function(dm,fun,tp){
var dom=dm!=="this"?this.dom(dm):this.thisDom,n=0,m=0,doms,arr=[],brr=[],midob;
if(fun(dom)){if(tp==="add"){arr.push(dom);}else{return dom;}}
doms=dom.children,n=doms.length;
while(n){
brr=[];
for(var i=0;i<n;i+=1){
if(fun(doms[i])){
if(tp==="add"){arr.push(doms[i]);}
else{return doms[i];}
}
midob=doms[i].children,m=midob.length;
if(m>0){
for(var j=0;j<m;j+=1){brr.push(midob[j]);}
}
}
n=brr.length;
doms=brr;
}
if(tp==="add"){if(arr.length>0){return arr;}else{return false;}}else{return false;}
},
directParent:function(dm,fun,tp){
var dom=dm!=="this"?this.dom(dm):this.thisDom,newdom,arr=[],midob;
if(fun(dom)){if(tp==="add"){arr.push(dom);}else{return dom;}}
newdom=dom.parentNode;
while(newdom.tagName!=="BODY"){
if(fun(newdom)){if(tp==="add"){arr.push(newdom);}else{return newdom;}}
newdom=newdom.parentNode;
}
if(tp==="add"){if(arr.length>0){return arr;}else{return false;}}else{return false;}
},

directSibling:function(dm,fun,tp){
var dom=dm!=="this"?this.dom(dm):this.thisDom,n=0,doms,newdom,arr=[];
if(fun(dom)){if(tp==="add"){arr.push(dom);}else{return dom;}}
doms=dom.parentNode.children,n=newdom.length;
for(var i=0;i<n;i+=1){
newdom=doms[i];
if(fun(newdom)){if(tp==="add"){arr.push(newdom);}else{return newdom;}}
}
if(tp==="add"){if(arr.length>0){return arr;}else{return false;}}else{return false;}
},

insertTable:function(dm,js,where){
var dom=dm!=="this"?this.dom(dm):this.thisDom,rows,js=typeof js==="object"?js:JSON.parse(js),where=typeof where==="object"?where:JSON.parse(where),m=js.length,json,wh,arr=[],brr=[];
var rows=dom.rows,n,cells,row,no=0;
var cells0=rows[0].cells,l=cells0.length,str,rr1,rr2,newrow;
for(var i=0;i<m;i+=1){
json=js[i],wh=where[i];
rr1=[],rr2={item:0,content:[]};
for(var j=0;j<l;j+=1){
str=cells0[j].innerHTML;
if(json[str]!==undefined){rr1[j]=json[str];}else{rr1[j]="";}
if(wh!==null){if(wh[str]!==undefined){rr2.item+=1;rr2.content[j]=wh[str];}else{rr2.content[j]="";}}
}
if(rr2.item===0){rr2=null;}
arr.push(rr1),brr.push(rr2);
}
i=0;
while(rows[i]){
cells=rows[i].cells;
for(var k=0;k<m;k+=1){no=0
if(brr[k]===null){continue;}
for(var j=0;j<l;j+=1){
if(cells[j].innerHTML===brr[k].content[j]){no+=1;}
}
if(no===brr[k].item){
newrow=dom.insertRow(i);for(var j=0;j<l;j+=1){newrow.insertCell(j);newrow.cells[j].innerHTML=arr[k][j];}
i+=1;
break;
}
}
i+=1;
}
n=rows.length,no=0;
for(var i=0;i<m;i+=1){
if(brr[i]===null){
newrow=dom.insertRow(n+no);
for(var j=0;j<l;j+=1){
newrow.insertCell(j);
newrow.cells[j].innerHTML=arr[i][j];
}
no+=1;
}
}
},
appendTable:function(dm,js){
var dom=dm!=="this"?this.dom(dm):this.thisDom,rows,js=typeof js==="object"?js:JSON.parse(js),n=js.length,m=0,row,midob;
rows=dom.rows,m=rows.length;
var hrow=rows[0].cells,nn=hrow.length,th,str;
for(var i=0;i<n;i+=1){
midob=js[i];console.log(midob);
row=dom.insertRow(m+i);
for(var k=0;k<nn;k+=1){
row.insertCell(k);
th=hrow[k],str=th.innerHTML;
if(midob[str]!==undefined){
row.cells[k].innerHTML=midob[str];
}
}
}
},
updateTable:function(dm,js,where){
var dom=dm!=="this"?this.dom(dm):this.thisDom,rows,js=typeof js==="object"?js:JSON.parse(js),where=typeof where==="object"?where:JSON.parse(where),m=js.length,json,wh,arr=[],brr=[];
var rows=dom.rows,n=rows.length,cells,row,no=0;
var cells0=rows[0].cells,l=cells0.length,str,rr1,rr2,newrow;
for(var i=0;i<m;i+=1){
json=js[i],wh=where[i];
rr1=[],rr2={item:0,content:[]};
for(var j=0;j<l;j+=1){
str=cells0[j].innerHTML;
if(json[str]!==undefined){rr1[j]=json[str];}else{rr1[j]="";}
if(wh!==null){if(wh[str]!==undefined){rr2.item+=1;rr2.content[j]=wh[str];}else{rr2.content[j]="";}}
}
if(rr2.item===0){rr2=null;}
arr.push(rr1),brr.push(rr2);
}
for(var i=0;i<n;i+=1){
cells=rows[i].cells;
for(var k=0;k<m;k+=1){no=0
if(brr[k]===null){continue;}
for(var j=0;j<l;j+=1){
if(cells[j].innerHTML===brr[k].content[j]){no+=1;}
}
if(no===brr[k].item){
for(var j=0;j<l;j+=1){cells[j].innerHTML=arr[k][j];}
break;
}
}
}
},
removeTable:function(dm,where){
var dom=dm!=="this"?this.dom(dm):this.thisDom,rows,where=typeof where==="object"?where:JSON.parse(where),m=where.length,json,wh,arr=[],brr=[];
var rows=dom.rows,n=rows.length,cells,row,no=0;
var cells0=rows[0].cells,l=cells0.length,str,rr,newrow;
for(var i=0;i<m;i+=1){
wh=where[i];
rr={item:0,content:[]};
for(var j=0;j<l;j+=1){
str=cells0[j].innerHTML;
if(wh[str]!==undefined){rr.item+=1;rr.content[j]=wh[str];}else{rr.content[j]="";}
}
if(rr.item!==0){brr.push(rr)}
}
for(var i=n-1;i>=1;i-=1){
cells=rows[i].cells;
for(var k=0;k<m;k+=1){no=0
if(arr[k]===null||brr[k]===null){continue;}
for(var j=0;j<l;j+=1){

if(cells[j].innerHTML===brr[k].content[j]){no+=1;}
}
if(no===brr[k].item){
dom.deleteRow(i);
break;
}
}
}
},

//有onestore,对生成的一个中间对象进行fun
setAfter:function(dm,newstr){
var dom,middom;
if(typeof newstr==="object"){dom=newstr;}
else{
if(newstr.indexOf('<')!==-1){dom=this.htmlDom(newstr);}
else{dom=this.dom(newstr);}}
var parent,olddom=dm!=="this"?this.dom(dm):this.thisDom,n=dom.length;
if(!n){
parent=olddom.parentNode;
if(parent.lasChild===olddom){
parent.appendChild(dom);}
else{parent.insertBefore(dom,olddom.nextSibling)}
return this;
}
for(var i=0;i<n;i+=1){
parent=olddom[i].parentNode;
if(parent.lasChild===olddom[i]){
parent.appendChild(dom);}
else{parent.insertBefore(dom,olddom[i].nextSibling)}
}
return this;
},
// 有onestore,sto为数组格式
setBefore:function(dm,newstr){
var dom;
if(typeof newstr==="object"){dom=newstr;}
else{
if(newstr.indexOf('<')!==-1){dom=this.htmlDom(newstr);}
else{dom=this.dom(newstr);}}
var parent,olddom=dm!=="this"?this.dom(dm):this.thisDom,n=dom.length;
if(!n){
parent=olddom.parentNode;
parent.insertBefore(dom,olddom);
return this;
}
for(var i=0;i<n;i+=1){
parent=olddom[i].parentNode;
parent.insertBefore(dom,olddom[i]);
}
return this;
},
setContainer:function(dm,newstr){
var dom;
if(typeof newstr==="object"){dom=newstr;}
else{
if(newstr.indexOf('<')!==-1){dom=this.htmlDom(newstr);}
else{dom=this.dom(newstr);}}
var parent,olddom=dm!=="this"?this.dom(dm):this.thisDom,n=olddom.length;
if(!n){olddom.parentNode=dom;return this;}
for(var i =0;i<n;i+=1){
olddom[i].parentNode=dom;
}
return this;
},
setChild:function(dm,newstr){
var dom;
if(typeof newstr==="object"){dom=newstr;}
else{
if(newstr.indexOf('<')!==-1){dom=this.htmlDom(newstr);}
else{dom=this.dom(newstr);}}
var parent,olddom=dm!=="this"?this.dom(dm):this.thisDom,n=olddom.length;
if(!n){olddom.appendChild(dom);return this;}
for(var i =0;i<n;i+=1){
olddom[i].appendChild(dom);
}
return this;
},
setChildfirst:function(dm,newstr){
var dom,first;
if(typeof newstr==="object"){dom=newstr;}
else{
if(newstr.indexOf('<')!==-1){dom=this.htmlDom(newstr);}
else{dom=this.dom(newstr);}}
var parent,olddom=dm!=="this"?this.dom(dm):this.thisDom,n=olddom.length;
if(!n){
first=olddom.firstElementChild;
olddom.insertBefore(dom,first);
return this;}
for(var i =0;i<n;i+=1){
first=olddom[i].firstElementChild;
olddom[i].insertBefore(dom,first);
}
return this;
},
//主要用在相关数据也存在一个算法类的时候,还要换两次,不然,相关对象会丢失
exchangeDom:function(idom,dm,name){
var dom=idom!=="this"?this.dom(idom):this.thisDom,dm=typeof dm==="object"?dm:this.dom(dm);
var clone1=dom.cloneNode(true),clone2=dm.cloneNode(true);
dom.parentNode.replaceChild(clone2,dom);
dm.parentNode.replaceChild(clone1,dm);
clone1.parentNode.replaceChild(dom,clone1);
clone2.parentNode.replaceChild(dm,clone2);

return this;
},
// lay为子元素第几层,返回第几层的所有子元素
layDom:function(dm,lay){
var dom=dm!=="this"?this.dom(dm):this.thisDom,n=dom.length,m=0,k=0,chidoms=[],midob;
if(n>1){for(var i=0;i<n;i+=1){chidoms.push(dom[i]);}}
else{n=1;chidoms.push(dom);}
while(m<lay){
var outdoms=[];
for(var i=0;i<n;i+=1){
if(chidoms[i].hasChildNodes()){
midob=chidoms[i].children;
k=midob.length;
for(var j=0;j<k;j+=1){
outdoms.push(midob[j]);
}
}
}
chidoms=outdoms,n=chidoms.length;
m+=1;
}
return chidoms;
},
// 有onestore
rmDom:function(dm,fun){
var dom,n,parent,nam;
if(dm!=="this"){dom=this.dom(dm);}
else{dom=this.thisDom,this.thisDom={};}
n=dom.length;
if(n>1){
for(var i=0;i<n;i+=1){
parent=dom[i].parentNode;
parent.removeChild(dom[i]);
if(fun){fun(dom);}
}}
else{
parent=dom.parentNode;
parent.removeChild(dom);
if(fun){fun(dom);}
}
},

//有thisDom,str为条件,用abc&fil这种格式获得value
formData:function(dm,str){
var dom=dm!=="this"?this.dom(dm):this.thisDom,tf=str?1:0;
if(dom.tagName!=="FORM"){console.log('not form');return;}
var eles=dom.elements,n=eles.length,ele,name,val,outstr="";
for(var i=0;i<n;i+=1){
ele=eles[i],name=ele.name,val=ele.value;
if(tf){
if(str.indexOf(name)===-1){continue;}
else{outstr+=name+"="+val+"&";}
}
else{outstr+=name+"="+val+"&";}
}
outstr=outstr.slice(0,-1);
return outstr;
},


domsData:function(dm,attrs){
var tp=typeof attrs==="object",attr="",doms=dm!=="this"?this.dom(dm):this.thisDom,n=doms.length,outstr="",dom,name="";
if(!tp){attr=attrs;}
if(n){
for(var i=0;i<n;i+=1){
dom=doms[i],name=dom.data-name;
if(tp){attr=attrs[i];}
if(name){outstr+="&"+name+"="+dom[attr];}
else{outstr+="&"+dom[attr];}}
outstr=outstr.slice(1);
return outstr;}
return false;
},
sqlData:function(dm,attrs){
var tp=typeof attrs==="object",attr="",doms=dm!=="this"?this.dom(dm):this.thisDom,n=doms.length,outstr="",dom,name="",ob={};
if(!tp){attr=attrs;}
if(n){
for(var i=0;i<n;i+=1){
dom=doms[i],name+="|"+dom.getAttribute("data-name");
if(tp){attr=attrs[i];}
outstr+="|"+dom[attr];}
outstr=outstr.slice(1),name=name.slice(1);
if(outstr.indexOf("\n")!==-1){outstr=outstr.replace(/\n/g,"<br>");}
if(outstr.indexOf("\x20")!==-1){outstr=outstr.replace(/\s/g,"kongge");}
ob.name=name,ob.value=outstr;
return ob;}
return false;
},
domsDatajson:function(dm,attrs){
var tp=typeof attrs==="object",attr="",doms=dm!=="this"?this.dom(dm):this.thisDom,n=doms.length,outstr="",dom,name="";
if(!tp){attr=attrs;}
if(n){
for(var i=0;i<n;i+=1){
dom=doms[i],name=dom.data-name;
if(tp){attr=attrs[i];}
if(name){outstr+=","+name+":"+dom[attr];}
else{outstr+=fmat+dom[attr];}}
outstr=outstr.slice(1);
if(name){return "{"+outstr+"}";}return outstr;}
return false;
},
//还有条件
formDatajson:function(dm,str){
var dom=dm!=="this"?this.dom(dm):this.thisDom,tf=str?1:0,ob={};
if(dom.tagName!=="FORM"){console.log('not form');return;}
var eles=dom.elements,n=eles.length,ele,name,val;
for(var i=0;i<n;i+=1){
ele=eles[i],name=ele.name,val=ele.value;
if(tf){
if(str.indexOf(name)===-1){continue;}
else{ob[name]=val;}
}
else{ob[name]=val;}
}
return ob;
}


	});


a9='\u0042\u0049\u004e\u0047';
a7='\u0077\u0072\u0074';


Object.defineProperty(bq,a7,{value:a8+a9,writeable:false,configurable:false});


//生成模块对象
bq.make('plate',function(ht){
this.temp="";
this.cg=function(ht){this.temp=ht;return this;};
this.type='',this.item=0;

Object.defineProperty(this,'keyword',{get:function(){switch(this.type){case 0:return this.item;break;case 1:return this.bottom();break;default:;break}},set:function(v){switch(v){
case 'NUMBER':this.type=0;this.item+=1;break;case 'FOLLOW':this.type=0;break;case 'MD':this.type=1;break;default:;break;
}
}});

this.mdHtml=function(tep,json,fun){
var that=this,temp=tep!=="this"?tep:this.temp,exp=/\?\w*\?/g;
var htm,vals,val,rval,pos,js,outval,m=0;
js=this.json=typeof json==="object"?json:JSON.parse(json);
htm=temp.replace(exp,function(va){
try{if(va.length<=2)throw{name:'err',message:'error in htmlmd'}}catch(e){if(fun)fun(e);return;}
vals=va.slice(1,-1);
m=vals.indexOf('_');
val=(m===-1)?vals:vals.slice(0,m);
outval=that.getVal(js,val);
if(m!==-1){rval=vals.slice(m+1),that.keyword=rval;
outval+=that.keyword;
}
return outval;
});
if(fun)fun(null,htm);
return htm;
};
// 转换一个htm格式的json字符-只有一个标签,并且内容为字符,变为html字符
this.jsHtml1=function(str,fun){
var ob2=typeof str==="object"?str:JSON.parse(str),htm2,tag2,cont2,attr2="";
tag2=ob2.html,cont2=ob2.content;
for(var i in ob2){if(i!=="html"&&i!="content"){attr2+=" "+i+"="+"\""+ob2[i]+"\"";}}
htm2="<"+tag2+attr2+">"+cont2+"</"+tag2+">";
if(fun){fun(htm2);}
return htm2;
};
// 转换htm格式的json字符为html标签,可以是多个html标签,其中的content属性指向其他html字符-需要转为中间object对象

this.jsHtml=function(str,fun){
var ob=typeof str==="object"?str:JSON.parse(str),sub,n=ob.length,m,l=0,obj,arr=[],brr=[],crr=[],ctr,htm,cont="",ats="";
var map=new bq.map(n,"small");
for(var i=0;i<n;i+=1){ats=""; obj=ob[i],arr[i]={}; arr[i].x=obj.html; arr[i].y=obj.content; if(typeof obj.content==="object"){map.addPedges(i,obj.content);} for(var j in obj){if(j!=='html'&&j!=='content'){ats+=" "+j+"=\""+obj[j]+"\"";}} arr[i].z=ats; }
map.judge(0);
while(l<n){
for(var k=0;k<n;k+=1){
ctr=1,cont="",ats="";if(l===n){break;}
sub=arr[k],brr=sub.y;
if(typeof brr==="object"){if(!crr[k]){m=brr.length; for(var i=0;i<m;i+=1){if(!crr[brr[i]]){ctr=0;break;} cont+=crr[brr[i]]; } if(ctr){crr[k]="<"+sub.x+sub.z+">"+cont+"</"+sub.x+">";l+=1; } } }
else{if(!crr[k]){crr[k]="<"+sub.x+sub.z+">"+sub.y+"</"+sub.x+">";l+=1; }}
}}
if(fun){fun(crr[0])}
 return crr[0];
};
this.tagSpan=function(htm){
var reg=/([\w\-]+)=[\"\']?\?([\w\-]*)\?[\"\']?/g,i=0,j=0,n,arr,str="",midstr="",nhtm="",x="",y="";
if(htm.match(reg)===null){return false;}
// nhtm=htm.replace(reg,function(v){midstrreturn ""});
while(arr=reg.exec(htm)){
str=arr[0],n=str.length,j=i,i=reg.lastIndex,x=arr[1],y=arr[2];
midstr+="&"+x+"="+y;
nhtm+=htm.slice(j,i-n);
}
nhtm=nhtm+htm.slice(i)+"<span bq-attr>"+midstr.slice(1)+"</span>";
return nhtm;
};
if(document.documentElement.hasAttribute("bq")){
bq.tree.call(this,{name:"root"});
// 对包含有bq-root的元素进行初始化
this.module=function(dom,parent){
var dom=dom!=="this"?this.dom(dom):this.thisDom,rt="",ht0="",constr="";
var reg=/<[\w\s\"\=\;\:\/\-\?\']*>/gm,reg2=/bq-md=[\"\']([\w\-]*)[\"\']/,reg3=/\?[\w*\-\.]*\?/g,regtag=/(<img|<input)/;
var nhtml="",str="",mdstr="",lg=0,m=0,n=0,y=1,ob=[],i=0,no=0,ht="",cname="",at=0;
var htm=dom.innerHTML+"</div>",nam="";
if(dom.hasAttribute("bq-root")){nam=dom.getAttribute("bq-root");if(nam.indexOf("root-")===-1){return false;}}
else if(dom.hasAttribute("bq-md")){nam=dom.getAttribute("bq-md");if(name.indexOf("-")!==-1){return false;}}
else{return false;}
if(parent===undefined){parent="root";}
this.insertChild({name:nam,content:{},attr:0,con:0},parent);
ob[i]=nam;
while(rt=reg.exec(htm)){
str=rt[0],lg=str.length,m=n,n=reg.lastIndex;
constr=htm.slice(m,n-lg).trim();
if(constr){
if(constr.match(reg3)!==null){
this.find(ob[i]).con=1;
constr=constr.replace(reg3,function(v){var v=v.slice(1,-1);return "<span bq-cont='"+v+"'></span>";})
}}
nhtml+=constr;
no+=1;
if(str.indexOf("</")!==-1){
i-=1;
nhtml+=str;
}
else{
mdstr=reg2.exec(str);
if(mdstr){mdstr=mdstr[1];if(mdstr.indexOf("-")!==-1){this.clear();return false;}}else{mdstr="bq-"+no,str=str.slice(0,-1)+" "+mdstr+" >";}
ht=this.tagSpan(str);
if(ht){str=ht,at=1;}else{at=0;}
this.insertChild({name:mdstr,content:{},attr:at,con:0},ob[i]);
nhtml+=str;
if(str.match(regtag)===null){i+=1;}
ob[i]=mdstr;
}
}
dom.innerHTML=nhtml;
if(this.dom("[bq-attr]")){this.each(this.dom("[bq-attr]"),function(dm){dm.style.display="none";});}
};

var doms=this.dom("[bq-root]");
if(doms){
var n=doms.length;
if(n>1){
for(var i=0;i<n;i+=1){this.module(doms[i]);}
}
else{this.module(doms);}}


//预先绑定数据
this.bindData=function(name,obj,cover){
if(name.indexOf("root")===-1&&name.indexOf("-")!==-1){return false;}
var ob={};
ob.name=name,ob.content=obj;
this.update(ob,cover);
};
this.removeBind=function(name){
if(name.indexOf("root")===-1&&name.indexOf("-")!==-1){return false;}
this.remove(name);
};
// 针对bq-md的值进行父作用域查找,cover指添加的方法,add还是覆盖.
this.sync=function(na,tp,obj,cover){
var type="";
switch(tp){
case "sibling":type="siblingChain";break;
case "children":type="childrenChain";break;
default:type="parentChain";break;
}
if(na.indexOf("root")===-1&&na.indexOf("-")!==-1){return false;}
if(obj){var ob={};
ob.name=na,ob.content=obj;
this.update(ob,cover);
}
this.trace(na,function(ob,ts){
var name=ob.name,dm,nam,dom,cdom,htm,arr,n,x,y,valy,k,m,c,valc;
var cont=ob.conent;
if(name.indexOf("-")===-1){
nam="bq-md="+name;
dm=ts.dom("["+nam+"]");}
else{nam=name;dm=ts.dom("["+nam+"]");}
if(ob.attr){
dom=ts.dom("["+nam+"]>[bq-attr]");
htm=dom.innerHTML,arr=htm.split("&"),n=arr.length;
for(var i=0;i<n;i+=1){
k=arr[i].indexOf("="),x=arr[i].slice(0,k),y=arr[i].slice(k+1);
valy=ts[type](na,y);
if(valy!==false){dm.setAttribute(x,valy)};
}
}
if(ob.con){
cdom=ts.dom("["+nam+"] > [bq-cont]"),m=cdom.length;
if(m>1){
for(var j=0;j<m;j+=1){
c=cdom[j].getAttribute("bq-cont");
valc=ts[type](na,c);
if(valc!==false){cdom[j].innerHTML=valc;}
}
}
else{
c=cdom.getAttribute("bq-cont");
valc=ts[type](na,c);
if(valc!==false){cdom.innerHTML=valc;}
}
}
});
};


}

});

bq.plate.prototype=bq.prototype;
bq.plate.prototype.makes({
dom:bq.dom.prototype.dom,
each:bq.dom.prototype.each
});

bq.make("web",function(){
bq.easydict.call(this);
this.insert("sendFileBlock",0);
this.insert("sendFile",0);
this.number=0;
this.socket=function(name,url){
// var hed=document.getElementsByTagName("head")[0];
// var script=document.createElement("script");
// script.src="/socket.io/socket.io.js";
// hed.appendChild(script);
this.socket.insert(name,io.connect(url));
};
bq.easydict.call(this.socket);

this.sendFile=function(aim,fil,okfun,badfun,hd,hook){
if(this.find("sendFile")===1){return false;}
this.update("sendFile",1);
var ajax=new XMLHttpRequest(),that=this,rep=0;
ajax.addEventListener("load",function(){
var txt=ajax.responseText;that.update("sendFile",0);
if(txt==="ok"){ajax=null;if(okfun){okfun();}if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,txt);}}}
else if(txt==="exist"){console.log("sendfile"+"文件存在");ajax=null;}
else{console.log(txt);ajax=null;}
return;
},false);
ajax.addEventListener("error",function(err){
that.update("sendFile",0);
ajax=null;
if(badfun){console.log(err);badfun("err");}
},false);
ajax.open("POST",aim,true);
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
if(hd){var ob=typeof hd==="object"?hd:JSON.parse(hd);for(var i in ob){ajax.setRequestHeader(i,ob[i]);}}
ajax.send(fil);
};

this.sendFileBlock=function(aim,fil,okfun,badfun,num,time,hd,hook){
if(this.find("sendFileBlock")===1){return false;}
this.update("sendFileBlock",1);
if(!fil.slice){return false;}
var sz=fil.size,that=this;
var n=Math.floor(sz/num),i=0;
var ajax=new XMLHttpRequest();
(function sd(){
ajax.addEventListener("load",function(){
if(!ajax){return;}
var txt=ajax.responseText;
if(txt==="ok"){console.log("ok");
	that.update("sendFileBlock",0);ajax=null;if(okfun){okfun("成功");return;}if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,txt);}}}
else if(txt==="good"){i+=1;console.log(i);setTimeout(sd,time);}
else if(txt==="bad"){console.log(txt);that.update("sendFileBlock",0);if(badfun){badfun("存入失败6");}ajax=null;}
else if(txt==="exist"){console.log("senfileblock"+"文件存在");that.update("sendFileBlock",0);if(badfun){badfun("存在");}ajax=null;}
else{console.log(txt);ajax=null;}
},false);
ajax.addEventListener("error",function(err){
if(badfun){badfun("err");}
console.log(err);
that.update("sendFileBlock",0);
ajax=null;
},false);
if(i===0){ajax.open("POST",aim+":begin",true);}
else if(i>=n-1){ajax.open("POST",aim+":ok",true);}
else{ajax.open("POST",aim,true);}
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
if(hd){var ob=typeof hd==="object"?hd:JSON.parse(hd);for(var j in ob){ajax.setRequestHeader(j,ob[j]);}}
if(i>=n-1){ajax.send(fil.slice(num*i));}
else{
ajax.send(fil.slice(num*i,(i+1)*num));}
})()
};
});
bq.web.prototype=bq.prototype;
bq.web.prototype.makes({
sendSocket:function(nam,name,str){
var sok=this.socket.find(nam);
sok.emit(name,str);
},
getSocket:function(nam,name,fun){
var sok=this.socket.find(nam),that=this;
sok.on(name,function(data){
fun(data);
});
},
getBlob:function(aim,fun1,fun2,hd,hook){
var ajax=new XMLHttpRequest(),that=this;
ajax.addEventListener("load",function(){
var txt=ajax.response;
fun1(txt);
ajax=null;
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,txt);}}
},false);
ajax.addEventListener("error",function(e){
ajax=null;
fun2();
},false);
ajax.open("GET",aim,true);
ajax.timeout=2000;
ajax.ontimeout=function(){fun2();ajax=null;};
ajax.responseType="blob";
if(hd){var ob=typeof hd==="object"?hd:JSON.parse(hd);for(var i in ob){ajax.setRequestHeader(i,ob[i]);}}
ajax.send();
},
//hd代表发送的头部
sendText:function(tp,aim,sd,backfun,errfun,profun,hd,hook){
var ajax=new XMLHttpRequest(),that=this;
if(bq.ie9()){
ajax.onreadystatechange=function(){
if(ajax.readyState==4 && ajax.status==200){
var txt=ajax.responseText;
if(backfun){backfun(txt);}
ajax=null;
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,txt);}}
}
}
}
else{
ajax.addEventListener("load",function(){
var txt=ajax.response;
if(backfun){backfun(txt);}
ajax=null;
if(hook){var obj=bq.asyc_find(hook);if(obj!==false){bq.asyc_fun(hook,txt);}}
},false);
if(profun){ajax.addEventListener("progress",function(e){
if(e.lengthComputable){profun(e.loaded,e.total);}
},false);}
}
ajax.addEventListener("error",function(e){
ajax=null;
if(errfun){errfun();}
},false);
if(tp==="post"||tp==="POST"){ajax.open(tp,aim,true);}
else{ajax.open(tp,aim+"?"+sd,true);}
if(tp==="post"||tp==="POST"){ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");}
ajax.timeout=2000;
ajax.ontimeout=function(err){if(err){if(errfun){errfun();}} ajax=null;};
if(hd){var ob=typeof hd==="object"?hd:JSON.parse(hd);for(var i in ob){ajax.setRequestHeader(i,ob[i]);}}
if(tp==="post"||tp==="POST"){ajax.send(sd);}else{ajax.send(null);}


}});

bq.make("route",function(){
this.usePool("easydict");
this.route_storage={};
this.route_lg=0;
this.route_insert=function(name,cont){
var store=this.route_storage,ob=store[name],midob;
if(!ob){ob=store[name]=[];}
if(ob.length===0){store.item=1;ob.push(cont);}
else{return false;}
};
this.route_insertalias=function(name,cont,na){
var store=this.route_storage,ob=store[name],midob;
if(!ob){ob=store[name]=[];}
if(!ob.alias){store[name].alias={};}
midob=store[name].alias;
if(midob[na]){return false;}
else{midob[na]=[cont],midob.item=1;}
};
this.route_removealias=function(name,na){
var store=this.route_storage,ob=store[name],midob;
if(!ob){return false;}
if(!ob.alias){return false;}
midob=ob.alias;
if(!midob[na]){return false;}
else{midob[na]=null,midob.item-=1;
if(midob.item===0){delete ob.alias;}
}
};
//可以为[]的名字,也可以为一个
this.route_remove=function(name){
var store=this.route_storage,ob=store[name];
if(!ob){return false;}
else{store[name]=null,store.item-=1;
if(store.item===0){store=[];}
}
};
this.route_updatealias=function(name,cont,na,hdcont){
var store=this.route_storage,ob=store[name],midob,acont,n;
if(!ob){return false;}
if(!ob.alias){return false;}
midob=ob.alias;
if(!midob[na]){return false;}
else{
acont=midob[na];
n=acont.indexOf(n);
if(n===-1){acont.push(cont);}
else{if(hdcont==="del"){acont.splice(n,1);}}
return true;
}
};
//cover的值为cover和add,content只有一个内容,不用[],
this.route_update=function(name,cont,hdcont){
var store=this.route_storage,ob=store[name],acont,n;
if(!ob||ob.length===0){return false;}
else{
acont=store[name];
n=acont.indexOf(n);
if(n===-1){acont.push(cont);}
else{if(hdcont==="del"){acont.splice(n,1);}}
return true;
}
};
this.route_findalias=function(name,na){
var store=this.route_storage,ob=store[name],midob;
if(!ob){return false;}
if(!ob.alias){return false;}
if(!ob.alias[na]){return false;}
else{return ob.alias[na];}
};
this.route_find=function(name,type){
var store=this.route_storage,ob=store[name];
if(!ob){return false;}
else{return ob;}
},
this.route_clear=function(){
this.route_lg=0,this.route_storage={};
};
this.addRoute=function(name,fun){
var ids="",na="",para="",pos=0,pos2=0,control=1;
pos=name.indexOf("\x2f");
if(pos!==-1){
ids=name.slice(0,pos),na=name.slice(pos+1);
pos2=na.indexOf("\x2e");
if(pos2!==-1){
para=na.slice(pos2+1);
na=na.slice(0,pos2);
}
}
else{ids=name;
pos2=ids.indexOf("\x2e");
if(pos2!==-1){
para=ids.slice(pos2+1);
ids=ids.slice(0,pos2);
}
}

if(na){control=this.route_findalias(ids,na);}
else{control=this.route_find(ids);if(control){if(control.length===0){control=false;}}}
if(!control){
if(na){
this.route_insertalias(ids,fun,na);
if(para){this.route_findalias(ids,na).argument=[para];}
else{this.route_findalias(ids,na).argument=[false];}
}
else{
this.route_insert(ids,fun);
if(para){this.route_find(ids).argument=[para];}
else{this.route_find(ids).argument=[false];}
}
}
else{
if(na){
this.route_updatealias(ids,fun,na);
if(para){this.route_findalias(ids,na).argument.push(para);}
else{this.route_findalias(ids,na).argument.push(false);}
}
else{
this.route_update(ids,fun);
if(para){this.route_find(ids).argument.push(para);}
else{this.route_find(ids).argument.push(false);}
}
}
};
this.runRoute=function(name,para){
var arr=[],n,argu,alias,brr=[],m,pa,pos=0,na="",retu;
pos=name.indexOf("/");
if(pos!==-1){na=name.slice(pos+1),name=name.slice(0,pos);}
arr=this.route_find(name);
n=arr.length,argu=arr.argument,alias=arr.alias;
if(arr==="false"){return false;}
if(!na){
for(var i =0;i<n;i+=1){
arr[i](bq.argument_storage[argu[i]],para);
}
if(!alias){return;}
for(var j in alias){
brr=alias[j];
if(!brr||brr.length===0){continue;}
m=brr.length,pa=brr.argument;
for(var k=0;k<m;k+=1){
brr[k](bq.argument_storage[pa[k]]);
}
}}
else{
for(var i =0;i<n;i+=1){
arr[i](bq.argument_storage[argu[i]],para);
}
if(!alias){return;}
brr=alias[na],m=brr.length,pa=brr.argument;

for(var k=0;k<m;k+=1){
retu=brr[k](bq.argument_storage[pa[k]],para);
}
return retu;
}
};
this.rmRoute=function(name){
var ids="",na="",pos=0;
pos=name.indexOf("\x2f");
if(pos!==-1){
ids=name.slice(0,pos),na=name.slice(pos+1);
}
if(na){
if(this.route_findalias(ids,na)){
this.route_removealias(ids,na);
}
}
else{
if(this.route_find(ids)){this.route_remove(ids);}
}
};


//这里的-1可能要改
this.done=function(fun,hook,force){
var ob={},funs;
if(typeof fun==="function"){
if(bq.asyc_finditem(hook)===false){
ob.name=hook,ob.item=-1,ob.lg=1;
if(force==="force"){funs=function(){fun();var obj=bq.asyc_find(hook);bq.asyc_fun(hook);}}
else{funs=fun;}
ob.content=[funs];
bq.asyc_insert(ob);
}else{
bq.asyc_find(hook).lg+=1;
ob.name=hook,ob.content=fun;
if(force==="force"){funs=function(){fun();var obj=bq.asyc_find(hook);bq.asyc_fun(hook);}}
else{funs=fun;}
ob.content=funs;
bq.asyc_update(ob);
}
}
else if(fun==="end"){
ob.name=hook;
ob.content=function(){bq.asyc_remove(hook);};
bq.asyc_update(ob);
}
else if(fun==="run"){
if(bq.asyc_find(hook).item!==-1){
var no=3;
(function mm(){
if(no<=0){return;}
if(bq.asyc_find(hook).item===-1){
bq.asyc_fun(hook,force);return;}
no-=1;
setTimeout(mm,2000);
})();
}
else{bq.asyc_fun(hook,force);}
}
else{}
return this;
};

this.stopDone=function(hook){
bq.asyc_remove(hook);
};



this.planWork=function(hook,ar1,ar2){
this.insert(hook,new bq.map());
var ob=this.find(hook),n=ar1.length;
if(ar2){
for(var i=0;i<n;i+=1){ob.bind[ar1[i]]=ar2[i];}
}
ob.planDots(ar1);
return this;
};
this.layoutWork=function(hook,x,y){
var ob=this.find(hook);
typeof y==="array"?ob.addEdges(x,y):ob.addEdge(x,y);
return this;
};
this.layoutWorkDirect=function(hook,x,y){
var ob=this.find(hook);
typeof y==="array"?ob.addPEdges(x,y):ob.addPEdge(x,y);
return this;
};
this.pipeWork=function(hook,name,fun){
var ob=this.find(hook);
if(fun==="asyc"){
var that=this;
ob.pipeTrace(name,function(ob){that.done(ob.content,hook,ob.mode);});
that.done("end",hook);
that.asyc_find(hook).content[0]();
}
else{ob.pipeTrace(name,fun);}
};
this.directWork=function(hook,name,fun){
var ob=this.find(hook);
if(fun==="asyc"){
var that=this;
ob.directTrace(name,function(ob){that.done(ob.content,hook,ob.mode);});
that.done("end",hook);
that.asyc_find(hook).content[0]();
}
else{ob.directTrace(name,fun);}
};
this.layWork=function(hook,name,fun){
var ob=this.find(hook);
if(fun==="asyc"){
var that=this;
ob.layTrace(name,function(ob){that.done(ob.content,hook,ob.mode);});
that.done("end",hook);
that.asyc_find(hook).content[0]();
}
else{ob.layTrace(name,fun);}
};
});


bq.route.prototype=bq.prototype;
})(window);