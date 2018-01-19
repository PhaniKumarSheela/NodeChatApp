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

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current location</a>')
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});


// ,function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]'); 
    socket.emit('createMessage',{
        from:'User',
        text:messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your broweser');
    }
    
    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location');
        locationButton.removeattr('disabled');
    });
});

