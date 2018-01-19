var socket = io();

socket.on('connect',function(){
    console.log('Connected to Server')

    socket.emit('createMessage',{
        from:'Me',
        text:'This is a new message created at Client'   
    });
});

socket.on('disconnect',function() {
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('New Message',message);
});

