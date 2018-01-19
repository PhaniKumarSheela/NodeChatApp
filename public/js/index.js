var socket = io();

socket.on('connect',function(){
    console.log('Connected to Server')

    socket.emit('createEmail',{
        toAddress:'jen@example.com',
        text:'Hey,this is Phani'
    })

    socket.emit('createMessage',{
        from:'Me',
        text:'This is a new message created at Client'   
    });
});

socket.on('disconnect',function() {
    console.log('Disconnected from server');
});

socket.on('newEmail',function(email){
    console.log('New Email',email);
});

socket.on('newMessage',function(message){
    console.log('New Message',message);
});

