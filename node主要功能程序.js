var fs=require("fs"),query=require("querystring"),url=require("url"),stream=require("stream"),path=require("path"),mysql=require('mysql');

var string=require("./string.js");

var client=mysql.createPool({user:'root',connectionLimit :270,password:'862326aa',database:'bqdemo'});

var router={
// 字符串格式类似,sql的格式为insert into mes set name=?,content=?
insert_get:function(req,res){
var ob={},sql="",para=[],dat=new Date();
dat=(+dat.getMonth()+1)+"-"+dat.getDate()+" "+dat.getHours()+":"+dat.getMinutes();
ob=string.insert(decodeURIComponent(url.parse(req.url).query));
sql="insert into "+ob.table+" set "+ob.name+",date=?";
para=decodeURIComponent(ob.value).split("|");
para.push(dat);
client.getConnection(function(err,conection){
conection.query(sql,para,function(err,result){
if(err){console.log(err);res.send("bad");res.end();}
else{
if(result.affectedRows===1){
var num=result.insertId.toString();
conection.release();
res.send(num),res.end();}
else{res.send("bad");res.end();}
}
});
});
},
insert_post:function(req,res){
var dat=new Date();
var ob,aim="",para=[],vals="",str="";
req.on("data",function(da){
str+=da;
});
req.on("end",function(){
ob=string.insert(decodeURIComponent(str));
sql="insert into "+ob.table+" set "+ob.name+",date=?";
para=ob.value.split("|");
dat=(+dat.getMonth()+1)+"-"+dat.getDate()+" "+dat.getHours()+":"+dat.getMinutes();
para.push(dat);
client.getConnection(function(err,conection){
conection.query(sql,para,function(err,result){
if(err){res.send("bad");res.end();}
else{if(result.affectedRows===1){
var num=result.insertId.toString();conection.release();
res.send(num),res.end();}
else{res.send("bad");res.end();}}
});});
})
},
end:function(req,res){
console.log(url.parse(req.url).query);
client.end(function(err){if(err){console.log(err);}else{console.log("out")};});
},
select_get:function(req,res){
var ob={},sql="";
ob=string.select(decodeURIComponent(url.parse(req.url).query));
if(ob.where){
sql="select "+ob.name+" from "+ob.table+" where "+ob.where;}
else{sql="select "+ob.name+" from "+ob.table;}
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){res.send("bad");res.end(); }
else{conection.release();res.send(result);res.end();}
});});
},
selectn_get:function(req,res){
var ob={},sql="",no;
ob=string.select(decodeURIComponent(url.parse(req.url).query));
sql="select max(id) from "+ob.table;
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){res.send("bad");res.end(); }
else{conection.release();
no=result[0]["max(id)"];
if(!no){no="1";}
res.send(no.toString());res.end();}
});});
},
selectx_get:function(req,res){
var ob={},sql="";
ob=string.strOb(decodeURIComponent(url.parse(req.url).query));
sql="select a.id,a.title,a.content,a.type,b.name,b.content as section from "+ob.table+" as a left join remark as b on a.id=b.ids where a.id between "+ob.start+" and "+(((+ob.start)+(+ob.lg)));
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){console.log(err);res.send("bad");res.end(); }
else{
if(result.length===0){res.send("nodata");res.end();}
else{conection.release();res.send(result);res.end();}
}
});});
},
select_post:function(req,res){
var client=mysql.createPool({user:'root',password:'5678',database:'bqdemo'});
var ob,aim="",para=[],vals="",str="";
req.on("data",function(da){
str+=da;
});
req.on("end",function(){
ob=string.select(decodeURIComponent(str));
if(ob.where){
sql="select "+ob.name+" from "+ob.table+" where "+ob.where;}
else{sql="select "+ob.name+" from "+ob.table;}
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){res.send("bad");res.end(); }
else{conection.release();res.send(result),res.end();}
});});
});
},
//sendstr="table=users&name=name&set={name:"+str+"}&where={name:"+oldstr+"}";
update_get:function(req,res){
var ob={},sql="";
ob=string.update(decodeURIComponent(url.parse(req.url).query));
if(ob.where){
sql="update "+ob.table+" set "+ob.set+" where "+ob.where;
}
else{sql="update "+ob.table+" set "+ob.set;}
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err||result.affectedRows===0){res.send("bad"); res.end();}
else{conection.release();res.send("ok"),res.end();}
});});
},
update_post:function(req,res){
var client=mysql.createPool({user:'root',password:'5678',database:'bqdemo'});
var ob,aim="",para=[],vals="",str="";
req.on("data",function(da){
str+=da;
});
req.on("end",function(){
ob=string.update(decodeURIComponent(str));
if(ob.where){
sql="update "+ob.table+" set "+ob.set+" where "+ob.where;}
else{sql="update "+ob.table+" set "+ob.set;}
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){res.send("bad"); res.end();}
else{conection.release();res.send("ok"),res.end();}
});});
})
},
del:function(req,res){
var sql="",ob={};
ob=string.delete(decodeURIComponent(url.parse(req.url).query));
sql="delete from "+ob.table+" where "+ob.where;
client.getConnection(function(err,conection){
conection.query(sql,function(err,result){
if(err){res.send("bad"),res.end(); }
else{conection.release();res.send("ok"),res.end();}
});});
},
gettxt_one:function(req,res){
var fil=url.parse(req.url).query;
var filename="";
filename="./public/img/"+fil+".png";
fs.readFile(filename,"utf-8",function(err,da){
if(err){res.send("bad");res.end();return;}
else{res.send(da),res.end();}
});
},
postfile:function(req,res){
var filename="./public/img/"+req.params[0];
var list=[],lg=0;
fs.exists(filename,function(exist){if(exist===true){res.send("exist"),res.end();} else{
req.on("data",function(da){
list.push(da);lg+=da.length;});
req.on("end",function(){
var n=list.length,outfile=fs.createWriteStream(filename),ream=stream.Readable,i=0;
var read=ream();
read._read=function(){
if(i>lg){return read.push(null);}
read.push(list[i++]);}
read.pipe(outfile);
res.send("ok");
res.end();
});
}});
},
postfileV:function(req,res){
var filename="./public/video/"+req.params[0];
var list=[],lg=0;
fs.exists(filename,function(exist){if(exist===true){res.send("exist"),res.end();} else{
req.on("data",function(da){
list.push(da);lg+=da.length;});
req.on("end",function(){
var n=list.length,outfile=fs.createWriteStream(filename),ream=stream.Readable,i=0;
var read=ream();
read._read=function(){
if(i>lg){return read.push(null);}
read.push(list[i++]);}
read.pipe(outfile);
res.send("ok");
res.end();
});
}});
},
postfile_block:function(req,res){
var filename="./public/video/"+req.params[0],m;
console.log(filename);
var list=[],lg=0,name,mes;
m=filename.indexOf(":");
if(m!==-1){name=filename.slice(0,m),mes=filename.slice(m+1);}
else{name=filename;}
var func=function(beg){
req.on("data",function(da){
list.push(da);lg+=da.length;});
req.on("end",function(){
var buf=Buffer.concat(list,lg);
if(beg==="begin"){
fs.writeFile(name,buf,function(err){if(err){console.log(err);res.send("bad");res.end();return;}else{if(mes==="ok"){res.send("ok");res.end();}else{res.send("good");res.end();}}
});}
else{fs.appendFile(name,buf,function(err){if(err){res.send("bad");res.end();return;}else{
if(mes==="ok"){res.send("ok");res.end();}else{res.send("good");res.end();}
}});
}

});
}
if(mes==="begin"){fs.exists(name,function(exist){if(exist===true){res.send("exist"),res.end();}else{func("begin");}});}
else{func();}
}
};
module.exports=router;