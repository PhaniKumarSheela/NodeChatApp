const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicpath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) =>{
    console.log('New user connected');

    //socket.emit from Admin text Welcome to the chat App
    socket.emit('newMessage',
        generateMessage('Admin','Welcome to the Chat App'));

    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage',
        generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message) => {
        console.log('createMessage',message);
        io.emit('newMessage',
            generateMessage(message.from,message.text));
        // callback('This is from the server');
        // callback({result:'Message delivered successfully'});
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    // socket.emit('newMessage',
    //     generateMessage('UnknownUser','Testing Message Event'));

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

app.use(express.static(publicpath));

server.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});