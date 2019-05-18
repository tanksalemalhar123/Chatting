var express = require("express"); //Express
var app = express();    //Initializing to APp
var server = require("http").createServer(app); //creating server
var io = require('socket.io').listen(server); //listening to server
users=[];
connections=[];


server.listen(process.env.PORT || 3000);

console.log('Server Running');

//Getting the resource of HTML file

app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html'); 
});

//Connection
io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected',connections.length);

    //Disconnect
    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
    console.log('Disconnect: %s sockets connected',connections.length);
    })

    //Send Message
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data});
    })
    
})


