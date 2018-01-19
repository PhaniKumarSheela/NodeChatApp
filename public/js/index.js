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
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});

// ,function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    });
});
