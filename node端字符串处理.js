var string={
// typeob:function(ob){return Object.prototype.toString.call(ob).slice(8,-1);},
// oblength:function(ob){
// var tp=this.typeob(ob),n=0;
// if(tp!=="Object"){return ob.length;}
// else{for(var i in ob){n+=1;} return n;}
// },
// strjson:function(str){
// var x=-1,n=str.length,ob={},midstr="",m=0;
// if(str.indexOf("&")===-1){
// m=str.indexOf("=");
// ob[str.slice(0,m)]=str.slice(m+1);
// return ob;
// }
// for(var i=0;i<n;i+=1){
// if(str.charAt(i)==="&"){
// midstr=str.slice(x+1,i);
// m=midstr.indexOf("=");
// ob[midstr.slice(0,m)]=midstr.slice(m+1);
// x=i;
// }
// }
// midstr=str.slice(x+1);
// m=midstr.indexOf("=");
// ob[midstr.slice(0,m)]=midstr.slice(m+1);
// return ob;
// },
// strarr:function(str){
// var arr=str.split("&"),n=arr.length,brr=[],m=0;
// for(var i=0;i<n;i+=1){
// m=arr[i].indexOf("=");
// brr=[arr[i].slice(0,m),arr[i].slice(m+1)];
// arr[i]=brr;
// }
// return arr;
// },
// jsonstr:function(js){
// var n=js.length,str="",ss="";
// for(var i=0;i<n;i+=1){
// ss=js.charAt(i);
// switch(ss){
// case "\x7B":;break;
// case "\x7D":str+="\"";break;
// case "\x3A":str+="=\"";break;
// case "\x2C":str+="\",";
// case "\x22":;break;
// default:str+=ss;break;
// }
// }
// return str;
// },
// sqlstr:function(str){
// var m=str.indexOf("&"),ob={},k=0,x="",y="",z="";
// var str=str.slice(m+1),arr=str.split("&"),n=arr.length,midstr="",lg="",ss="";
// for(var i=0;i<n;i+=1){
// midstr=arr[i],k=midstr.indexOf("=");
// x=midstr.slice(0,k),y=midstr.slice(k+1),lg=y.length;
// if(x==="name"||x==="table"){ob[x]=y;continue;}
// for(var j=0;j<lg;j+=1){
// ss=y.charAt(i);
// switch(ss){
// case "\x7B":;break;
// case "\x7D":z+="\"";break;
// case "\x3A":z+="=\"";break;
// case "\x2C":z+="\",";
// case "\x22":;break;
// default:z+=ss;break;
// }
// }
// ob[x]=z;
// }
// return ob;
// },
//类似table=xx&name=xx&value=xx,xx的结构
insert:function(str){
var arr=str.split("&"),n=arr.length,m="",str="",x="",y="",ob={};
for(var i=0;i<n;i+=1){
str=arr[i];
m=str.indexOf("=");
x=str.slice(0,m),y=str.slice(m+1);
if(x==="name"){
y=y.replace(/\|/g,"=\?\,");
y+="=\?";
}
ob[x]=y;
}
return ob;
},
select:function(str){
var arr=str.split("&"),n=arr.length,m="",str="",x="",y="",ob={},ss="";
for(var i=0;i<n;i+=1){
str=arr[i];
m=str.indexOf("=");
x=str.slice(0,m),y=str.slice(m+1);
if(x==="where"){
var z="",s=y.length;
for(var j=0;j<s;j+=1){
ss=y.charAt(j);
switch(ss){
case "\x7B":;break;
case "\x7D":z+="\"";break;
case "\x3A":z+="=\"";break;
case "\x2C":z+="\",";
case "\x22":;break;
default:z+=ss;break;
}
}
ob[x]=z;
}
else{ob[x]=y;}
}
return ob;
},
// 类似table=xx&name=xx&set={}的结构
update:function(str){
var arr=str.split("&"),n=arr.length,m="",str="",x="",y="",ob={},ss="";
for(var i=0;i<n;i+=1){
str=arr[i];
m=str.indexOf("=");
x=str.slice(0,m),y=str.slice(m+1);
if(x==="where"||x==="set"){
var z="",s=y.length;
for(var j=0;j<s;j+=1){
ss=y.charAt(j);
switch(ss){
case "\x7B":;break;
case "\x7D":z+="\"";break;
case "\x3A":z+="=\"";break;
case "\x2C":z+="\",";
case "\x22":;break;
default:z+=ss;break;
}
}
ob[x]=z;
}
else{ob[x]=y;}
}
return ob;
},
delete:function(str){
var arr=str.split("&"),n=arr.length,m="",str="",x="",y="",ob={},ss="";
for(var i=0;i<n;i+=1){
str=arr[i];
m=str.indexOf("=");
x=str.slice(0,m),y=str.slice(m+1);
if(x==="where"){
var z="",s=y.length;
for(var j=0;j<s;j+=1){
ss=y.charAt(j);
switch(ss){
case "\x7B":;break;
case "\x7D":z+="\"";break;
case "\x3A":z+="=\"";break;
case "\x2C":z+="\",";
case "\x22":;break;
default:z+=ss;break;
}
}
ob[x]=z;
}
else{ob[x]=y;}
}
return ob;
},
sockstring:function(str){
var str=decodeURIComponent(str);
var ob=JSON.parse(str);
return ob;
},
//把类似a=i&b=9的字符转变为对象,s是你选择的分隔符,输入为字符串
strOb:function(str,s){
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
}



};
module.exports=string;