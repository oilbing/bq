var express = require('express'),mysql=require('mysql'),path=require("path"),http=require("http"),app = express(),fs=require("fs");
var ser=require("./routes/server.js"),query=require("querystring"),string=require("./routes/string.js");
var server=http.createServer(app);
var io=require("socket.io").listen(server),datas=require("./routes/dislist.js");
server.listen(80);
app.use(express.static(path.join(__dirname, 'public')));

var sockets=io.sockets;

sockets.on("connection",function(socket){
socket.on("public",function(da){
socket.broadcast.emit("public",da);
socket.emit("public",da);
socket.emit("ok","ok");
});
socket.on("publish",function(da){
sockets.emit("publish",da);
});

socket.on("mark",function(da){
sockets.emit("mark",da);
});


socket.on("pubcanvas",function(da){
sockets.emit("pubcanvas",da);
});
});

app.get('/username/',ser.update_get);
app.get('/del/',ser.del);
// app.get('/end/',ser.end);
app.get("/browse",function(req,res){
fs.readFile("./public/brow.html","utf-8",function(err,da){
if(err){res.send("IE8及其以下版本不能读取");res.end();return;}
else{res.send(da),res.end();}
});
})

app.get('/publish/',ser.insert_get);
app.get('/getmessage/',ser.select_get);
app.get('/firstlist/',ser.selectx_get);
app.post('/publish/',ser.insert_post);

app.post('/img/*',ser.postfile);
app.get('/bigtxt/',ser.gettxt_one);
app.post('/video/*',ser.postfileV);
app.post('/videoblock/*',ser.postfile_block);

app.get('/num/',ser.selectn_get);


console.log("listen 80");


// app.get('/del/',server.del);
// app.get('/insert_small/',server.insert_small);
// app.post('/insert_big/',server.insert_big);
// app.get('/select_get/',server.select_get);
// app.post('/select_post/',server.select_post);
// app.post('/update_post/',server.update_post);










