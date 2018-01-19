const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicpath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) =>{
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

app.use(express.static(publicpath));

server.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});